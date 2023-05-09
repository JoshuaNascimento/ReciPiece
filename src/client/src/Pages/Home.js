import React from 'react'
import IngredientSearch from "../Components/IngredientSearch.js";
import { Box } from '@mui/system';

export default function Home() {

  const sxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#FEDBD0',
  }

  return (
    <Box sx={{sxStyle}} display="flex">
      <IngredientSearch/>
    </Box>
    
  )
}
