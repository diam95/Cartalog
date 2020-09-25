import React, {useEffect, useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainScreen from "./Components/MainScreen/MainScreen";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import firebase from "firebase/app";

const App = () => {

    const [partnerData, setPartnerData] = useState({});

    const [selectedCity, setSelectedCity] = useState(10);
    const [citiesArray, setCitiesArray] = useState([]);

    const [requestsDataset, setRequestsDataset] = useState([]);

    console.log(partnerData);
    console.log(requestsDataset);

    //AUTH STATE
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            const uid = user.uid

            if (user) {
                setPartnerData({partnerID: uid})
            }

        })

    }, [])

    //SET AVAILABLE CITIES LIST
    useEffect(() => {

        const citiesRef = firebase.database().ref('cities')

        citiesRef.once("value", snap => {


        }).then(r => {

            if (r.exists()) {
                setCitiesArray(Object.values(r.val()))
            }

        })

    }, [])

    //LOAD PARTNER DATA
    useEffect(() => {

        if (partnerData.partnerID) {

            const partners2Ref = firebase.database().ref('partners2').child(partnerData.partnerID)

            partners2Ref.once('value', snap => {

            }).then(r => {

                if (r.exists()) {
                    setPartnerData(r.val())
                }

            })

        }

    }, [partnerData])

    //LOAD REQUESTS DATASET
    useEffect(() => {

        if (partnerData.info) {

            const partnerType = partnerData.info.type
            const city = partnerData.info.city

            const requestsRef = firebase.database().ref('requests').child(city).child(partnerType).orderByChild('timestamp').limitToFirst(20)
            requestsRef.once('value', snap => {

            }).then(r=>{

                if(r.exists()){

                    const requestsArray = Object.values(r.val()).reverse()
                    setRequestsDataset(requestsArray)
                }

            })

        }

    }, [partnerData])

    return (
        <Router>
            <Switch>

                <Route path="/login">
                    <LoginScreen partnerData={partnerData}/>
                </Route>

                <Route path="/">
                    <MainScreen citiesArray={citiesArray}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                requestsDataset={requestsDataset}
                                partnerData={partnerData}
                    />
                </Route>

            </Switch>
        </Router>

    );
}

export default App;
