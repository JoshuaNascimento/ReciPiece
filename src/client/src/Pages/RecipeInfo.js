import React from 'react'
import {useLocation} from "react-router-dom";

export default function RecipeInfo(props) {

  const location = useLocation();

  const data = location.state;

  console.log(data, "data");

  return (
    // TODO: design and implement a card based system to display 3 recipes
    <div>
      Recipes!
    </div>
  )
}
