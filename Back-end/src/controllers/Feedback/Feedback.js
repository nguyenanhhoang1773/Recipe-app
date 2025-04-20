const Feedback = require('../../models/feedback');
const getFeedback = async (req, res) => {
    try {

        const id_recipe = req.body.id_recipe;

        if ( !id_recipe) {
            return res.status(400).json({ message: 'Thiếu thông tin' });
        }

        const feedbackItems = await Feedback.find({  id_recipe: id_recipe }).sort({ createdAt: -1 });

        res.status(200).json(feedbackItems);
    } catch (error) {
        console.log("có lỗi:" + error)
    }
}

const addFeedback = async (req, res) => {
    try {
        console.log(req.body)
        const feedback = {
            user_name: req.body.user_name,
            id_recipe: req.body.id_recipe,
            text: req.body.text,
            image: req.body.image ? req.body.image : '',
        }
        const newFeedback = new Feedback(feedback);
        await newFeedback.save();

        res.status(200).json({ message: `Đáng giá của bạn đã được ghi nhận`, status: true });
    } catch (error) {
        console.log("có lỗi:" + error)
    }
}
module.exports = { getFeedback, addFeedback };