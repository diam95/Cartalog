import React, {useEffect, useState} from "react";
import BazonSearchScreenView from "./BazonSearchScreenView";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";

const BazonSearchScreen = () => {

    const [carBrands, setCarBrands] = useState([])
    const [carModels, setCarModels] = useState([])
    const [partNames, setPartNames] = useState([])
    const [partHrefs, setPartHrefs] = useState([])

    const [brandInput, setBrandInput] = useState("")
    const [modelInput, setModelInput] = useState("")
    const [partNameInput, setPartNameInput] = useState("")

    const [loadingBrands, setLoadingBrands] = useState(false)
    const [loadingModels, setLoadingModels] = useState(false)
    const [loadingParts, setLoadingParts] = useState(false)

    const [partsList, setPartsList] = useState([])
    const [url, setUrl] = useState("")
    console.log(url)

    useEffect(() => {

        setLoadingBrands(true)
        const carBrandsRef = firebase.database().ref('parser').child('brands')
        carBrandsRef.orderByKey()
            .once('value', snap => {

            }).then(r => {

            if (r.exists()) {

                console.log(r.val())
                setCarBrands(Object.keys(r.val()))

            }

            setLoadingBrands(false)

        })

    }, [])

    useEffect(() => {

        console.log("Search model")

        setLoadingModels(true)

        if (brandInput.length > 0) {
            const carBrandsRef = firebase.database().ref('parser').child('models').child(brandInput.toLowerCase())
            carBrandsRef.orderByKey()
                .startAt(modelInput.toUpperCase())
                .endAt(modelInput.toUpperCase() + "\uf8ff")
                .once('value', snap => {

                }).then(r => {

                if (r.exists()) {
                    console.log(r.val())
                    setCarModels(Object.keys(r.val()))
                }

                setLoadingModels(false)

            })
        }

    }, [modelInput, brandInput])

    useEffect(() => {

        if (partNameInput.length > 1) {

            console.log("Search")

            setLoadingParts(true)

            const partNamesRef = firebase.database().ref('parser').child('categories')
            partNamesRef.orderByChild('category')
                .startAt(partNameInput)
                .endAt(partNameInput + "\uf8ff")
                .once('value', snap => {

                }).then(r => {

                console.log(r.val())

                if (r.exists()) {
                    const partNamesTemp = Object.values(r.val())
                    setPartNames(partNamesTemp)

                    const hrefs = partNamesTemp.map(part => {
                        return part.href
                    })
                    setPartHrefs(hrefs)

                }

                setLoadingParts(false)

            })

        }

    }, [partNameInput])

    useEffect(() => {

        const partHref = partHrefs[0]

        setUrl(brandInput.toLowerCase() + "/" + modelInput.toLowerCase() + "/" + partHref)

    }, [brandInput, modelInput, partHrefs, partNameInput, partNames])

    const handleInputChange = (id, event) => {

        console.log(event)

        switch (id) {

            case 0:
                setBrandInput(event.target.value.toUpperCase())
                break;

            case 1:
                setModelInput(event.target.value)
                break;

            case 2:
                setPartNameInput(event.target.value)
                break;

            case 3:
                setBrandInput(event.toUpperCase())
                break;

            case 4:
                setModelInput(event)
                break;

            case 5:
                setPartNameInput(event)
                break;

            default:
                break;

        }

    }

    const handleSearch = () => {

        const getCarParts = firebase.functions().httpsCallable('getCarParts');
        getCarParts({URL: url}).then(function (result) {
            console.log(result.data)
            setPartsList(Array.from(result.data))
        });

    }

    return (
        <BazonSearchScreenView carBrands={carBrands}
                               carModels={carModels}
                               partNames={partNames}
                               handleInputChange={handleInputChange}
                               brandInput={brandInput}
                               modelInput={modelInput}
                               partNameInput={partNameInput}
                               handleSearch={handleSearch}
                               loadingBrands={loadingBrands}
                               loadingModels={loadingModels}
                               loadingParts={loadingParts}
                               partsList={partsList}
        />
    )

}

export default BazonSearchScreen