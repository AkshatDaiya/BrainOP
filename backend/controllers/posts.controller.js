const Posts = require("../models/posts.model");

exports.AllPosts = async (req, res) => {
  try {
    const record = await Posts.find();
    res.status(200).json({
      status: 200,
      apiData: record,
    });
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: `Something went wrong: ${error}`,
    });
  }
};

exports.PostDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Posts.findById(id);

    if (!record) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: 200,
      apiData: record,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `Something went wrong: ${error}`,
    });
  }
};
