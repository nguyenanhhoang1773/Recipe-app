const Liked = require('../../models/liked');

const getLiked = async (req, res) => {
    try {
        const id_user = req.params.id_user; 
        if (!id_user) {
            return res.status(400).json({ message: 'Thiếu id_user' });
        }

        const likedItems = await Liked.find({ id_user: id_user }).sort({ createdAt: -1 });

        res.status(200).json(likedItems);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách liked:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


const addLiked = async (req, res) => {
    try {
        const liked = req.body;
        const id_user = liked.id_user;
        const id_recipe = liked.id_recipe;
        const existingLiked = await Liked.findOne({ id_user, id_recipe });
        if (existingLiked) {
            return res.json({ message: 'Công thức này trong danh sách món yêu thích', status: false });
        } else {
            const newLiked = new Liked(liked);
            await newLiked.save(); 
            res.status(200).json({ message: `Đã thích công thức món ăn ${liked.name}`, status: true });;
        }

    } catch (error) {
        console.log("có lỗi:" + error)
    }
}
const unLiked = async (req, res) => {
    try {
        const id_user = req.body.id_user;
        const id_recipe = req.body.id_recipe;

        const existingLiked = await Liked.findOne({ id_user, id_recipe });
        if (!existingLiked) {
            return res.status(404).json({ message: 'Công thức không có trong danh sách yêu thích', status: false });
        }
        const result = await Liked.deleteOne({ id_user, id_recipe });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Đã xóa công thức khỏi danh sách yêu thích', status: true });
        } else {
            res.status(500).json({ message: 'Lỗi khi xóa công thức', status: false });
        }
    } catch (error) {
        console.error("có lỗi:", error);
        res.status(500).json({ message: 'Lỗi server', status: false });
    }
};
module.exports = { getLiked, addLiked,unLiked };