const Podcast = require("../../models/uploadModel");

const deletePodcast = async (req, res) => {
  try {
    const { id } = req.body;

    const podcast = await Podcast.findByIdAndDelete(id);

    if (!podcast) {
      return res.status(404).json({
        message: "Podcast not found",
      });
    }

    res.status(200).json({
      message: "Podcast deleted successfully",
      podcast,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = deletePodcast;