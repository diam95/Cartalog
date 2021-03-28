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
import BazonSearchScreen from "./Components/BazonSearchScreen/BazonSearchScreen";

const App = () => {

    const [partnerData, setPartnerData] = useState(undefined);
    const [requestsDataset, setRequestsDataset] = useState([]);
    const [sortedDataset, setSortedDataset] = useState([]);
    const [answeredRequests, setAnsweredRequests] = useState({});
    const [newMessages, setNewMessages] = useState([]);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            const uid = user.uid

            if (user) {

                const partners2Ref = firebase.database().ref('partners2').child(uid).child('info')

                partners2Ref.on('value', snap => {

                    if (snap.exists()) {

                        const data = snap.val()

                        data.partnerID = uid
                        setPartnerData(data)

                    }

                })

                return(()=>{
                    partners2Ref.off('value')
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

            const answeredRequestsKeys = Object.keys(answeredRequests)

            const newRequestsTemp = []

            temp.forEach((request, ind) => {

                if (!answeredRequestsKeys.includes(request.key)) {

                    newRequestsTemp.unshift(request)

                }

                if (ind === temp.length - 1) {

                    if(newRequestsTemp.length>0){

                        newRequestsTemp.forEach((newRequest, indexxxx) => {

                            const delInd = temp.indexOf(newRequest)

                            temp.splice(delInd,1)
                            temp.unshift(newRequest)

                            if (indexxxx === newRequestsTemp.length - 1) {

                                setSortedDataset([...temp])

                            }

                        })

                    } else {

                        setSortedDataset([...temp])

                    }

                }

            })


        }

        const handleAnsweredRequestsSort = () => {

            if (answeredRequests) {

                const answeredRequestsKeys = Object.keys(answeredRequests)

                const answeredRequestsValuesTemp = Object.values(answeredRequests)
                const answeredRequestsValues = Object.values(answeredRequests)

                answeredRequestsValues.sort().reverse()

                const sortingIndexes = []

                answeredRequestsValues.forEach((timestamp, ind) => {

                    if (timestamp > 0) {
                        sortingIndexes.push(answeredRequestsValuesTemp.indexOf(timestamp))
                    }

                    if (ind === answeredRequestsValues.length - 1) {

                        sortingIndexes.reverse()

                        sortingIndexes.forEach((index, idx) =>{

                            const requestKey = answeredRequestsKeys[index]

                            temp.forEach((request,ind) => {

                                if(request.key === requestKey){

                                    temp.splice(ind,1)
                                    temp.unshift(request)

                                }

                            })

                            if (idx === sortingIndexes.length - 1) {
                                handleNewMessagesSort()
                            }

                        })

                    }

                })

                if(answeredRequestsValues.length===0){
                    setSortedDataset([...temp])
                }

            } else {

                handleNewMessagesSort()

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

                <Route path="/bazonSearch">
                    <BazonSearchScreen/>
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
