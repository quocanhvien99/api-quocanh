const router = require('express').Router();
const fshareControllers = require('../Controllers/fshare.controllers');

router.get('/:id', fshareControllers.getlink);

module.exports = router;
