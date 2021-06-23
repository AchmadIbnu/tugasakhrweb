import React, { lazy } from "react";
import "antd/dist/antd.css";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route , HashRouter} from "react-router-dom";
import firebase, { realtime } from "./firebase";

const Home = lazy(() => import("./pages/Home"));
const Dataterkini = lazy(() => import("./pages/Dataterkini"));
const Histori = lazy(() => import("./pages/Histori"));
const Prediksi = lazy(() => import("./pages/Prediksi"));
const Trigger = lazy(() => import("./pages/Trigger"));


const loading = (
  <div className="pt-3 text-center">
  <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
  )

function App() {
  return (
    <div className="App">
    <Router>
    <Layout>
    <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/dataterkini" exact={true} component={Dataterkini} />
    <Route path="/histori" exact={true} component={Histori} />
    <Route path="/prediksi" exact={true} component={Prediksi} />
    
    </Switch>
    </Layout>
    </Router>
    <HashRouter>
    <React.Suspense fallback={loading}>
    <Switch>
    <Route exact path="/trigger" name="Trigger Page" render={props => <Trigger {...props}/>} />
    </Switch>
    </React.Suspense>
    </HashRouter>
    </div>
    );
}
export default App;