const detail = async (req, res) => {
    try {
        const text = "xin chào hahah";
        res.json(text)
    } catch (err) {
        console.log(err)
    }
}
module.exports = detail;
