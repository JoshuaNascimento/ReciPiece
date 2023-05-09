import React, {useEffect} from 'react'
import {Grid, ListItem, Typography} from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export default function RecipeInstructions({instructions}) {

  if (!instructions) {
    return (
      <Typography>
        They didnt give us any instructions :( 
      </Typography>
    )
  } else {
    var data = instructions.toString().replace(/(<([^>]+)>)(<([^>]+)>)/ig, "\n");
    data = data.toString().replace(/(<([^>]+)>)/ig, "\n");
    data = data.split(/\r?\n|\r|\n/g);
  }

  

  return (
    // Container for RecipeInstructions

      <Grid sx={{background:"gray", textAlign:"center"}}>
        <Typography>
          Instructions:
          {Array.from(data)?.map( instruction  => (
            // Check if instruction has a value prior to rendering the line
            instruction !== "" ?
            <>
            <ListItem>
                <RemoveRoundedIcon/>
                {instruction}
              </ListItem>
            </>
              
            :
              <></>
          ))}
        </Typography>
      </Grid>

    
  )
}
