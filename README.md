# Auth Service

This micro-service mainly focuses on the authorization and authentication of the users.

- `Authentication`: It is a process by which we can uniquely identify users on our application. This process tells about who the user is.

- `Authorization`: It is a process by which we can identify the capabilities of a user i.e what a user can do in our application.
  Eg, we use Flipkart so when logging in as a normal user you have different access and when you log in as a seller it's different, a seller can sell the products on the app, not the normal user.

---

## Requirements

For development, you will need Node.js and a node global package, npm, installed in your environement.

## Project Setup

- clone the project on your local
  - git clone `https://github.com/S-a-k-s-h-i/Auth-Service.git`
- Execute `npm install` on the same as of your root directory of the downloaded project.
- Create a `.env` file in the root directory and add the following environment variables.
  - `PORT=3000`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "AUTH_DB_DEV"",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}

```

- Once you have added your db config as listed above, go to the src folder from your terminal and execute command `npx sequelize db:create`
- Then execute
  - `npx sequelize db:migrate`
  - `npx sequelize db:seed:all`

## Running the app

    $ npm start

## Database Tables

### User Table

    - id,email,password,createdAt,updatedAt

### Roles Table

    - id,name,createdAt,updatedAt

### UserRoles Table

    - `through` table to create `MANY TO MANY` association between tables `Users` and `Roles`
