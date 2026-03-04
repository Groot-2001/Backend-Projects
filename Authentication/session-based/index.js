const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: false, 
      httpOnly: true
    },
  })
);
app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home", {user: req.session.user});
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login", {error: null}); // define error even if empty
});

app.post("/login", (req, res) => {
  const {username, password} = req.body;
  if ((username === "shiva" || username === "Raju" || username === "user123") && password === "123") {
    req.session.user = username;
    res.redirect("/");
  } else {
    res.render("login", {error: "Invalid credentials"});
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }

    res.clearCookie("connect.sid"); // removes session cookie
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log(`server is listening to port 3000`);
});
