import React from 'react'
import { useLocation } from "react-router-dom";
import { Grid } from '@mui/material';
import IngredientSearch from '../Components/IngredientSearch.js';
import RecipeCard from '../Components/RecipeCard.js';

const sxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#FEDBD0',

}

export default function Recipes() {

  const location = useLocation();

  return (

    // Main recipe container
    <Grid container sx={sxStyle}>
      {/* Use IngredientSearch with the ingredients used to generate the current recipes data */}
      <Grid item xs={2}>
        <IngredientSearch sx={ {padding:"5"} } ingredients={location.state.ingredients} />
      </Grid>

      <Grid item xs={1}>
        <br></br>
      </Grid>
      
      {/* Recipe card Box */}
      <Grid item xs={8}>
        <RecipeCard  data={location.state.recipes}/>
      </Grid>
      
    </Grid>
  )
}
