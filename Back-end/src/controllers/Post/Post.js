const Post = require('../../models/post');

// create post
const createPost = async (req, res) => {
  try {
    const {
    //   id_user,
    //   id_recipe,
      name,
      description,
      ingredients,
      instructions,
      image,
    } = req.body;

    const newPost = new Post({
    //   id_user,
    //   id_recipe,
      name,
      description,
      ingredients,
      instructions,
      image,
    });

    await newPost.save();

    res.status(201).send({
      success: true,
      message: 'Bài viết đã được đăng thành công!',
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Bài viết chưa được đăng',
      error,
    });
  }
};

module.exports = { createPost };
