const { loginService } = require("../services/loginService");

const loginController = async (req, res) => {
    const { id, password } = req.body; 
    return res.json(await login(id, password));  
};

module.exports = {
    loginController,
};
