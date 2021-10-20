import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBatchDocument from "./components/add-batchdocument.component";
import BatchDocument from "./components/batchdocument.component";
import BatchDocumentsList from "./components/batchdocument-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/batchdocuments" className="navbar-brand">Armedia RSPCC</a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/batchdocuments"} className="nav-link">
                Batch Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/batchdocuments"]} component={BatchDocumentsList} />
            <Route exact path="/add" component={AddBatchDocument} />
            <Route path="/batchdocuments/:batchId" component={BatchDocument} />
          </Switch>
        </div>
      </div>
    );
    // ...
  }
}

export default App;