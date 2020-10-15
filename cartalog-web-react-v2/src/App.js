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
    const [sortedDataset, setSortedDataset] = useState([]);
    const [answeredRequests, setAnsweredRequests] = useState({});
    const [newMessages, setNewMessages] = useState([]);

    console.log(partnerData)
    console.log(answeredRequests);
    console.log(newMessages)

    //AUTH STATE, LOAD PARTNER DATA
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            const uid = user.uid

            if (user) {

                const partners2Ref = firebase.database().ref('partners2').child(uid).child('info')

                partners2Ref.once('value', snap => {

                }).then(r => {

                    if (r.exists()) {

                        const data = r.val()

                        data.partnerID = uid
                        setPartnerData(data)

                    }

                })
            }

        })

    }, [])

    //LOAD REQUESTS DATASET
    useEffect(() => {

        if (partnerData) {

            if (partnerData) {

                let requestsArray = []

                const partnerType = partnerData.type
                const city = partnerData.city
                const requestsRef = firebase.database().ref('requests').child(city).child(partnerType).orderByKey()

                const handleNewRequests = () => {

                    const startAt = requestsArray[0].key

                    console.log(startAt)

                    requestsRef.startAt(startAt).on('child_added', snap => {

                        if (snap.exists()) {

                            if (snap.val().key !== startAt) {

                                console.log(snap.val())

                                requestsArray.unshift(snap.val())
                                setRequestsDataset([...requestsArray])

                            }

                        }

                    })

                }

                const handleRemovedRequests = () => {

                    requestsRef.on('child_removed', snap => {

                        console.log(snap.val())

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

                requestsRef.once('value', snap => {

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

        if (partnerData) {

                if (partnerData.partnerID) {

                    const partnerID = partnerData.partnerID

                    const answeredRequestsRef = firebase.database().ref('partners2').child(partnerID).child('answeredRequests')
                    answeredRequestsRef.on('value', snap => {

                        if (snap.exists()) {

                            const data = snap.val()

                            setAnsweredRequests(data)

                        }

                    })

                    return (() => {
                        answeredRequestsRef.off('value')
                    })

                }
            }

    }, [partnerData])

    //LOAD NEW MESSAGES
    useEffect(() => {

        if (partnerData) {

            if (partnerData.partnerID) {

                const partnerID = partnerData.partnerID

                const newMessagesRef = firebase.database().ref("partners2").child(partnerID).child("newMessages")
                newMessagesRef.on('value', snap => {

                    setNewMessages(snap.val())

                })

                return (() => {
                    newMessagesRef.off('value')
                })

            }

        }


    }, [partnerData])

    //HANDLE REQUESTS SORTING
    useEffect(() => {

        const temp = [...requestsDataset]

        const handleNewMessagesSort = () => {

            if (newMessages) {

                const newMessagesArray = Object.keys(newMessages)

                requestsDataset.forEach((request, ind) => {

                    if (newMessagesArray.includes(request.key)) {

                        temp.splice(ind, 1)
                        temp.unshift(request)
                    }

                    if(ind===requestsDataset.length-1){
                        setSortedDataset(temp)
                    }

                })

            }

        }

        const handleAnsweredRequestsSort = () => {

            if (answeredRequests) {

                const answeredRequestsKeys = Object.keys(answeredRequests)

                requestsDataset.forEach((request, ind) => {

                    if (!answeredRequestsKeys.includes(request.key)) {

                        temp.splice(ind, 1)
                        temp.unshift(request)

                    }

                    if (ind === requestsDataset.length - 1) {
                        handleNewMessagesSort()
                    }

                })

            }

        }

        handleAnsweredRequestsSort()


    }, [requestsDataset, answeredRequests, newMessages])

    return (
        <Router>

            <Switch>

                <Route path="/login">
                    <LoginScreen partnerData={partnerData}/>
                </Route>

                <Route path="/">
                    <MainScreen requestsDataset={requestsDataset}
                                sortedDataset={sortedDataset}
                                partnerData={partnerData}
                                answeredRequests={answeredRequests}
                                newMessages={newMessages}
                    />
                </Route>

            </Switch>

        </Router>
    );
}

export default App;
