import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import IngredientList from '../Components/IngredientList';
import RecipeInstructions from '../Components/RecipeInstructions';
import Button from '@mui/material/Button';

const sxStyle = {
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#FEDBD0',
}

export default function RecipeData() {

  const [recipeData, setRecipeData] = useState([]);

  const location = useLocation();
  
  // useLayoutEffect is utilized here as if runs synchronously meaning React waits for its completion prior to updating the DOM
  // Since useLocation is asynchronous, this allows us to wait for the data contained in location to be set into state then render elements based on that
  // useEffect would force the page to render prior to the state being updated and cause issues with rendering null values
  useLayoutEffect(() => {
    setRecipeData(location.state.recipe);
  }, [location])

  const handleVisitSite = () => {
    console.log("Clicked!", recipeData)
    window.location.replace(location.state.recipe.sourceUrl)
  }

  return (
    // Container for entire page
    <Grid container sx={sxStyle} xs>
      


      <Grid item xs={8}>
        <IngredientList ingredients={location.state.recipe.extendedIngredients}/>
      </Grid>
      <Grid item xs={8} textAlign={'center'}>
      <RecipeInstructions instructions={location.state.recipe.instructions}/>
      <Button sx={ {marginTop: '2rem'}} onClick={handleVisitSite} variant="contained" >
        Visit Recipe Site
      </Button>
      </Grid>
      
      

      </Grid>
      

      


  )
}
