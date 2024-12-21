const { getDB } = require('../config/db');
require('dotenv').config();
const axios = require('axios');
let user;

const getGPTResponse = async (question) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(
            url,
            {
                model: "gpt-3.5-turbo", 
                messages: [{ role: 'user', content: question }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;  
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong!';
    }
};

const coordi = async (sex, topic) => {
    const db = getDB();
    const answer = await getGPTResponse(topic + " 이것이 크리스마스에 속하는지 파티에 속하는지 할로윈에 속하는지 알려줘 문자열로 줘 예시 : 크리스마스 이런식으로 아무말도 말고 그냥 답만 줬으면 좋겠어요");
    console.log(answer);
    user = await db.collection('clothes').findOne({ topic: answer,sex : sex });
    return user;
};

const myoutfitsService = async (userId, name, imageUrl) => {
    try {
      const db = getDB();
      const userClothesCollection = db.collection('userClothes');
  
      const newClothes = {
        id : userId,
        file : imageUrl,
        name : name,
        like:0,
        cloth:user
      };
  
      const result = await userClothesCollection.insertOne(newClothes);
      return true;
    } catch (error) {
      console.error('MongoDB Save Error:', error);
      throw new Error('Failed to save user outfit to MongoDB');
    }
  };

module.exports = {
    coordi,
    myoutfitsService
};
