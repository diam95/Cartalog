import React, {useEffect, useState} from 'react'
import 'fontsource-roboto';
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import { SnackbarProvider} from 'notistack';
import CartScreen from "./Screens/CartScreen/CartScreen";

const App = () => {

    const [filterState, setFilterState] = useLocalStorage("filterState",{
        brands: [],
        models: {},
        parts_filter: [],
        parts_filter_detailed: {}
    });
    const [partsState, setPartsState] = useLocalStorage("partsState",{
        all_parts_by_partNames: {}
    });

    const [cartState, setCartState] = useLocalStorage('cartState', {
        items: []
    });

    function useLocalStorage(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If error also return initialValue
                console.log(error);
                return initialValue;
            }
        });

        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = value => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error);
            }
        };

        return [storedValue, setValue];
    }

    console.log({partsState})
    console.log({filterState})
    console.log({cartState})

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

            setFilterState({brands: brand, models: models, parts_filter: parts_filter, parts_filter_detailed: {}})

        })

    }, [setFilterState])

    const [darkMode, setDarkMode] = useState(false);
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
            <CssBaseline/>
            <Router>
                <div>
                    <Switch>

                        <Route path="/cart" exact>
                            <CartScreen cartState={cartState}
                                        darkMode={darkMode}
                                        setDarkMode={setDarkMode}
                                        setCartState={setCartState}
                                        filterState={filterState}
                            />
                        </Route>

                        <Route path="/">
                            <HomeScreen filterState={filterState}
                                        setFilterState={setFilterState}
                                        partsState={partsState}
                                        setPartsState={setPartsState}
                                        darkMode={darkMode}
                                        setDarkMode={setDarkMode}
                                        setCartState={setCartState}
                                        cartState={cartState}
                            />
                        </Route>

                    </Switch>
                </div>
            </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
