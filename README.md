## Installation

Clone the repo and run `npm install`.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).<br>
You can find the most recent version of the guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>

### `npm run build-ssr`

Builds the app for server side rendering in production to the `build_ssr` folder.

### `npm run server`

Run the server for server side rendering.<br>
Open [http://localhost:5555](http://localhost:5555) to view it in the browser.

## Features

- State is decoupled from the UI.
  - Routing via [mobx-state-router](https://github.com/nareshbhatia/mobx-state-router).
  - State is managed in Mobx stores.
- The application is divided into pages. Pages have their own Mobx store and are linked to routes.
- Code splitting on page level.
- Server side rendering. Works out of the box with pages that load data asynchronously.
