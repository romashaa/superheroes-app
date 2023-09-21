# superheroes-app
## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)

## Technologies Used
- React - version 18.2.0
- Axios - version 1.5.0
- Express: version 4.18.2,
- MongoDB
- Mongoose: version 7.5.1


## Features
Main features of the app:
- List of heroes with pagination
- Detailed information of hero
- Creating new heroes
- Removing existing heroes
- Editing existing heroes



## Setup
To run back-end server: open 'backend' folder, create .env file and provide MongoDb url:

```
DB_URL=example_url
```

Run following commands to bootstrap application:

```
npm install
npm run dev
```
To run front-end application: open 'frontend' folder, open consts.js file in the root of the project, specify API url:

```
export const API_URL="http://localhost:1234/"
```
Then open package.json file, find "proxy" setting and replace it with your API_URL:
```
"proxy": "http://localhost:5000/",
```

Run following commands to bootstrap application:

```
npm install
npm start
```


