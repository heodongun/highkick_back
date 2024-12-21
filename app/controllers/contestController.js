const { uploadToS3 } = require('../config/s3Config');
const { getAllOutfits } = require('../services/contestService');
const { myoutfitsService } = require('../services/mainpageService');


const myoutfitsController = async (req, res) => {
  try {
    const { id,name } = req.body; // 사용자 ID와 추가 데이터
    const file = req.file; // Multer를 통해 업로드된 파일

    if (!file) {
      return res.status(400).send({ message: 'No file provided' });
    }
    const imageUrl = await uploadToS3(file);
    const outfit = await myoutfitsService(id,name, imageUrl);

    res.status(201).send({
        "status":outfit
    });
  } catch (error) {
    console.error('Error in myoutfitsController:', error);
    res.status(500).send({ message: 'An error occurred', error: error.message });
  }
};


const getAllOutfitsController = async (req, res) => {
    try {
      const outfits = await getAllOutfits();  // 모든 의상 정보 조회
  
      res.status(200).json(outfits);
    } catch (error) {
      console.error('Error in getAllOutfitsController:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };
module.exports = {
  myoutfitsController,
  getAllOutfitsController
};
