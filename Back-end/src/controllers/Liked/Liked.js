const Liked = require('../../models/liked'); // 

const getLiked = async (req, res) => {

    try {
        const Carts = await Liked.find(req.body).sort({ createdAt: -1 });
        res.status(200).json(Carts);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}

module.exports = getLiked;