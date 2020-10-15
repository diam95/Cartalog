import React, {useState} from "react";
import PartLinkItemView from "./PartLinkItemView";
import * as firebase from "firebase";

const PartLinkItem = (props) => {

    const item = props.item
    const id = props.id
    const handleRemoveLink = props.handleRemoveLink
    const partnerData = props.partnerData
    const request = props.request

    const [titleInput, setTitleInput] = useState(item.title);
    const [urlInput, setUrlInput] = useState(item.url);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggleEdit = () => {

        const handleUpdateLink = (linkObj) => {

                const city = partnerData.city
                const type = partnerData.type
                const partnerID = partnerData.partnerID
                const requestKey = request.key
                const linkKey = item.linkKey

                const linksRef = firebase.database().ref('requestLinks').child(city).child(type).child(partnerID).child(requestKey).child(linkKey)

                linksRef.set(linkObj).then(r => {
                })

        }

        setIsEditMode(!isEditMode)

        if(isEditMode){

            const linkObj = {
                title:titleInput,
                url:urlInput,
                linkKey:item.linkKey
            }

            handleUpdateLink(linkObj)

        }

    }

    const handleTitleInputChange = (event) => {

        const value = event.target.value

        setTitleInput(value)

    }

    const handleUrlInputChange = (event) => {

        const value = event.target.value

        setUrlInput(value)

    }

    return (
        <PartLinkItemView item={item}
                          id={id}
                          handleRemoveLink={handleRemoveLink}
                          handleToggleEdit={handleToggleEdit}
                          isEditMode={isEditMode}
                          titleInput={titleInput}
                          urlInput={urlInput}
                          handleTitleInputChange={handleTitleInputChange}
                          handleUrlInputChange={handleUrlInputChange}
        />
    )

}

export default PartLinkItem