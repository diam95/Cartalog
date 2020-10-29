import React, {useEffect, useState} from 'react'
import 'fontsource-roboto';
import {
  BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import firebase from "firebase/app";
import "firebase/database";

const App =() =>{

    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    console.log(carBrands)

    useEffect(()=>{

        const brandsRef = firebase.database().ref("car_brands")
        brandsRef.once('value', snap => {

            console.log(snap.val())

            if (snap.exists()) {

                const data = Array.from(Object.keys(snap.val()))
                setCarBrands(data)

            }

        }).then(r =>{

        })

    },[])

    useEffect(()=>{

        const brandsRef = firebase.database().ref("car_models")
        brandsRef.once('value', snap => {

            if (snap.exists()) {

                setCarModels(snap.val())

            }

        }).then(r =>{

        })

    },[])

    return (
      <Router>
        <div>
          <Switch>

            <Route path="/">
              <HomeScreen carBrands={carBrands}
                          carModels={carModels}
              />
            </Route>

          </Switch>
        </div>
      </Router>
  );
}

export default App;
