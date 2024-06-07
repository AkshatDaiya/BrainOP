const Router = require("express").Router();
const middlewere = require("../middleware/JwtVerifyUser");
const RegC = require("../controllers/reg.controller");
const PostC = require("../controllers/posts.controller");

Router.post("/reg", RegC.userRegistration);
Router.post("/login", RegC.loginCheck);

Router.get("/posts", middlewere, PostC.AllPosts);
Router.post("/postDetails/:id", PostC.PostDetails);

module.exports = Router;
