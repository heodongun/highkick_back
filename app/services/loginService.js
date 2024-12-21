const { getDB } = require('../config/db');

const loginService = async (userId, userPS) => {
    const db = getDB();
    let user = await db.collection('user').findOne({ user: userId });
    if (!user) {
        return { status: false}; 
    }
    if (user.password === userPS) {
        return { status: true };
    } else {
        return { status: false };
    }
};

module.exports = {
    loginService
};
