const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');  // ObjectId를 MongoDB에서 import

// 좋아요 수 증가
const like = async (id) => {
    // id가 올바른 ObjectId 형식인지 확인
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId format');
    }

    const db = await getDB();
    const result = await db.collection('userClothes').updateOne(
        { _id: new ObjectId(id) },  // id는 24자리 16진수 문자열이어야 함
        { $inc: { like: 1 } }  // like 필드를 1 증가
    );
    console.log()
    return result.modifiedCount > 0;  // 업데이트가 성공적으로 이루어졌으면 true 반환
};

// 좋아요 수 감소
const unlike = async (id) => {
    // id가 올바른 ObjectId 형식인지 확인
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId format');
    }

    const db = await getDB();
    const result = await db.collection('userClothes').updateOne(
        { _id: new ObjectId(id) },  // id는 24자리 16진수 문자열이어야 함
        { $inc: { like: -1 } }  // like 필드를 1 감소
    );
    return result.modifiedCount > 0;  // 업데이트가 성공적으로 이루어졌으면 true 반환
};

module.exports = {
    like,
    unlike
};
