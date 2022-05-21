import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import '../App.css';

function App() {
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

export default App;
