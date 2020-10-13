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

    useEffect(() => {
        setLinksArray([])
    }, [location])

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

            linksRef.on("child_removed", snap => {

                const removedLink = snap.val()

                linksArrayTemp.forEach((item,ind) => {

                    if (item.linkKey === removedLink.linkKey){

                        linksArrayTemp.splice(ind,1)
                        setLinksArray([...linksArrayTemp])

                    }

                })

            })

            linksRef.on("child_changed", snap => {

                const changedLink = snap.val()

                linksArrayTemp.forEach((item,ind) => {

                    if (item.linkKey === changedLink.linkKey){

                        linksArrayTemp[ind]=changedLink
                        setLinksArray([...linksArrayTemp])

                    }

                })

            })

            return (() => {

                linksRef.off("child_changed")
                linksRef.off("child_removed")
                linksRef.off("child_added")

            })

        }

    }, [request, partnerData,])

    const handleAddLink = (linkInput) => {

        if (linkInput.length > 0) {

            const city = partnerData.info.city
            const type = partnerData.info.type
            const partnerID = partnerData.info.partnerID

            const requestKey = request.key

            const linksRef = firebase.database().ref('requestLinks').child(city).child(type).child(partnerID).child(requestKey).push()

            const linkObject = {
                url: linkInput,
                title: "",
                linkKey: linksRef.key
            }

            setLinkInput("")

            linksRef.set(linkObject).then(r => {
            })

        }

    }

    const handleRemoveLink = (item) => {

        const city = partnerData.info.city
        const type = partnerData.info.type
        const partnerID = partnerData.info.partnerID
        const linkKey = item.linkKey

        const requestKey = request.key

        const linksRef = firebase.database().ref('requestLinks').child(city).child(type).child(partnerID).child(requestKey).child(linkKey)

        linksRef.remove().then(r => {
        })

    }

    const handleInputChange = (event) => {

        setLinkInput(event.target.value)

    }

    return (
        <PartLinksComponentView linksArray={linksArray}
                                handleAddLink={handleAddLink}
                                linkInput={linkInput}
                                handleInputChange={handleInputChange}
                                handleRemoveLink={handleRemoveLink}
                                request={request}
                                partnerData={partnerData}
        />
    )

}

export default PartLinksComponent