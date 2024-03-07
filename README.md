<h1 align="center">
	<img width="120" src="https://i.imgur.com/fUEdIDW.png" alt="Pomotimer">
  <p> Node Vanilla API</p>
  
  ![dependencies](https://img.shields.io/badge/dependecies-0-brightgreen.svg?style=flat-square)
  ![javascript](https://img.shields.io/github/languages/top/laporeon/node-vanilla-api)
  ![node](https://img.shields.io/static/v1?label=node&message=20.11.1&color=2d3748&logo=node.js&style=flat-square)
  [![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/laporeon/node-vanilla-api/main/LICENSE)
</h1>

## Table of Contents

- [About](#about)
- [Usage](#usage)
  - [Requirements](#requirements)
  - [Installing](#installing)
  - [Starting](#starting)
  - [Routes](#routes)
    - [Requests](#requests)
      <br/>

## About

The purpose of this project was to create a simple API with basic CRUD (Create, Read, Update, Delete) operations using only native modules from Node, such as `fs` to write and read files and `http` to create the server and handle requests. No database was used, all the records are stored in a single **.txt** file that is single handed by Node file system module.

## Usage

### **Requirements:**

- [NodeJS](https://nodejs.org/en) v.20 or higher

If you use [NVM](https://github.com/nvm-sh/nvm), just run `nvm use` inside of the root folder.

### **Installing:**

Since the project was made using only native modules, there's no need to run `npm i` ou `yarn`, just clone this repository and you're good to go.

### **Starting**

```bash
$ npm start # Project will start at http://localhost:8001/
```

### **Routes**

| route         | HTTP method | params | description  |
| :------------ | :---------: | :----: | :----------: |
| `/`           |     GET     |   -    |  Home page   |
| `/movies`     |     GET     |   -    | List Movies  |
| `/movies`     |    POST     |   -    | Create Movie |
| `/movies/:id` |     GET     | `:id`  |  Find Movie  |
| `/movies/:id` |   UPDATE    | `:id`  | Update Movie |
| `/movies/:id` |   DELETE    | `:id`  | Delete Movie |

#### Requests

- `POST /movies`

Request body:

```json
{
  "title": "Legally Blonde",
  "year": 2001,
  "genre": "comedy",
  "duration": 96,
  "ageRating": 13,
  "director": "Robert Luketic"
}
```

- `PUT /movies/:id`

Request body:

```json
{
  "title": "Legally Blonde",
  "year": 2001,
  "genre": "comedy",
  "duration": 96,
  "ageRating": 13,
  "director": "Robert Luketic"
}
```

<br/>

[⬆ Back to the top](#---node-vanilla-api)
