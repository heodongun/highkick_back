const { signupService } = require("../services/singupService");

const signupController = async (req, res) => {
    const { id, password,sex,name } = req.body; 
    return res.json(await signupService(id,password,sex,name));  
};

module.exports = {
    signupController,
};
