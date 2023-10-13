# TravelGPT

A travel itinerary planner to create, join and manage travel itineraries with the aid of openAI.

Deployment page: [TravelGPT]("https://project3-frontend-bootcamp.vercel.app/)

## Preview

gif walkthrough to be uploaded

## Features

- Add new users or check for existing users in the database
- Add, edit and delete itinerary/ activities
- Join/ Leave itinerary that are tagged as public
- Separate the itinerary available to user via public itineraries, upcoming user itineraries and historical user itineraries
- view the tracjectory taken by the itinerary on the map which shows all the location of interest covered by the itinerary

## Tech Used

- Front end: [React](https://react.dev/)
- Routing: [React Router](https://reactrouter.com/en/main)
- UI: [Material-UI](https://mui.com/)

## Setup

**Pre-requisite: To be used with [TravelGPT Backend](https://github.com/calebcianc/project3-backend-bootcamp) in order to run the full application.**

This project is created using create-react-app. Before starting, it is required to run the following steps for the application to work

1. Clone repo to local

2. Configure `.env` file, make sure to get your own API keys stated below and insert it into your `.env` file

```
REACT_APP_DOMAIN = <REACT_APP_DOMAIN>
REACT_APP_CLIENTID = <REACT_APP_CLIENTID >
REACT_APP_AUDIENCE = <REACT_APP_AUDIENCE >
REACT_APP_GOOGLE_API_KEY = <API Key>
```

3. Install all dependencies required in this repo, and run locally

```
npm i
npm start
```

## Contributors

- [Caleb Castro](https://github.com/calebcianc)
- [Chloe Li](https://github.com/khloeli)
