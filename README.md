<!-- Please replace anything appearing between curly brackets with your submission's value.  -->

# Directus Ml Ops

This project is a set of extensions allowing developers of the directus community to train, test and use machine learning model inside their existing directus.

## Details

- For somebody new in machine learning, it is a little bit to setup a decent infrastructure for the use of his model. Some developers whould be obliged to export their directus data in a json file, then train a model using python to finally embed the model in their nodejs backend just for simple predictions. This is really tedious and time consuming
- The main library I'm using is brain.js (https://github.com/BrainJS/brain.js) but I'm planning to add tensorflow js
- I'm trying to build a set of extensions, so I have chosen a bundle
- If I have more time, I will build a complete pipeline so some models can be trained every day with a cron task and only the best one in accuracy with be shipped to production for customer use.

## Screenshots
What the video on youtube
[![Watch the video](https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/200px-YouTube_social_white_square_%282017%29.svg.png)](https://youtu.be/cJoY7ABo4UA?si=ymqG44h0lMEdgDrV)

## How to run ?

1. Make sure you have created a .env file for directus configurations
2. Make sure you have docker and docker-compose installed
3. Run `docker-compose -f docker-compose.demo.yml up` in the root directory. the app will run on port 8055

4. Try to login:
    - Admin email: `admin@example.com` 
    - Admin password: `@Admin2019`