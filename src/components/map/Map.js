import React, { useCallback, useEffect, useRef, useState } from "react";
import { doc, getDoc, collection, docs, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import { Container } from "react-bootstrap";
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
    const [cafes, setCafes] = useState([]); // TODO - see how to set this from the database
    
    const getCafes = async () => {
        const items = [];
        try {
            const querySnapshot = await getDocs(collection(db, "cafes"));
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                // console.log(doc.data());
            })
        } catch (error) {
            console.log(error)
        }
        // console.log(items);
        setCafes(items);
    };

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(15);
    }, []);

    // Load cafe markers onto map
    useEffect(() => {
		getCafes();
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
                
            {cafes.map((cafe) => (
                <Marker
                key={Math.random()}
                position={{
                    lat: cafe.geopoint._lat,
                    lng: cafe.geopoint._long
                }}
                />
            ))}

            </GoogleMap>
        </Container>

        <Container style={{width:"60vw"}}>
            <Search panTo={panTo}/>
            <Locate panTo={panTo}/>
        </Container>

        { cafes ? (
            <div>{cafes.map((cafe) => (
                <div>
                <h1>{cafe.name}</h1>
                <h2>{cafe.address}</h2>
                <p>{cafe.geopoint._lat}</p>
                <p>{cafe.geopoint._long}</p>
                </div>
            ))}
            </div>
        ) : <></>}
        </>
    )
}

export default Map;

function Locate({panTo}) {
    return <button onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, () => null, options)
    }}>Use my location</button>
};

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
        <ComboboxList>
            {status === "OK" && data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
                ))}
        </ComboboxList>
    </ComboboxPopover>
    </Combobox>
    )
}