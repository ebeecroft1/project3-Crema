import React from "react";
import {useParams} from "react-router-dom";

function CafeShow() {
    let params = useParams();
    console.log(params.type);

    return (
        <p>Cafe show coming soon</p>
    );
}

export default CafeShow;