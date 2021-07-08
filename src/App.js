import React, { lazy } from "react";
import "antd/dist/antd.css";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import LayoutLogin from "./components/LayoutLogin";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase, { realtime } from "./firebase";

const Home = lazy(() => import("./pages/Home"));
const Dataterkini = lazy(() => import("./pages/Dataterkini"));
const Histori = lazy(() => import("./pages/Histori"));
const Prediksi = lazy(() => import("./pages/Prediksi"));
const Login = lazy(() => import("./pages/Login"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App=()=> {
  console.log("ini", localStorage.getItem("hasLogin"));
  if (localStorage.getItem("hasLogin")==="true") {
    return (
      <div className="App">
        <Router>
          <Layout>
            <Switch>
              <Redirect from="/login" to="/" />
              <Route path="/" exact={true} component={Home} />
              <Route path="/dataterkini" exact={true} component={Dataterkini} />
              <Route path="/histori" exact={true} component={Histori} />
              <Route path="/prediksi" exact={true} component={Prediksi} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <LayoutLogin>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" exact={true} component={Login} />
              <Redirect from="/login" to="/"/>
            </Switch>
            </LayoutLogin>
        </Router>
      </div>
      );
  }

}
export default App;