import React from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import PurchasesPeriodSummary from "./components/PurchasesPeriodSummary";
import {createBrowserHistory} from "history"
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ClientsSummary from "./components/ClientsSummary";
import Home from "./components/Home";
const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
      
      <Router history={history}>
      <Navigation/>
      <Route exact path="/" component={Home}/>
        <Route exact path="/purchasesSummary" component={PurchasesPeriodSummary}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/clientsSummary" component={ClientsSummary}/>

      </Router>
    </div>
  );
}

export default App;
