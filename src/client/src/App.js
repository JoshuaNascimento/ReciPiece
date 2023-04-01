import React, {Component} from 'react';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from "./Pages/Home";
import Recipes from './Pages/Recipes';
import TextField from '@mui/material/Button';




class App extends Component {

    // Method fires on mount and makes a fetch request to the backend for a joke
    // Proxy is defined in the package.json to allow the frontend to connect with the correct backend port
    /*
    dadJokes = () => {
        fetch('/joke')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    };
    */

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path ="/recipes" exact element={<Recipes/>}/>
                </Routes>
            </Router>
            
    );
    }
}

export default App;