import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tuyen from "./pages/Tuyen";
import Chuyen from "./pages/Chuyen";
import Employee from "./pages/Employee";
import _404_ from "./pages/_404_";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";


export default class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path={"/"} component={() => <Chuyen/>}/>
          <Route exact path={"/tuyen"} component={() => <Tuyen/> }/>
          <Route exact path={"/nhanvien"} component={() => <Employee />} />
          <Route component={_404_} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
