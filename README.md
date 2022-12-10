# Fedor's gym hub

This project will be a web application for sharing of workout plans, named after the most swole hamster in the world, Fedor.

## Technologies

The application will be built using Typescript, particularly React and its related libraries, with the design making use of MaterialUI.

Google Firebase will be used to facilitate user authentication (email & password) and Database.

Deployment will be done using Heroku

## Features

The app will allow both registered and unregistered users to browse workout plans, which were previously created by registered users.

A workout plan consists of:
- name and author
- description text
- difficulty level (beginner, intermediate, advanced)
- number of workouts in a week
- workout plan length (e.g., 30 days, 3 months...)
- cards for each individual workout (e.g. Push day) in a specific workout plan, each of these cards will contain exercises, sets and reps

Browsing will include filtering options, particularly based on author, difficulty level and workload (number of workouts per week)

Registered users will be able to create new workout plans for all the other users to see
