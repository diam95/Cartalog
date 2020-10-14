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

    const [partnerData, setPartnerData] = useState(undefined);
    const [requestsDataset, setRequestsDataset] = useState([]);
    const [answeredRequests, setAnsweredRequests] = useState({});
    const [newMessages, setNewMessages] = useState([]);

    console.log(partnerData)
    console.log(answeredRequests);

    //AUTH STATE, LOAD PARTNER DATA
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            const uid = user.uid

            if (user) {

                const partners2Ref = firebase.database().ref('partners2').child(uid)

                partners2Ref.once('value', snap => {

                }).then(r => {

                    if (r.exists()) {

                        const data = r.val()

                        data.info.partnerID = uid
                        setPartnerData(data)

                    }

                })
            }

        })

    }, [])

    //LOAD REQUESTS DATASET
    useEffect(() => {

        if(partnerData){

            if (partnerData.info) {

                let requestsArray = []

                const partnerType = partnerData.info.type
                const city = partnerData.info.city
                const requestsRef = firebase.database().ref('requests').child(city).child(partnerType).orderByKey()

                const handleNewRequests = () => {

                    const startAt = requestsArray[0].key

                    console.log(startAt)

                    requestsRef.startAt(startAt).on('child_added', snap => {

                        if (snap.exists()) {

                            if (snap.val().key !== startAt) {

                                requestsArray.unshift(snap.val())
                                setRequestsDataset([...requestsArray])

                            }

                        }

                    })

                }

                const handleRemovedRequests = () => {

                    requestsRef.on('child_removed', snap => {

                        const removedRequest = snap.val()

                        const requestKey = removedRequest.key

                        requestsArray.forEach((item, ind) => {

                            if (item.key === requestKey) {

                                requestsArray.splice(ind, 1)
                                setRequestsDataset([...requestsArray])

                            }

                        })

                    })

                }

                requestsRef.limitToLast(30).once('value', snap => {

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

        }


    }, [partnerData])

    //LOAD ANSWERED REQUESTS
    useEffect(() => {

        if(partnerData){

            if (partnerData.info) {

                if (partnerData.info.partnerID) {

                    const partnerID = partnerData.info.partnerID

                    const answeredRequestsRef = firebase.database().ref('partners2').child(partnerID).child('answeredRequests')
                    answeredRequestsRef.on('value', snap => {

                        if (snap.exists()) {

                            const data = snap.val()

                            setAnsweredRequests(data)

                        }

                    })

                }
            }

        }

    }, [partnerData])

    //LOAD NEW MESSAGES
    useEffect(() => {

        if(partnerData){

            if (partnerData.info.partnerID) {

                const partnerID = partnerData.info.partnerID

                const newMessagesRef = firebase.database().ref("partners2").child(partnerID).child("newMessages")
                newMessagesRef.on('value', snap => {

                    if (snap.exists()) {

                        setNewMessages(snap.val())

                    }

                })

                return (() => {
                    newMessagesRef.off('value')
                })

            }

        }


    }, [partnerData])

    //HANDLE REQUESTS SORTING
    useEffect(() => {

        const getContainerStyle = () => {

            const locationArr = location.pathname.split("/")

            if (locationArr[2] === request.key) {
                return classes.requestItemContainerClicked
            } else if (answeredRequests) {

                const answeredRequestsArr = Object.keys(answeredRequests)

                if (answeredRequestsArr.includes(request.key)) {

                    return classes.requestItemContainer1

                } else return classes.requestItemContainer2

            }

        }

    }, [requestsDataset, answeredRequests])

    return (
        <Router>

            <Switch>

                <Route path="/login">
                    <LoginScreen partnerData={partnerData}/>
                </Route>

                <Route path="/">
                    <MainScreen requestsDataset={requestsDataset}
                                partnerData={partnerData}
                                answeredRequests={answeredRequests}
                    />
                </Route>

            </Switch>

        </Router>
    );
}

export default App;
