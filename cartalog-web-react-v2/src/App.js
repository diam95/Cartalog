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
import RequestScreen from "./Components/RequestScreen/RequestScreen";

const App = () => {

    const [partnerData, setPartnerData] = useState({});
    const [requestsDataset, setRequestsDataset] = useState([]);

    console.log(partnerData);

    //AUTH STATE
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            const uid = user.uid

            if (user) {
                setPartnerData({partnerID: uid})
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

                    const data = r.val()
                    const partnerID = partnerData.partnerID
                    data.info = {...data.info, partnerID}

                    setPartnerData(data)

                }

            })

        }

    }, [partnerData])

    //LOAD REQUESTS DATASET
    useEffect(() => {

        if (partnerData.info) {

            const partnerType = partnerData.info.type
            const city = partnerData.info.city

            const requestsRef = firebase.database().ref('requests').child(city).child(partnerType).orderByChild('timestamp').limitToFirst(10)
            requestsRef.once('value', snap => {

            }).then(r => {

                if (r.exists()) {

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

                <Route exact path="/">
                    <MainScreen requestsDataset={requestsDataset}
                                partnerData={partnerData}
                    />
                </Route>

                <Route path="/request/">
                    <RequestScreen partnerData={partnerData}/>
                </Route>

            </Switch>
        </Router>

    );
}

export default App;
