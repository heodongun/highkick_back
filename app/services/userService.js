const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb'); 

// 유저 정보 반환
const userService = async (id) => {
    const db = await getDB();  // getDB()는 비동기 함수이므로 await 사용
    const user = await db.collection('user').findOne({ _id: new ObjectId(id) });
    
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

module.exports = {
    userService
};
