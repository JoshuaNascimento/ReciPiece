import React, { useEffect, useState} from 'react'
import { CardHeader, CardMedia, CardContent, Typography, ListItem, Grid, Button} from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ data }) {

  const [recipeList, setRecipeList] = useState([])

  const navigate = useNavigate();

  const handleViewRecipe = async (recipe) => {
    
    // Fetch data from /recipe endpoint in our server passing in ingredients parameters
    const response = await fetch(`/recipeLink?recipeID=${recipe.id}`)
    // Convert the response into json data
    const recipeData = await response.json();

    console.log(recipeData, "Recipe Data")

    navigate(`/recipeinfo`, {
      state: {
        recipe: recipeData
      },
    });
    //window.location.replace(data.sourceUrl);
  }

  /**
   * After component render useEffect will trigger and set the recipeList state to 3 random recipes within the recipe dataset passed in
   */
  useEffect(() => {
    setRecipeList(getRandomRecipes());
  },[])

  /**
   * getRandomRecipes generates a random number from 0 to the passed in dataset's length and assigns the recipe at that dataset index to the 
   * random recipes variable
   * @returns - Array consisting of 3 random recipes within the dataset
   */
  function getRandomRecipes() {
    // randomRecipes is initialized to array to allow for use of push() and keeping in mind recipeList state is also an array
    const randomRecipes = [];

    // Iterate continuously until randomRecipes contains 3 recipes
    while (randomRecipes.length < 3) {
      // Obtain a random floored number from 0 - dataset's length
      let randomIndex = Math.floor(Math.random() * (data.length));

      // Check if the recipe at that index of the dataset is not already in randomRecipes
      if (!randomRecipes.includes(data[randomIndex])) {
        randomRecipes.push(data[randomIndex])           // True; add the recipe to randomRecipes
      }
    }
    return randomRecipes;
  };

  return (
    // TODO: Link to recipe and text ingredients list
    <Grid container alignItems="stretch">
      {recipeList.map(recipe => (
        <Grid key={recipe.id} item sx={{ display: 'flex', flexDirection: "row", alignItems: "stretch" }} xs>
          <Grid item sx={{ background: 'gray' }} xs={11} >                                    {/* Use a Card to hold data for each individual recipe */}
            <CardHeader sx={{ maxHeight: "2rem", marginTop: "1rem" }} title={recipe.title} /> {/* CardHeader is the "title" used within the Card */}
            <CardContent>                                                                     {/* Stores the main "body" of the given Card */}
              <CardMedia component='img' image={recipe.image} height='140' />                 {/* Stores the image associated with each recipe */}
              <Button onClick={() => handleViewRecipe(recipe)} sx={{ margin: "1rem" }} variant="contained">View Recipe</Button>
              <Typography sx={{ marginTop: "1rem" }} variant="h5" align="center">             {/* Typography is a customizable text tag being utalized as a subheader within a Card */}
                Missing Ingredients:
              </Typography>

              <Grid>
                { // Map out all the missing ingredients that will be required prior to cooking the recipe
                  Array.from(recipe.missedIngredients).map(missingIngredient => (
                    <ListItem key={missingIngredient.name}>                 {/* Display each missing ingredient */}
                      <RemoveRoundedIcon />
                      {missingIngredient.name}
                    </ListItem>
                  ))
                }
              </Grid>




            </CardContent>

          </Grid>

        </Grid>


      ))}
    </Grid>
  )
}
