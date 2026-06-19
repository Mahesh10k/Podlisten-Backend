const Users = require("../../models/userModel");

const addFavourite = async (req, res) => {
  try {
    const { podcastId, email } = req.body;

    const user = await Users.findOneAndUpdate(
      { email },
      {
        $push: {
          favourites: podcastId,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Added to favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = addFavourite;