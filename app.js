require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./swaggerOptions');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { connectDB } = require('./config/db');
const User = require('./models/user')


connectDB();

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json());
app.use(passport.initialize());


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findById(jwt_payload);
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
app.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('*', (req, res) => {
    res.status(404).send({ message: 'Not found' });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));
