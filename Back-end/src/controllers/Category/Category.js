const Category = require('../../models/category')

const getCategory = async (req, res) => {
    try {
        // const id_category  = req.params.id_category;
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
        console.log("có lỗi:" + error)
        res.status(500).json({ message: 'Thêm category thất bại', error: error.message });
    }
}

module.exports = { getCategory, addCategory, };