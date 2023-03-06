import "./Home.css"
import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Home() {

  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  // Responsible for handling when the ingredient submit button is cliced
  const handleIngredient = event => {
    // preventDefault prevents the standard response of submitting content in the case of a form
    // We use prevent default to allow the function to perform custom work on an element instead of default submission
    event.preventDefault();

    // Pushes the ingredient in textfield into the ingredientsList state
    const data = ingredientsList;
    data.push(ingredient);
    setIngredientsList(data)

    console.log(ingredientsList);
    // Clear the ingredient state
    setIngredient('');

  }

    /**
     * Takes the ingredientsList state and converts it to a comma seperated string to be used in fetching recipes from our backend
     * based on the ingredients provided by the user. We also specify this as an async function as we will (a)wait on the server's response to continue.
     * TODO: error handling if the response is not good as right now we're assuming a 200 response
     * @param {*} event - Trigger for when the Find Recipe button is clicked
     */
  const handleRecipeSearch = async (event) => {
    event.preventDefault();

    // Create string of comma seperated elements from ingredientsList state array
    let ingredientsString = ingredientsList.join()

    // Fetch data from /recipe endpoint in our server passing in ingredients parameters
    const response = await fetch(`/recipe?ingredients=${ingredientsString}`)
    // Convert the response into json data
    const recipes = await response.json();
    console.log(recipes);
    // Set the recipes state to the response obtained
    setRecipes(recipes);
  }

  return (
    // Add form to allow user's to enter ingredients
    <div className="home-container">
      <h1>ReciPieces</h1>
      <form noValidate autoComplete="off">
        <TextField onChange={(e) => setIngredient(e.target.value)} className="ingredients-field" label="ingredients" variant="standard" size="medium" value={ingredient}/>
        <Button onClick={handleIngredient} className ="ingredients-button" variant="contained">Submit</Button>
        <Button onClick={handleRecipeSearch} className ="recipe-button" variant="contained">Find Recipe</Button>
      </form>

    </div>
  )
}
