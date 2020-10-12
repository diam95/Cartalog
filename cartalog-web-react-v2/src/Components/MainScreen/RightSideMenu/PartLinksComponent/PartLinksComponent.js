import React, {useEffect, useState} from "react";
import PartLinksComponentView from "./PartLinksComponentView";
import * as firebase from "firebase";
import {useLocation} from "react-router-dom";

const PartLinksComponent = (props) => {

    const request = props.request
    const partnerData = props.partnerData

    const location = useLocation()

    const [linksArray, setLinksArray] = useState([]);
    const [linkInput, setLinkInput] = useState("");

    console.log(linksArray)

    useEffect(()=>{
        setLinksArray([])
    },[location])

    useEffect(() => {

        if (request && partnerData) {

            const city = partnerData.info.city
            const type = partnerData.info.type
            const partnerID = partnerData.info.partnerID

            const requestKey = request.key

            const linksArrayTemp = []

            const linksRef = firebase.database().ref('requestLinks').child(city).child(type).child(partnerID).child(requestKey)
            linksRef.on('child_added', snap => {

                if (snap.exists()) {
                    linksArrayTemp.push(snap.val())
                    setLinksArray([...linksArrayTemp])
                }

            })

        }

    }, [request, partnerData,])

    const handleAddLink = (linkInput) => {

        if (linkInput.length > 0) {

            const city = partnerData.info.city
            const type = partnerData.info.type
            const partnerID = partnerData.info.partnerID

            const requestKey = request.key

            const linkObject = {
                url: linkInput,
                title: ""
            }

            setLinkInput("")

            const linksRef = firebase.database().ref('requestLinks').child(city).child(type).child(partnerID).child(requestKey)
            linksRef.push(linkObject)

        }

    }

    const handleInputChange = (event) => {

            setLinkInput(event.target.value)

    }

    return (
        <PartLinksComponentView linksArray={linksArray}
                                handleAddLink={handleAddLink}
                                linkInput={linkInput}
                                handleInputChange={handleInputChange}
        />
    )

}

export default PartLinksComponent