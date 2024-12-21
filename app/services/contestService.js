const { getDB } = require('../config/db');  // MongoDB 연결 모듈

// 모든 의상 정보를 가져오는 함수
const getAllOutfits = async () => {
  try {
    const db = getDB();
    const userClothesCollection = db.collection('userClothes');

    // 모든 의상 정보 조회 후 like 필드로 내림차순 정렬
    const allOutfits = await userClothesCollection
      .find()
      .sort({ like: -1 })  // like 필드를 기준으로 내림차순 정렬
      .toArray();
    
    if (allOutfits.length === 0) {
      throw new Error('No outfits found');
    }

    // 각 의상 데이터를 배열로 변환
    const outfits = allOutfits.map((userOutfit) => ({
      _id:userOutfit._id,
      id: userOutfit.id,
      file: userOutfit.file,  
      name: userOutfit.name,
      like: userOutfit.like,
      cloth: {
        top: {
          name: userOutfit.cloth.top.name,
          buy_link: userOutfit.cloth.top.buy_link
        },
        bottom: {
          name: userOutfit.cloth.bottom.name,
          buy_link: userOutfit.cloth.bottom.buy_link
        },
        hat: {
          name: userOutfit.cloth.hat.name,
          buy_link: userOutfit.cloth.hat.buy_link
        }
      }
    }));

    return outfits;  // 배열로 반환
  } catch (error) {
    console.error('Error fetching all outfits:', error);
    throw new Error('Failed to fetch all outfits');
  }
};

module.exports = {
    getAllOutfits
};
