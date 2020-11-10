import React, {useEffect, useState} from 'react'
import 'fontsource-roboto';
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import firebase from "firebase/app";
import "firebase/database";

const App = () => {

    const [filterState, setFilterState] = useState({
        brands: [],
        models: {},
        parts_filter: [],
        parts_filter_detailed:{}
    });
    const [partsState, setPartsState] = useState({});

    console.log({partsState})
    console.log({filterState})

    useEffect(() => {

        const brandsRef = firebase.database().ref('brands_models/brands')
        const modelsRef = firebase.database().ref('brands_models/models')

        const partsFilterRef = firebase.database().ref('parts_filter')

        const allPromises = []

        allPromises.push(brandsRef.once('value').then(r => {
            return r.val()
        }))
        allPromises.push(modelsRef.once('value').then(r => {
            return r.val()
        }))
        allPromises.push(partsFilterRef.once('value').then(r => {
            return r.val()
        }))

        Promise.all(allPromises).then(r => {

            const brand = r[0]
            const models = r[1]
            const parts_filter = r[2]

            setFilterState({brands: brand, models: models, parts_filter: parts_filter,parts_filter_detailed: {}})

        })

    }, [])

    return (
        <Router>
            <div>
                <Switch>

                    <Route path="/">
                        <HomeScreen filterState={filterState}
                                    setFilterState={setFilterState}
                                    partsState={partsState}
                                    setPartsState={setPartsState}
                        />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
