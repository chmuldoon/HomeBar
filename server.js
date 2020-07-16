const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const schema = require("./schema/schema");
// const session = require("express-session");
const passport = require("passport");
// const passportConfig = require("./server/services/auth");
// const MongoStore = require("connect-mongo")(session);
const db = require("./config/keys").mongoURI;
const path = require("path");

const app = express();

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.log(err)
    process.exit(1);
  })

// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: "aaabbbccc",
//     store: new MongoStore({
//       url: db,
//       autoReconnect: true,
//     }),
//   })
// );
app.use(express.json({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/cocktails", require("./routes/api/cocktail"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/ingredients", require("./routes/api/ingredient"));






if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT || 5000}`)
);
