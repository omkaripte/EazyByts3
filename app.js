//This file sets up the Express Server

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser:true, useUnifiedTopology:true
});

//User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

//to check if user is logged in
function checkAuthenticated(req, res, next){
    if(req.session.userId){
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, 'views')});
});

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: path.join(__dirname, 'views')});
});

app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.sendFile('dashboard.html', { root: path.join(__dirname, 'views')});
});


//Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password:hashedpassword });
    await newUser.save();

    res.redirect('/login');
});

// login
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if(user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password!');
    }
});

// Start the srever
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server connected');
});