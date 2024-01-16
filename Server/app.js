const express = require("express");
const app = express();
const cors = require("cors");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

// use and initializing express, express-session and passport modules
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "Our big secret!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// connecting to mongodb server
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/netflixDB");
  // await mongoose.connect('mongodb+srv://dagmfre:dag%4013645440@firstcluster.rkrulns.mongodb.net/netflixDB');
}

// Creating Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
  username: String,
  facebookId: String,
  secret: String,
});

// pluging in the passort-local-mongoose module
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

// let passport use our cookies by serializing and deserialising
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Google & FB usage codes
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/netflix-main-page",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/netflix-main-page",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { facebookId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";

passport.use(
  new JwtStrategy(opts, async (jwt_payload) => {
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return user; // Return the user if found
      } else {
        return false; // Indicate user not found
      }
    } catch (err) {
      console.error(err); // Log the error
      throw err; // Rethrow the error to be handled appropriately
    }
  })
);
// Creating Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/netflix-main-page",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  function (req, res) {
    res.sendFile(__dirname + "/success.html");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/netflix-main-page",
  passport.authenticate("facebook", { failureRedirect: "/failure" }),
  function (req, res) {
    res.sendFile(__dirname + "/success.html");
  }
);

// Local authentication code using passport, passport-local-mongoose and express-session

app.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });
  const payload = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });


  // check if user already exists
  User.findOne({ username: req.body.username }).then((user) => {
    // User found
    if (user) {
      return res.status(401).send({
        success: false,
        message: "User already exists.",
      });
    } else {  
      const newUser = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 10),
      });
  
      newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User created successfully.",
            token: "Bearer " + token,
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((err) => {
          res.send({
            success: false,
            message: "Something went wrong",
            error: err,
          });
        });
    }
  });  
});

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    //No user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user.",
      });
    }

    //Incorrect password
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token: "Bearer " + token,
    });
  });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

app.listen(3001, () => console.log("Listening to port 3001"));
