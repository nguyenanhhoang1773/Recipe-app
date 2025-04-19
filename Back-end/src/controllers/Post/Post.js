const Post = require('../../models/post');

const getPost = async (req, res) => {
  try {
    const { id_user } = req.body;
    if (!id_user) {
      return res.status(400).json({ message: 'Thiếu thông tin người dùng' });
    }

    const posts = await Post.find({ id_user })
      .populate('id_category', 'type') 
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    return res.status(500).json({
      message: "Không thể lấy bài viết",
      error,
    });
  }
};


const addPost = async (req, res) => {
  try {
    const {
      id_user,
      userName,
      userAvatar,
      name,
      description,
      ingredients,
      instructions,
      list_images,
      id_category,
    } = req.body;

    if (!id_user || !name || !description || !ingredients || !instructions || !id_category) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const newPost = new Post({
      id_user,
      userName,
      userAvatar,
      name,
      description,
      ingredients,
      instructions,
      list_images: list_images || [],
      id_category,
    });

    await newPost.save();

    return res.status(200).json({
      message: "Bài viết đã được đăng thành công",
      status: true,
      post: newPost,
    });
  } catch (error) {
    console.error("Lỗi khi đăng bài viết:", error);
    return res.status(500).json({
      message: "Đăng bài viết thất bại",
      status: false,
      error,
    });
  }
};


const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID bài viết" });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    return res.status(500).json({
      message: "Xóa bài viết thất bại",
      error,
    });
  }
};


const updatePost = async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID bài viết" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    return res.status(200).json({
      message: "Cập nhật bài viết thành công",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    return res.status(500).json({
      message: "Cập nhật bài viết thất bại",
      error,
    });
  }
};

module.exports = {
  getPost,
  addPost,
  deletePost,
  updatePost,
};
