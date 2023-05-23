import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from "./Components/IngredientSearch";
import Recipes from './Pages/Recipes';
import RecipeData from './Pages/RecipeData';

class App extends Component {

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path ="/recipes" element={<Recipes/>}/>
                    <Route path="/recipeinfo" element={<RecipeData/>}/>
                </Routes>
            </Router>
            
    );
    }
}

export default App;