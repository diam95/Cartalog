import React from 'react'
import {
  BrowserRouter as Router,Switch,Route
} from "react-router-dom";

import HomeScreen from "./Screens/HomeScreen/HomeScreen";

const App =() =>{

  return (
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
