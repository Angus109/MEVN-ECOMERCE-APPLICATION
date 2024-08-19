const express = require("express");
const mongoose = require("mongoose");
const Account = require("./models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const Post = require("./models/Post");
const dotenv = require("dotenv")

dotenv.config({ path: "config.env" });

const app = express();
const DASHBOARD_URL = process.env.DASHBOARD_URL
const BACKEND_URL= process.env.BACKEND_URL

const cors = require("cors");
app.use(cors({ credentials: true, origin:[DASHBOARD_URL, BACKEND_URL] }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

const DB = process.env.THRIFTME_DB_URL
const PORT = process.env.PORT || 3000;

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to DB");

    app.listen(PORT, () => {
      console.log("listening on port 4000");
    });
  }
);

// ---------------- MIDDLEWARE FOR ROUTE AUTH - ALEXIS ------------------ //

app.use(cookieParser());

const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("User not logged in");
    return res
      .status(401)
      .send({success:false, message: "Access denied - User not logged in" })
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).send({success:false, error: err}) ;
      } else {
        req.userId = decodedToken.id;s
        next();
      }
    });
  }
};

//Get all posts - Alexis

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "email fname lname");
    res.status(200).send({success:true, result: posts});
  } catch (err) {
    next(err);
  }
});

//Get specific post - Alexis

app.get("/posts/:postId", async (req, res, next) => {

  if(!req.params.postId){
    return res.status(404).send({success: false, message: "postID is required"})
  }
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author", "email fname lname createdAt")
      .populate("comments.author", "email fname lname createdAt");
    res.status(200).send({success:true, result: post})
  } catch (err) {
    next(err);
  }
});

//Create new post - Daniel

app.post("/posts", authUser, async (req, res, next) => {
  if (!req.body.imgURL){
    return res.status(404).send({success: false, message: "image is a required filed"})
  }
  if(!req.body.title || !req.body.userId || !req.body.price || !req.body.category || !req.body.condition){
    return res.status(404).send({success:false, message: "tile, userid, price, category, condition is required"})
  }

  if(!req.body.size || !req.body.location || req.body.paymentType || !req.body.shippingOption || !req.body.description ){
    return res.status(404).send({success:false, message: "size, location, paymentType, shippingOption, description is required "})
  }
  try {
    const post = new Post({
      title: req.body.title,
      author: req.userId,
      price: req.body.price,
      category: req.body.category,
      condition: req.body.condition,
      imgURL: req.body.imgURL,
      size: req.body.size,
      location: req.body.location,
      paymentType: req.body.paymentType,
      shippingOption: req.body.shippingOption,
      description: req.body.description,
      comments: [],
    });
    const savedPost = await post.save();
    res.status(200).send({success:true, result:savedPost});
  } catch (err) {
    next(err);
  }
});

//Update pos

app.patch("/posts/:postId", authUser, async (req, res, next) => {
  try {
    const updatePost = {
      title: req.body.title,
      price: req.body.price,
      imgURL: req.body.imgURL,
      category: req.body.category,
      condition: req.body.condition,
      size: req.body.size,
      location: req.body.location,
      paymentType: req.body.paymentType,
      shippingOption: req.body.shippingOption,
      description: req.body.description,
      comments: [],
    };
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      updatePost
    );
    res.status(200).send({success:true, result:updatedPost });
  } catch (err) {
    next(err);
  }
});

//Delete post base code - Daniel, backend protection - Alexis
app.delete("/posts/:postId", authUser, async (req, res, next) => {
  if(!req.params.postId){
     return res.status(401).send({success: false, message:"req params postId is required"})
  }
  if(!req.userId){
    return res.status(401).send({
      success: false,
      message: "req userId is required"
    })
  }
  try {
    let post = await Post.findOneAndDelete({
      _id: req.params.postId,
      author: req.userId,
    });
    if (post) {
      res.status(200).send({success:true, result:post});
    } else {
      res
        .status(401)
        .send({ 
          success: false,
          message: "You are not authorised to delete this post." })
    }
  } catch (err) {
    next(err);
  }
});

//Account endpoints
app.get("/account", authUser, async (req, res, next) => {
  if(!req.userId){
    return res.status(401).send({
      success: false,
     message: "req userId is required"
    })
  }
  try {
    const user = await Account.findById(req.userId);

    return res.status(200).send({
      success:true,
      result: {
        id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
      }
    });
  } catch (err) {
    next(err);
  }
});
app.post("/accounts/create", async (req, res) => {
  if(!req.body.email){
    return res.status(401).send({
      success: false,
      message: " req body email is required"
    })
  }
  const existingAccount = await Account.findOne({
    email: req.body.email,
  });
  if (existingAccount) {
    return res.status(409).send({ success: false, message: "Email Already Exists" });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(550).send({success:false, error: err });
      } else {
        const account = new Account({
          fname: req.body.fname,
          lname: req.body.lname,
          dateofbirth: req.body.dateofbirth,
          email: req.body.email,
          password: hash,
        });
        const savedAccount = await account.save();
        res.status(200).send({success:true, result:savedAccount });
      }
    });
  }
});
app.post("/accounts/login", async (req, res) => {
  if(!req.body.email){
    return res.status(401).send({
      success: false,
      message:'req.body.email is required'
    })
  } 
  const existingAccount = await Account.findOne({
    email: req.body.email,
  }); // try to retrievve the user matching the supplies email
  if (!existingAccount) {
    //if the user doesn't exist
    return res.status(401).send({
      success:false,
      message: "Authorization Failed",
    })
  } else {
    // otherwise if the user does exist
    bcrypt.compare(
      req.body.password,
      existingAccount.password,
      (err, result) => {
        // compare supplied password with the encrypted account
        if (err) {
          // if the comparison fails
          return res.status(401).send({
            success: false,
            message: "Authorization Failed",
          })
        } else {
          // otherwise if the comparison succeeds
          if (result) {
            //check if the result of the comparison is that the password is correct (result === true)
            // create json web token
            const lifespan = 1 * 60 * 60;
            const token = jwt.sign(
              {
                id: existingAccount._id,
                email: existingAccount.email,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: lifespan,
              }
            ); //expressed in seconds
            res.cookie("jwt", token, {
              maxAge: lifespan * 1000,
              httpOnly: true,
            }); //Expressed in seconds
            return res.status(200).send({
              success: true,
              result: {
                id: existingAccount._id,
                email: existingAccount.email,
                fname: existingAccount.fname,
                lname: existingAccount.lname,
              }
            });
          } else {
            return res.status(401).send({
              success:false,
              message: "Authorization Failed",
            })
          }
        }
      }
    );
  }
});

app.get("/accounts/logout", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send({
    success:true,
     message: "logged out " });
});

//  ######   #######  ##     ## ##     ## ######## ##    ## ########  ######
// ##    ## ##     ## ###   ### ###   ### ##       ###   ##    ##    ##    ##
// ##       ##     ## #### #### #### #### ##       ####  ##    ##    ##
// ##       ##     ## ## ### ## ## ### ## ######   ## ## ##    ##     ######
// ##       ##     ## ##     ## ##     ## ##       ##  ####    ##          ##
// ##    ## ##     ## ##     ## ##     ## ##       ##   ###    ##    ##    ##
//  ######   #######  ##     ## ##     ## ######## ##    ##    ##     ######

//Get All Comments - Alexis

app.get("/posts/:postId/comments", async (req, res) => {
  if(!req.params.postId){
    return res.status(401).send({
      success: false,
      message: " req.params.postId is required"
    })
  }
  const post = await Post.findById(req.params.postId).populate(
    "author",
    "email fname lname"
  );
  res.status(200).send({
    success:true,
    result: post.comments
  });
});

//Get Specific Comment - Alexis

// app.get("/posts/:postId/comments/:commentId", async (req, res) => {
//   const post = await Post.findById(req.params.postId);
//   const comment = post.comments.id(req.params.commentId);
//   res.status(200).json(comment);
// });

//Delete Comments - Alexis

// app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
//   const post = await Post.findById(req.params.postId);
//   post.comments.pull(req.params.commentId);
//   const savedPost = await post.save();
//   res.status(200).send(savedPost);
// });

app.delete(
  "/posts/:postId/comments/:commentId",
  authUser,
  async (req, res, next) => {
    if(!req.params.postId){
      return res.status(401).send({
        success: false,
        message: "req.params.postId is required"
      })
    }
    if(!req.userId){
      return res.status(401).send({
        success: false,
        message: "req.userId is required"
      })
    }
    try {
      let post = await Post.findOne({
        _id: req.params.postId,
        author: req.userId,
      });
      if (!post) {
        res
          .status(401)
          .send({
            success:false,
            message: "You are not authorised to delete this comment." 
          });
        return;
      }

      post.comments.id(req.params.commentId).remove();
      post.save();
      console.log(post);
      res.status(200).send({
        success: true,
        result: post
      });
    } catch (err) {
      next(err);
    }
  }
);

//Post Comment - Alexis

app.post("/posts/:postId/comments", authUser, async (req, res, next) => {
  if(!req.params.postId){
    return res.status(401).send({
      success: false,
      message: "req.params.postId is required"
    })
  }
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.push({
      text: req.body.text,
      author: req.userId,
    });
    const savedPost = await post.save();
    res.status(200).send({
      success: true,
      result: savedPost
    });
  } catch (err) {
    next(err);
  }
});
