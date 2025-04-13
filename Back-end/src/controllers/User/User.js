const User = require("../../models/user");

const login = async (req, res) => {
  try {
    const { id_user, name, image_url, email, favorites, recentlyLogin } =
      req.body;
    console.log("xin chào")
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

module.exports = { login };
