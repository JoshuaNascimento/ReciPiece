package com.example.ReciPiece.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;


import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Controller which contains routes for our application and the behaviour that occurs when a user vists the route
// Combines @Controller and @ResponseBody annotations, allowing return of string data as apposed to an entire view
@RestController
@CrossOrigin(origins = "localhost")  // CrossOrigin is the security protocol that prevents an address from calling itself so we must allow an exception
public class GreetingController {

    // Api key is held within application.properties and called using @Value to obscure it from public view
    @Value("${apiKey}")
    private String apiKey;

    // Request Mapping annotation makes this function a route, specifying a path within the annotation
    // Default method for RequestMapping is a GET request
    @RequestMapping("/hello")
    public String getGreeting() {
        return "Hello from getGreeting!";
    }

    // External call will be available on the route established in value
    @GetMapping(value = "/callclienthello")
    private String getHelloClient() {
        // Define clientside url to access the service
        String uri = "http://localhost:8080/hello";
        // RestTemplate is the class used to consume RESTful web services within Spring
        RestTemplate restTemplate = new RestTemplate();
        // getForObject is used on the defined service
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }

    // Another practise external call
    @GetMapping(value = "/joke")
    public String getJoke() {
        String url = "https://v2.jokeapi.dev/joke/Any?safe-mode";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }

    // Call Spoonacular Api to generate recipes based on ingredients provided
    @GetMapping(value = "/recipe")
    // RequestParam requires the parameter of "ingredients" to be passed when this route is called
    public String getRecipe(@RequestParam String ingredients) {

        // TODO: In future either find a better way to build url to allow for passing of other parameters like recipe limit
        String url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";

        // RestTemplate will be used to consume the RESTful api of Spoonacular
        RestTemplate restTemplate = new RestTemplate();

        // Create headers object which will be used to pass the apiKey instead of through the url, potentially keeps the key safer i'm unsure
        HttpHeaders headers = new HttpHeaders();
        // Set apiKey header using the key hidden in application.properties
        headers.set("x-api-key", apiKey);

        // Create Entity which consists of headers and a body
        // Set the headers of the entity
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // ResponseEntity extends HttpEntity and allows us to use exchange() instead of getForEntity()
        // This is preferred as getForEntity() doesn't allow for the passing of headers
        ResponseEntity<String> response = restTemplate.exchange(
                url + ingredients, HttpMethod.GET, requestEntity, String.class
        );

        // TODO: Error handle a bad request, potentially providing the status of the request to the frontend

        // Java uniquely uses strings as JSONs, so the return will potentially need to be modified to make it easier
        // for the frontend to convert the result to a JSON
        String result = response.getBody();
        System.out.println(result);
        return result;
    }
}
