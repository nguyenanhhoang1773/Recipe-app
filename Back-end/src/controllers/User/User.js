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
        bio,
        favorites,
        recentlyLogin,
      });
    } else {
      user.name = name || user.name;
      user.image_url = image_url || user.image_url;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      user.favorites = favorites || user.favorites;
      user.recentlyLogin = recentlyLogin || user.recentlyLogin;
    }

    await user.save();

    console.log("Đăng nhập thành công tài khoản:", email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { login };
