import React from 'react'
import {useLocation} from "react-router-dom";
import { Card, CardHeader, CardMedia, Box, CardContent, Typography, ListItem} from '@mui/material';

export default function Recipes(props) {

  const location = useLocation();

  const data = Array.from(location.state.recipes);

  console.log(data, "data");

  return (
    // TODO: design and implement a card based system to display 3 recipes
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20, gap: 5 } }>
      {data.slice(0,3).map( recipe => (
        <Card sx={ {padding: 0} }>
          <CardHeader title={recipe.title}/>
          <CardContent>
            
          <CardMedia component='img' image={recipe.image} height='140'/>

          <Typography variant="h5" align="center">
                  Missing Ingredients:
          </Typography>
              {
                
                Array.from(recipe.missedIngredients).map( miss => (
                  <ListItem dense="true">
                    {miss.name}
                  </ListItem>
                ))
              }
              

            
            
          </CardContent>
          
        </Card>
      ))}
    </Box>
    
  )
}
