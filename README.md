# Fedor's gym hub

This project is a simple web application for sharing of workout plans, named after the most swole hamster in the world, Fedor.

## Authors

- Marek Laššák
- Dominik Lašo

- special thanks to Samuel Ďurkovic (https://gitlab.com/SamoDurkovic) for capturing Fedor's magnificence into an incredible logo


## Technologies

The application is built using Typescript, particularly React and its related libraries, with the design making use of MaterialUI.

Google Firebase is used to facilitate user authentication (email & password) and Database.

Deployment is done using Firebase and its interactions with GitHub actions.

## Features

The app allows both registered and unregistered users to browse workout plans, which were previously created by registered users.

A workout plan consists of:
- name and author
- description text
- difficulty level (beginner, intermediate, advanced)
- number of workouts in a week
- workout plan length (e.g., 30 days, 3 months...)
- cards for each individual workout (e.g. Push day) in a specific workout plan, each of these cards will contain exercises, sets and reps

Browsing includes filtering options, particularly based on author, difficulty level and workload (number of workouts per week)

Registered users are able to create new workout plans for all the other users to see
