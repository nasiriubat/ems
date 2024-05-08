require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const adminRoutes = require('./routes/admin');
const { connectDB } = require('./config/db');
const User = require('./models/user')


connectDB();

const app = express();

app.use(express.json());
app.use(passport.initialize());


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        console.log('app'+jwt_payload.sub)
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
}); 

app.use('/auth', authRoutes);
app.use('/admin/users',passport.authenticate('jwt', { session: false }), adminRoutes);
app.use('/employee/',passport.authenticate('jwt', { session: false }), employeeRoutes);

app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));
