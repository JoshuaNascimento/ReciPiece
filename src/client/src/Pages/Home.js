//import "./Home.css"
import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom";
import { List, Typography, Grid} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Box } from '@mui/system';

const sxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#FEDBD0',
}

export default function Home() {

  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredient, setIngredient] = useState('');

  // Used to change the websites page
  const navigate = useNavigate();

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
    // TODO: Use prevent default to error check the response than only send to new page if response is 200
    //event.preventDefault();

    // Create string of comma seperated elements from ingredientsList state array
    let ingredientsString = ingredientsList.join()

    // Fetch data from /recipe endpoint in our server passing in ingredients parameters
    const response = await fetch(`/recipe?ingredients=${ingredientsString}`)
    // Convert the response into json data
    const recipes = await response.json();

    // using the useNavigate hook we tell the browser to change page urls and pass to the component found at that route the recipes information
    navigate('/recipes', {
      state: {
        recipes: recipes
      },
    });
    
  }

  /**
   * Upon clicking the icon beside an ingredient in the rendered list we take the index of the ingredient to be removed.
   * Then we create a new array for ingredientsList state which splices out the ingredient and sets this array as our new state.
   * @param {*} ingredient - The ingredient within the UI ingredient list which is to be removed
   */
  const deleteIngredient = (ingredient) => {
    
    const removalIndex = ingredientsList.indexOf(ingredient); // Obtain index of ingredient we wish to remove
    // Create new array using spread operator to create a new array which does not reference previous one
    // This allows React to properly interpret state change and render upon change correctly
    const data = [...ingredientsList];                        
    data.splice(removalIndex, 1);                             // Now find the index of the ingredient and remove 1 element
    setIngredientsList(data);                                 // Set the new ingredient list to the new array
  }

  return (
    // Main body of the home page
    <Box sx={sxStyle}>

      <Box marginTop='-25%'>
        {/* Text field for user to enter in their ingredients */}
        <TextField onChange={(e) => setIngredient(e.target.value)}label="ingredients" variant="standard" size="medium" value={ingredient}/>
        {/* Button to add inputted ingredient into ingredientList state */}
        <AddBoxRoundedIcon onClick={handleIngredient} fontSize="large"  cursor="pointer"/>
        {/* Button which submits ingredientList to backend and request recipes */}
        
        {/* Conditional render of the ingredients list, displays and allows removal of inputted ingredients */}
        {ingredientsList.length > 0 &&
        <Box backgroundColor='gray' marginTop={'1rem'} paddingBottom={'1rem'} paddingTop={'1rem'} textAlign={'center'}>
          <Typography marginBottom={'1rem'}>My Ingredients:</Typography>
          {ingredientsList.map( ingredient => ( 
              <Box key={ingredient}>
                {/* ListItem component renders each ingredient followed by an icon used to delete the ingredient from the list */}
                <Grid container sx={ {display:"flex", paddingLeft:"1.5rem"} } key={ingredient}>
                  <Grid item xs={2}><RemoveRoundedIcon/></Grid>
                  <Grid item xs={1}>{ingredient}</Grid>
                  <Grid item xs={9}><DeleteIcon color="primary" onClick={() => deleteIngredient(ingredient)} sx={ {cursor : "pointer"} }/></Grid>
                </Grid>
                
                
              </Box>))}
              <Button sx={ {marginTop: '2rem'}} onClick={handleRecipeSearch} variant="contained" >Find Recipes</Button>
        </Box>
        }

        
      </Box>
      
    </Box>
  )
}
