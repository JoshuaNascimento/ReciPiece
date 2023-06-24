# ReciPiece - An Ingredient Based Recipe Generator

This application's purpose is to allow a user to input ingredients which they have within their household. 
From there the app will take the inputted values and create an initial call to the [Spoonacular API](https://spoonacular.com/food-api).
The return of this call are recipes which have the least amount of missing ingredients required to complete the dish, of which we show 3 in a card based system.
As the user browses the recipes they can also visit the original website of said recipe.
Due to the first API call not returning the recipe's website link we make a second call to pull and redirect the user to the recipe's original site.

Provided below is a video demonstration of how the application works:


https://github.com/JoshuaNascimento/ReciPiece/assets/59673146/a133bb71-4011-4efe-889b-e103b1189fbf

