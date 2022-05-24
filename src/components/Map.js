import React from "react";
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';

const libraries = ["places"];

const mapContainerStyle = {
    width: '300px',
    height: '300px',
};

const center = {
    lat: -33.8688,
    lng: 151.2093
};

function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
            >

            </GoogleMap>
        </div>
    )
}

export default Map;

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// function Map() {
//   return (
//     <LoadScript
//       googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default React.memo(Map)