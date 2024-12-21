const { coordi } = require("../services/mainpageService");

const coordiController = async (req, res) => {
    const { sex, topic } = req.body; 
    const answer = await coordi(sex, topic);  
    return res.json(answer);  
};

const topicsController = async (req, res) => {
    return res.json({ topic: "크리스마스" });
};

module.exports = {
    coordiController,
    topicsController,
};