/**********************************************
 * Notetaking Application Challenge
 * ==================================
 ***********************************************/

/** # Import all libraries  #
/*  ====================== */
// 1) Import all required modules
const express = require("express");
const app=express();
require("dotenv").config();


// In-built Node Modules (filesystem and path)
const fs = require("fs");
const path = require("path");

// NPM installed modules
const basicAuth = require("express-basic-auth");
const {engine} = require("express-handlebars")


// Set up your application, import the required packages
const knexConfig = require("./knexfile")["development"];
const knex=require('knex')(knexConfig);
const AuthChallenger = require("./AuthChallenger");
const NoteService = require("./Services/NoteService");
const NoteRouter = require("./Routers/NoteRouter");

// Capitalize when it is a class

/** # Configure Express #
/*  ====================== */
// 2) Configure Express
// Set up handlebars (set up engine and register handlebars with express)
// Look at the example from the lecture: https://xccelerate.talentlms.com/unit/view/id:2002
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');

// Set up Express
app.use(express.static("public"));
// Set up any middleware required, like express.json()
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());


// Set up and configure express-basic-auth using the AuthChallenger
app.use(
  basicAuth({
    authorizer: AuthChallenger(knex),
    challenge: true,
    authorizeAsync: true,
    realm: "Note Taking with knex",
  })
);


/** # Set up NoteService  #
/*  ====================== */
// 3) Past in the file into the noteservice class
const noteService= new NoteService(knex);

/** # Set up basic express server  #
/*  ====================== */
// 4) Set up basic express server
// Set up your route handler for '/' ==> send and index page to the users

// middleware
app.use('/', (req, res, next) => {
  console.log(req.url)
  console.log(req.method)
  next()
})

app.get("/", (req, res) => {
  console.log("hihihi")
  // Create a callback function
  // You always need a .then to
  noteService.list(req.auth.user).then((data) => {
    console.log(data);
    res.render("index", {
      user: req.auth.user,
      notes: data,
    });
  });
});

// DONT DO STEP FOUR UNTIL NEXT WEEK
/** # Set up authentication   #
/*  ====================== */
// 5) Set up authentication
// Set up basic auth
// DONT DO THE ABOVE PART UNTIL NEXT WEEK

/** # Set up routes from noteservice  #
/*  ====================== */
// 6) Create a new instance of noteService and pass the file path/to/the/file where you want the service to read from and write to.
app.use("/api/info", new NoteRouter(noteService).router());
/** #  Set up Note Router  #
/*  ====================== */
// 7) Set up the NoteRouter - handle the requests and responses in the note, read from a file and return the actual data, get the note from your JSON file and return to the clients browser.
// any notes that go to api/routes will go to noterouter
// /api/notes/:id

// make your application listen to a port of your choice.
app.listen(3000, () => {
  console.log("Listening on 3000");
});

module.exports = app;

