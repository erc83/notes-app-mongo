const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('users/Login');
});
router.get('/register', (req, res) => {
    res.render('users/Register');
});



module.exports = router;