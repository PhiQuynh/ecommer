const router = require('express').Router()//đg dẫn
const userCtrl = require('../controllers/UserCtrl')

const auth = require('../middleware/auth')


router.post('/register' , userCtrl.register);
router.get('/refresh_token' , userCtrl.refreshToken);
router.post('/login' , userCtrl.login );
router.get('/logout' , userCtrl.logout );
router.get('/info' , auth,userCtrl.getUser );
router.patch('/addcart' , auth,userCtrl.addCart );
router.get('/history' , auth,userCtrl.history );
module.exports  = router