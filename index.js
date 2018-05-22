import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';
import bodyParser from 'body-parser';
import users from './routes/users';
import teams from './routes/teams';
import matches from './routes/matches';

let app = express();
const LocalStrategy = passportLocal.Strategy;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Arunpasupathi:thats11310104007@ds161262.mlab.com:61262/gameusers',{
  useMongoClient: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/teams', teams);
app.use('/api/matches', matches);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

let port = process.env.PORT || 5000;

app.listen(port, ()=>console.log("Server running"));
