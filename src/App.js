import React, { lazy } from 'react';
import "antd/dist/antd.css";
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase, { realtime } from './firebase'


const Home = lazy(() =>  import("./pages/Home"));
const Dataterkini = lazy(() =>  import("./pages/Dataterkini"));
const Histori = lazy(() =>  import("./pages/Histori"));
const Prediksi = lazy(() =>  import("./pages/Prediksi"));
const Trigger = lazy(() =>  import("./pages/Trigger"));

function App() {
  return( <div className="App">
    <Router>
    <Layout>
    
    <Switch>
    <Route path='/' exact={true} component={Home} />
    <Route path='/dataterkini' exact={true} component={Dataterkini} />
    <Route path='/histori' exact={true} component={Histori} />
    <Route path='/prediksi' exact={true} component={Prediksi} />
    <Route path='/trigger' exact={true} component={Trigger} />
    </Switch>
    </Layout>
    
    </Router>
    </div> )
}
export default App;
