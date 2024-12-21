const { userService } = require("../services/userService");

const userController = async (req, res) => {
    const { id } = req.query;  // URL 파라미터에서 id를 받음

    try {
        // userService로 유저 정보 조회
        const user = await userService(id);
        return res.json(user);  // 조회된 유저 정보를 응답으로 반환
    } catch (error) {
        return res.status(404).json({ message: error.message });  // 유저를 찾지 못했을 때 오류 처리
    }
};

module.exports = {
    userController,
};
