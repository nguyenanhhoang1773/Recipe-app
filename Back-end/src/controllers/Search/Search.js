const searchItems = async (req, res) => {
    try {
        const Items = req.body.keyword;
        console.log(Items)
        if (!Items) {
            return res.status(400).json({ message: 'Thiếu thông tin tìm kiếm' });
        } else {
            // const listItems = await Recipe.find({ name: { $regex: Items, $options: 'i' } }).sort({ createdAt: -1 });
            res.status(200).json('ok');
        }

    } catch (error) {
        console.error("có lỗi:", error);
        res.status(500).json({ message: 'Lỗi server', status: false });
    }
}
module.exports =  searchItems ;