const Profile = require("../../models/profile");

const getProfile = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    if (!id_user) {
        return res.status(400).json({ message: 'Thiếu id_user' });
    }

    const profile = await Profile.findOne({ id_user }).sort({ createdAt: -1 });
    if (!profile) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ người dùng" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

const createProfile = async (req, res) => {
  try {
      console.log(req.body);

      const profile = {
          id_user: req.body.id_user,
          avatar: req.body.avatar || '',
          bio: req.body.bio || '',
      };

      const existing = await Profile.findOne({ id_user: profile.id_user });
      if (existing) {
          return res.status(409).json({ message: "Hồ sơ đã tồn tại", status: false });
      }

      const newProfile = new Profile(profile);
      await newProfile.save();

      res.status(200).json({ message: "Hồ sơ đã được tạo thành công", status: true });
  } catch (error) {
      console.log("Có lỗi:", error);
      res.status(500).json({ message: "Lỗi server", status: false });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { avatar, bio } = req.body;

    if (!avatar && !bio) {
      return res.status(400).json({ message: "Cần cung cấp ít nhất avatar hoặc bio" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { id_user },
      { ...(avatar && { avatar }), ...(bio && { bio }) },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ người dùng" });
    }

    res.status(200).json({ message: "Hồ sơ đã được cập nhật", profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {getProfile, createProfile, updateProfile};
