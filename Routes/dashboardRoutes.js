let express = require("express");
let router = express.Router();
let uploadPodcast = require("../controllers/Podcasts/uploadController.js");
let getPodcasts = require("../controllers/Podcasts/getPodcasts.js");
let upload = require("../Middlewares/Multer");
const getUsers = require("../controllers/Users/userController.js");
const createUser = require("../controllers/Users/createUser.js");
const loginUser = require("../controllers/Users/loginUser.js");
const authentication = require("../Middlewares/jwt.js");
const addFavourite = require("../controllers/Favourites/addFavourites.js");
const deleteFavourites = require("../controllers/Favourites/deletefavourites.js");
const deletePodcast = require("../controllers/Podcasts/deletePodcast.js");

// Route for get all Podcasts data
router.get("/podcasts", getPodcasts);

// Route to Insert Data
router.post(
  "/upload",
  authentication,
  upload.fields([
    { name: "file", maxCount: 1 }, // Audio file
    { name: "thumbnail", maxCount: 1 }, // Thumbnail image
  ]),
  uploadPodcast,
);

router.delete("/podcasts", authentication, deletePodcast)

router.get("/users", authentication, getUsers);

router.post("/users", createUser);

router.post("/login", loginUser);

router.post("/favourites", addFavourite)

router.delete("/favourites", deleteFavourites)


module.exports = router;
