import { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Cafe() {
  // const { currentUser } = useContext(AuthContext);

  // const navigate = useNavigate();

  // const clickLogin = () => {
  //   if (currentUser) {
  //     signOut(auth);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const [cafes, setCafes] = useState([]);
  const cafesCollectionRef = collection(db, "cafes");

  useEffect(() => {
    const getCafes = async () => {
      const data = await getDocs(cafesCollectionRef);
      setCafes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getCafes()
  }, [])

  return (
    <div className="App">
      {/* <h1>Welcome {auth.currentUser?.email}</h1>
      <button onClick={clickLogin}>
        {currentUser ? "Log Out" : "Login"}
      </button> */}
      { cafes.map((cafe) => {
        return (
          <div>
            <h1>Name: {cafe.name}</h1>
            <h1>Address: {cafe.address}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default Cafe;