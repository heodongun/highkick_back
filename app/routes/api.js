const express = require('express');
const multer = require('multer');
const { loginController } = require('../controllers/loginController');
const { signupController } = require('../controllers/signupController');
const { topicsController, coordiController } = require('../controllers/mainController');
const { myoutfitsController, getAllOutfitsController } = require('../controllers/contestController'); 
const { likeHandler, unlikeHandler } = require('../controllers/detailController');
const { userController } = require('../controllers/userController');
const router = express.Router();
const upload = multer(); 
router.post('/coordi', coordiController);
router.get('/topics', topicsController);
router.post('/login',loginController);
router.post('/signup',signupController);
router.post('/myoutfits',upload.single('file'), myoutfitsController);
router.get('/outfits',getAllOutfitsController );
router.get('/like', likeHandler);
router.get('/unlike',unlikeHandler );
router.get('/user',userController)

module.exports = router;
