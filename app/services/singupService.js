const { getDB } = require('../config/db');

const signupService = async (userId, userPS,userSex,userName) => {
    const db = getDB();
    let user = await db.collection('user').findOne({ user: userId });
    const insertResult = await db.collection('user').insertOne({
        user: userId,
        password: userPS,
        sex : userSex,
        name:userName
    });
    if(insertResult){
        return { status: true };
    }
    else{
        return { status: false };
    }
};

module.exports = {
    signupService
};
