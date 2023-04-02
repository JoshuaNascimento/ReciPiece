import React from 'react'
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardMedia, Box, CardContent, Typography, ListItem } from '@mui/material';
import IngredientSearch from '../Components/IngredientSearch.js';

const sxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#FEDBD0',
}

export default function Recipes() {

  const location = useLocation();

  const data = Array.from(location.state.recipes);

  return (

    // Main recipe container
    <Box display="flex" sx={sxStyle}>
      {/* Use IngredientSearch with the ingredients used to generate the current recipes data */}
      <IngredientSearch ingredients={location.state.ingredients} />
      {/* Recipe card Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20, gap: 5 }}>
        {data.slice(0, 3).map(recipe => (       // Grab recipe data from api call and map only the beginning 3 values from it
          <Card sx={{ padding: 0 }}>            {/* Use a Card to hold data for each individual recipe */}
            <CardHeader title={recipe.title} /> {/* CardHeader is the "title" used within the Card */}
            <CardContent>                       {/* Stores the main "body" of the given Card */}
              <CardMedia component='img' image={recipe.image} height='140' /> {/* Stores the image associated with each recipe */}
              <Typography variant="h5" align="center">  {/* Typography is a customizable text tag being utalized as a subheader within a Card */}
                Missing Ingredients:
              </Typography>
              
              { // Map out all the missing ingredients that will be required prior to cooking the recipe
                Array.from(recipe.missedIngredients).map(miss => (
                  <ListItem dense="true">       {/* Display each missing ingredient */}
                    {miss.name}
                  </ListItem>
                ))
              }
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
