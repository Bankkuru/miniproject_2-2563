const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        let time = new Date(decoded.exp * 1000);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);
/* GET user foo. */
router.get(
  "/foo",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      res.status(200).json({ message: "Foo" });
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length? users.users[users.users.length - 1].id + 1: 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

  let movies = {
      list: [
        { "id": 1, "name": "Nobody","genre": "Action","rate": "18+" ,"min": 1.45 },
        { "id": 2, "name": "Mortal Kombate","genre": "Action","rate": "13" ,"min": 2.45 } ]
    }
  
  
  router
    .route("/movies")
    .get((req, res) => {
      res.send(movies);
    })
    .post((req, res) => {
      console.log(req.body);
      let newmovie = {};
      newmovie.id = movies.list.length ? movies.list[movies.list.length - 1].id + 1 : 1;
      newmovie.name = req.body.name;
      newmovie.genre= req.body.genre;
      newmovie.rate = req.body.rate;
      newmovie.min= req.body.min;
      movies = { list: [...movies.list, newmovie] };
      res.json(movies);
    });
  
  router
    .route("/movies/:movieid")
    .get((req, res) => {
      let id = movies.list.findIndex((item) => +item.id == +req.params.movieid)
      res.json(movies.list[id]);
    })
    .put((req, res) => {
      let id = movies.list.findIndex((item) => item.id == +req.params.movieid);
      movies.list[id].name = req.body.name;
      movies.list[id].genre = req.body.genre;
      movies.list[id].rate = req.body.rate;
      movies.list[id].min = req.body.min;
      res.json(movies.list);
    })
    .delete((req, res) => {
      movies.list = movies.list.filter((item) => +item.id !== +req.params.movieid);
      res.json(movies.list);
    });
  
  
  router.route("/purchase/:movieId")
  .post((req,res) => {
    let id = movies.list.findIndex((item) => +item.id == +req.params.movieId)
    if (id == -1) {
      res.json({message: "movie not found"})
    }
    else {
      movies.list = movies.list.filter((item) => +item.id !== +req.params.movieId);
      res.json(movies.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));