import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import {Nav} from "react-bootstrap";

function CafeShow() {
    // Get Cafe ID from URL
    let params = useParams(); // Params = Cafe ID
    // console.log(params.id);
    let id = params.id;
    const [cafeInfo, setCafeInfo] = useState(null);
    let data;

    const getCafe = async (id) => {
        const cafeDocRef = doc(db, "cafes", id);
        const cafeDocSnap = await getDoc(cafeDocRef);
        data = cafeDocSnap.data();
        setCafeInfo(data);
    };
    // console.log(cafeInfo);

    useEffect(() => {
        if (cafeInfo === null) {
            getCafe(params.id);
        }
    }, []);

    return (
        <div>
            { cafeInfo === null ? (
                "Loading"
            ) : (
                <div>
                    <h1>{cafeInfo.name}</h1>
                    <h2>{cafeInfo.address}</h2>
                </div>
            ) }
            <Nav.Link href="/map">Back</Nav.Link>
            {/* TODO: Make back route reload map as it was */}
        </div>
    );
}

export default CafeShow;