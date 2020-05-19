const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
//These routes files, do the similar work to rails routes and controllers in a way

//@route POST api/users
//@desc register new user
//@access public
router.post(
  "/",
  [
    check("email", "Valid email is required").isEmail(),
    // check("age", "You must be atleast 18")
    //   .notEmpty()
    //   .isInt({ min: 18}),
    check(
      "password",
      "A password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //console logs the body of data requested
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructure the req.body so we can easily access user data
    const { email, password } = req.body;

    try {
      //Check if the User exists,
      let user = await User.findOne({ email });

      if (user) {
        //if the user exists, we'll return the same error as the input error
        //if they exist we will send back an error, since this is to register a new user
        return res
          .status(400)
          .json({ errors: [{ msg: "email already in use" }] });
      }

      user = new User({
        email,
        password,
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jwt so user can be logged in right away

      //this extracts the payload f
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        require('../../config/jwt').jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
//TESTING ONLY
//@route GET api/users
//@desc Gets all users
//@access public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

module.exports = router;
