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
    const [requestsDataset, setRequestsDataset] = useState([]);

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

        } else if (partnerData.info) {

            if (partnerData.info.partnerID) {

                console.log(partnerData);

                const answeredRequestsKeysArray = Object.keys(partnerData.answeredRequests)

                const index = answeredRequestsKeysArray.length - 1
                const last = answeredRequestsKeysArray[index]

                const answeredRequestsRef = firebase.database().ref('partners2').child(partnerData.info.partnerID).child("answeredRequests")
                answeredRequestsRef.orderByKey().startAt(last).on('value', snap => {

                    if (snap.exists()) {

                        const requestID = Object.keys(snap.val())[0]

                        if (last !== requestID) {

                            console.log(snap.val())

                            const newAnswer = snap.val()
                            const temp = [...partnerData]
                            temp.answeredRequests = {...temp.answeredRequests, newAnswer}

                            setPartnerData(temp)

                        }

                    }

                })

                return answeredRequestsRef.off('value')

            }

        }

    }, [partnerData])

    //LOAD REQUESTS DATASET
    useEffect(() => {

        if (partnerData.info) {

            let requestsArray = []

            const partnerType = partnerData.info.type
            const city = partnerData.info.city
            const requestsRef = firebase.database().ref('requests').child(city).child(partnerType).orderByChild('timestamp')

            const handleNewRequests = () => {

                const startAt = requestsArray[0].timestamp - 1

                console.log(startAt)

                requestsRef.endAt(startAt).on('child_added', snap => {

                    if (snap.exists()) {
                        requestsArray.unshift(snap.val())
                        setRequestsDataset([...requestsArray])
                    }

                })

            }

            const handleRemovedRequests = () => {

                requestsRef.on('child_removed', snap => {

                    const removedRequest = snap.val()

                    const requestKey = removedRequest.key

                    requestsArray.forEach((item,ind) => {

                        if (item.key === requestKey){

                            requestsArray.splice(ind,1)
                            setRequestsDataset([...requestsArray])

                        }

                    })

                })

            }

            requestsRef.limitToFirst(10).once('value', snap => {

                if (snap.exists()) {

                    requestsArray = Object.values(snap.val()).reverse()
                    setRequestsDataset(requestsArray)

                }

            }).then(r => {
                handleNewRequests()
                handleRemovedRequests()
            })

            return () => {
                requestsRef.off('child_added')
                requestsRef.off('child_removed')
            }

        }

    }, [partnerData.info])

    return (
        <Router>

            <Switch>

                <Route path="/login">
                    <LoginScreen partnerData={partnerData}/>
                </Route>

                <Route path="/">
                    <MainScreen requestsDataset={requestsDataset}
                                partnerData={partnerData}
                    />
                </Route>

            </Switch>

        </Router>
    );
}

export default App;
