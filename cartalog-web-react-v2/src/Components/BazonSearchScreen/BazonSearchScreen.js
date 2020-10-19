import React, {useEffect, useState} from "react";
import BazonSearchScreenView from "./BazonSearchScreenView";
import * as firebase from "firebase";

const BazonSearchScreen = () => {

    const [categories, setCategories] = useState([]);
    const [carBrands, setCarBrands] = useState([]);

    const [makeInput, setMakeInput] = useState("");
    const [modelInput, setModelInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [categoryHref, setCategoryHref] = useState("");

    const [url, setUrl] = useState("");

    console.log(makeInput)
    console.log(carBrands)
    console.log(categoryInput)
    console.log(categoryHref)

    useEffect(() => {

        if (makeInput.length > 1) {

            console.log("Search")

            const carBrandsRef = firebase.database().ref('parser').child('carBrands')
            carBrandsRef.orderByChild('brand')
                .startAt(makeInput)
                .endAt(makeInput+"\uf8ff")
                .once('value', snap => {

                }).then(r=>{

                console.log(r.val())

                if (r.exists()) {
                    setCarBrands(Object.values(r.val()))
                }

            })

        }

    }, [makeInput,modelInput])

    useEffect(() => {

        if (modelInput.length > 1) {

            console.log("Search")

            const carBrandsRef = firebase.database().ref('parser').child('carBrands')
            carBrandsRef.orderByChild('brand')
                .startAt(modelInput)
                .endAt(modelInput+"\uf8ff")
                .once('value', snap => {

                }).then(r=>{

                console.log(r.val())

                if (r.exists()) {
                    setCarBrands(Object.values(r.val()))
                }

            })

        }

    }, [modelInput])

    useEffect(() => {

        if (categoryInput.length > 1) {

            console.log("Search")

            const categoriesRef = firebase.database().ref('parser').child('categories')
            categoriesRef.orderByChild('category')
                .startAt(categoryInput)
                .endAt(categoryInput+"\uf8ff")
                .once('value', snap => {

                }).then(r=>{

                console.log(r.val())

                if (r.exists()) {
                    setCategories(Object.values(r.val()))
                }

            })

        }

    }, [categoryInput])

    useEffect(()=>{

        const url = `/${makeInput}/${modelInput}/${categoryInput}`

    },[makeInput,modelInput,categoryInput])

    const handleInputChange = (id, event) => {

        console.log(event)

        switch (id) {

            case 0:
                setMakeInput(event.target.value.toUpperCase())
                break;

            case 1:
                setModelInput(event.target.value.toUpperCase())
                break;

            case 2:
                setCategoryInput(event.target.value)
                break;

            case 3:
                setMakeInput(event.toUpperCase())
                break;

            case 4:
                setModelInput(event.toUpperCase())
                break;

            case 5:
                setCategoryInput(event)
                break;

        }

    }


    return (
        <BazonSearchScreenView carBrands={carBrands}
                               categories={categories}
                               handleInputChange={handleInputChange}
                               makeInput={makeInput}
                               modelInput={modelInput}
                               categoryInput={categoryInput}
                               url={url}
        />
    )

}

export default BazonSearchScreen