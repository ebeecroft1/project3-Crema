import React from "react";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import {Container, Form, FormControl} from "react-bootstrap";
import Mapstyles from "./Mapstyles";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css"
  import "./Map.scss";

const libraries = ["places"];

const mapContainerStyle = {
    width: '80vw',
    height: '40vh',
};

const center = {
    lat: -33.8688,
    lng: 151.2093
};

const options = {
    styles: Mapstyles,
    disableDefaultUI: true,
    zoomControl: true,
};


function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <>
        <Container className="map-box" fluid>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >

            </GoogleMap>
        </Container>
        <Container style={{width:"60vw"}}>
            <Search panTo={panTo}/>
        </Container>
        </>
    )
}

export default Map;

function Search({panTo}) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => -33.8688, lng: () => 151.2093},
            radius: 2000, // in kms
        },
    });

    return (
    <Combobox onSelect={async (address) => {
        setValue(address, false); // Update state to place chosen address in state - prevents requesting from Google Maps Places API again
        clearSuggestions(); // Clear suggestions

        try {
            const results = await getGeocode({address}); // Get Geocode of selected address
            const {lat, lng} = await getLatLng(results[0]); // Extract lat and long
            panTo({lat, lng}); // Pan map to selected lat and long
        } catch(error) {
            console.log("error!")
        }
        }}
    >
        <ComboboxInput value={value} onChange={(e) => {
            setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search"
    />
    <ComboboxPopover>
        {status === "OK" && data.map(({id, description}) => (
            <ComboboxOption key={id} value={description} />
            ))}
    </ComboboxPopover>
    </Combobox>
    )
//     return <Form onSelect={(address) => {
//         console.log(address);
//     }} >
//     <FormControl
//       type="search"
//       placeholder="Search"
//     //   aria-label="Search"
//       value={value}
//       onChange={(e) => {
//           setValue(e.target.value);
//       }}
//       disabled={!ready}
//     />
//   </Form>
}