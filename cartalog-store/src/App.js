import React, {useMemo, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from "notistack";

const App = () => {

    const [cartState, setCartState] = useLocalStorage(`cartState`, {
        items: []
    });
    console.log({cartState})

    const [filterState, setFilterState] = useState({
        all_brands: [],
        all_models: {},
        parts_filter_detailed: {},
    });
    console.log({filterState})

    const [partsState, setPartsState] = useState({});
    console.log({partsState});

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

    const matches = useMediaQuery(theme.breakpoints.down('md'), {noSsr: true});
    return (
        <div>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline/>
                    <Router>
                        <Switch>
                            <Route path="/">
                                <HomeScreen matches={matches}
                                            darkMode={darkMode}
                                            setDarkMode={setDarkMode}
                                            cartState={cartState}
                                            setCartState={setCartState}
                                            filterState={filterState}
                                            setFilterState={setFilterState}
                                            partsState={partsState}
                                            setPartsState={setPartsState}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
