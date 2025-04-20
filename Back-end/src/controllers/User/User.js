const User = require("../../models/user");


const login = async (req, res) => {
  try {

    const { id_user, name, image_url, email, bio, favorites, recentlyLogin } = req.body;
    let user = await User.findOne({ id_user });
    if (!user) {
      user = new User({
        id_user,
        name,
        image_url,
        email,
        favorites,
        recentlyLogin,
      });
      await user.save();
    }
    console.log("Đăng nhập thành công tài khoản:", email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUser = async (req, res) => {
  console.log(req.body)
  try {
    const id_user = req.body.id_user;
    if (!id_user) {
      return res.status(400).json({ message: "ID người dùng là bắt buộc" });
    }
    const user = await User.findOne({ id_user });
    res.status(201).json(user);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body)
    const { id_user, bio, image_url } = req.body;
    if (!id_user) {
      return res.status(400).json({ message: "ID người dùng là bắt buộc" });
    }
    const user = await User.findOne({ id_user });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    if (bio !== undefined) {
      user.bio = bio.trim(); 
    }
    if (image_url !== undefined) {
      user.image_url = image_url;
    }
    await user.save();
    console.log("Cập nhật thành công người dùng:", id_user);
    res.status(200).json({
      message: "Cập nhật người dùng thành công",
      user: {
        id_user: user.id_user,
        bio: user.bio,
        image_url: user.image_url
      }
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ 
      message: "Lỗi server", 
      error: error.message 
    });
  }
};
module.exports = { login, getUser, updateUser };
