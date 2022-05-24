import React from "react";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import {Container, Form, FormControl} from "react-bootstrap";
import Mapstyles from "./Mapstyles";
import "./Map.scss";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries = ["places"];

const mapContainerStyle = {
    width: '60vw',
    height: '50vh',
};

const center = {
    lat: -33.8688,
    lng: 151.2093
};

const options = {
    styles: Mapstyles,
    disableDefaultUI: true,
    zoomControl: true,
}

function Search() {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestion} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => -33.8688, lng: () => 151.2093},
            radius: 2000,
        },
    });

    return <Form onSelect={(address) => {
        console.log(address);
    }} >
    <FormControl
      type="search"
      placeholder="Search"
    //   aria-label="Search"
      value={value}
      onChange={(e) => {
          setValue(e.target.value);
      }}
      disabled={!ready}
    />
  </Form>
}


function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

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
            >

            </GoogleMap>
        </Container>
        <Container fluid>
            <Search className="search-box" />
        </Container>
        </>
    )
}

export default Map;