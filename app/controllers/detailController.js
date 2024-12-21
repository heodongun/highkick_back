const { like, unlike } = require("../services/detailService");

// 좋아요 증가
const likeHandler = async (req, res) => {
  const { id } = req.query;  // 쿼리 파라미터로 id 받기
  console.log(req.query)
  try {
    // id를 받아서 like 함수 호출
    const response = await like(id);

    return res.json(response);  // 응답 반환
  } catch (error) {
    console.error('Error in likeHandler:', error);
    return res.status(500).json({ message: 'Error in increasing like', error: error.message });
  }
};

// 좋아요 감소
const unlikeHandler = async (req, res) => {
  const { id } = req.query;  // 쿼리 파라미터로 id 받기

  try {
    // id를 받아서 unlike 함수 호출
    const response = await unlike(id);

    return res.json(response);  // 응답 반환
  } catch (error) {
    console.error('Error in unlikeHandler:', error);
    return res.status(500).json({ message: 'Error in decreasing like', error: error.message });
  }
};

module.exports = {
    likeHandler,
  unlikeHandler
};
