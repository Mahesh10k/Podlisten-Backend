let Podcast = require("../../models/uploadModel");

const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.status(200).json(podcasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPodcasts;
