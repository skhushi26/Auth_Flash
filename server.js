/*
1- Uninstall nodemon using npm uninstall nodemon
2- click on package.json and add script like this 
scripts": {
    "dev": "nodemon server.js", we are not using nodemon 
    "start" : "node server.js"
  },

 3- click on package.json and create a file named .gitignore
    write these two lines in this file
    .env
    /node_modules
 4-  click on package.json and create a file named .env and type this mongo URI
 
 MONGO_URI = mongodb+srv://test123:Conestoga@cestar-node.wzsxe.mongodb.net/TappermanSessions?retryWrites=true&w=majority

 5- install the package dotenv using npm i dotenv

 6- Use the PORT variable and app.listen as below

 const PORT = process.env.PORT || 8080   

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})

7-To use MongoURi from .env file add this import in server.js and user.js
          import {} from 'dotenv/config'

8- Use this variable in user.js for mongo uri coming from .env file

const uri = process.env.MONGO_URI

9-Make sure to use 0.0.0.0/0  as allowed ip in the network settings in mongodb.com using
  network access and then ADD IP ADDRESS 0.0.0.0/0 
10-Stage all changes ,Commit all, changes and then Push to GitHUB

11-Now You are ready to link this App to Cyclic ,it will give you
an error to add Environment Variable for Mongo DB URI
Follow the instructions in Cyclic and copy the MongoURi from .env File to Cyclic
and connect again. The End
*/


import express from 'express'

import router from './routes/web.js'

import session from 'express-session'

import flash from 'connect-flash'

import MongoStore from 'connect-mongo'

import {} from 'dotenv/config'

const app = express()

// For using public folder for css or images or external js file

app.use(express.static('public'))

const PORT = process.env.PORT || 8080   

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})

app.set('view engine','ejs')


//const uri = "mongodb+srv://test123:Conestoga@cestar-node.wzsxe.mongodb.net/TappermanSessions?retryWrites=true&w=majority";


const store = new MongoStore({
    mongoUrl : process.env.MONGO_URI,
    collectionName :"Tapper_Sessions"
})

app.use(session({
    secret :"Secret Key For Cookie Signing",
    resave : false ,
    saveUninitialized : false,
    store : store
}))


app.use(express.urlencoded({extended:true}))

app.use(flash())

app.use('/',router)

