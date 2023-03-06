import "./Home.css"
import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Home() {

  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredient, setIngredient] = useState('');

  // Responsible for handling when the ingredient submit button is cliced
  const handleIngredient = event => {
    event.preventDefault();

    // Pushes the ingredient in textfield into the ingredientsList state
    ingredientsList.push({
      ingredient
    })

    console.log("click handled", ingredient);
    console.log(ingredientsList);
    // Clear the ingredient state
    setIngredient('');
  }

  return (
    // Add form to allow user's to enter ingredients
    <div className="home-container">
      <h1>ReciPieces</h1>
      <form noValidate autoComplete="off">
        <TextField onChange={(e) => setIngredient(e.target.value)} className="ingredients-field" label="ingredients" variant="standard" size="medium" value={ingredient}/>
        <Button onClick={handleIngredient} className ="ingredients-button" variant="contained">Submit</Button>
        <Button className ="recipe-button" variant="contained">Find Recipe</Button>
      </form>

    </div>
  )
}
