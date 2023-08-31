const { Router } = require("express");
const dataController = require("../controllers/Datacontroller");
const verifyToken = require("../middlewares/Userauth");

const router = Router();

router.post("/add", verifyToken, dataController.addData);
router.post("/get", verifyToken, dataController.getData);

module.exports = router;
