const Category = require('../../models/category')

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);

    } catch (error) {
        console.error('Không tìm thấy Category:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

const addCategory = async (req, res) => {
    try {
        const addCategory = new Category(req.body);
        await addCategory.save();
        res.status(201).json(addCategory);
    } catch (error) {
        console.error("Lỗi khi thêm category:", error);
        res.status(500).json({ message: 'Thêm category thất bại', error: error.message });
    }
}

module.exports = { getCategory, addCategory, };