import React from 'react'
import { Grid, Typography, ListItem } from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export default function IngredientList({ ingredients }) {
  return (
    // Container for the ingredients section
    <Grid item backgroundColor = "gray" textAlign={"center"}>
      <Typography>
        Ingredients:
        {
          Array.from(ingredients).map(ingredient => (
            <ListItem>
              <RemoveRoundedIcon />
              {`${ingredient.measures.us.amount} ${ingredient.measures.us?.unitShort}: `}
              {ingredient.nameClean}
            </ListItem>
          ))}
      </Typography>
  </Grid>
  )}
          

