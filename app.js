// Imports
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path')
const express = require('express')
const app = express()
const port = 8000
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)
//------------End of Imports------------

// Local variable to keep all the users
// Hard codded login
const users = [{ id: '1720722672653', 
    username: 'user', 
    password: '$2b$10$v3ScrR9XeudugtxBMwjV1.aoGBR/j25oQ35fVT8OBjjazRejwVS4q'}]

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public.js'))

// views
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//------------End of Views------------

// Use statements
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
//------------End of Use Statements------------

// Renders
// First page
app.get('', checkAuthenticated, (req, res) => {
    res.render('login')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

// Successful or failed login attempts redirects
app.post('/login', passport.authenticate('local', {
    successRedirect: '/ToDoList',
    failureRedirect: '/login',
    failureFlash: true
}
))

app.get('/signUp', (req, res) => {
    res.render('signUp')
})

// Saving a new login and signup redirects
app.post('/signUp', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push ({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/signUp')
    }
    console.log(users) //prints the new users in the terminal
}) 
//------------End of Signup------------

app.get('/ToDoList', (req, res) => {
    res.render('index', { name: req.user.name })
})
//------------End of Renders------------

// Logout
app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
//------------End of Logout------------

// Function to check if user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Hello from checkAuthenticated 1')
        return next()
    }
    console.log('Hello from checkAuthenticated 2')
    res.redirect('/login')
}
//------------End of checkAuthenticated------------

// Function to check if user is not authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Hello from checkNotAuthenticated 1')
        return res.redirect('/ToDoList')
    }
    console.log('Hello from checkNotAuthenticated 2')
    next()
}
//------------End of checkNotAuthenticated------------

// Listening Port
app.listen(port, () => console.info(`Listening on port ${port}`))