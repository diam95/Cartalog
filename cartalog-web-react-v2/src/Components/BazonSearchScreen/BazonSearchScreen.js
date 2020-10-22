import React, {useEffect, useState} from "react";
import BazonSearchScreenView from "./BazonSearchScreenView";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";

const BazonSearchScreen = () => {

    const [partNames, setPartNames] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);

    const [brandInput, setBrandInput] = useState("");
    const [modelInput, setModelInput] = useState("");
    const [partNameInput, setPartNameInput] = useState("");

    console.log({brandInput})

    const [url, setUrl] = useState("");

    useEffect(() => {

        if (brandInput.length > 1) {

            console.log("Search brands")

            const carBrandsRef = firebase.database().ref('parser').child('brands')
            carBrandsRef.orderByKey()
                .startAt(brandInput)
                .endAt(brandInput + "\uf8ff")
                .once('value', snap => {

                }).then(r => {

                if (r.exists()) {

                    console.log(r.val())
                    setCarBrands(Object.keys(r.val()))
                }

            })

        }

    }, [brandInput])

    useEffect(() => {

        if (modelInput.length > 1) {

            console.log("Search model")

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

            })

        }

    }, [modelInput,brandInput])

    useEffect(() => {

        if (partNameInput.length > 1) {

            console.log("Search")

            const partNamesRef = firebase.database().ref('parser').child('categories')
            partNamesRef.orderByChild('category')
                .startAt(partNameInput)
                .endAt(partNameInput + "\uf8ff")
                .once('value', snap => {

                }).then(r => {

                console.log(r.val())

                if (r.exists()) {
                    setPartNames(Object.values(r.val()))
                }

            })

        }

    }, [partNameInput])

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

        const search = firebase.functions().httpsCallable('getCarBrandsAndModels')
        search({URL:"https://1000zp.ru/"}).then(function(result) {
            console.log(result.data)

            const brandsRef = firebase.database().ref("parser").child("brands")
            brandsRef.set(result.data.brands)
            const modelsRef = firebase.database().ref("parser").child("models")
            modelsRef.set(result.data.models)

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
                               url={url}
                               handleSearch={handleSearch}
        />
    )

}

export default BazonSearchScreen