package com.example.ReciPiece.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

// Controller which contains routes for our application and the behaviour that occurs when a user vists the route
// Combines @Controller and @ResponseBody annotations, allowing return of string data as apposed to an entire view
@RestController
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

    // Call spoonacular passing in api key to get recipe result
    @GetMapping(value = "/recipe")
    public String getRecipe() {
        String url = String.format("https://api.spoonacular.com/recipes/complexSearch?apiKey=%s", apiKey);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }
}
