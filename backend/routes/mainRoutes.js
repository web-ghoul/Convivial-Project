const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainControllers")
const protect = require("../middleware/authMiddleware")
console.log("Here we are")

// router.use(protect);
router.get("/displayLogs" , controller.displayLogs)

router.post("/sendEmail" , controller.sendEmail)

router.post("/login" , controller.login)

router.get("/searchHotels" , controller.searchHotels)

// router.get("/searchLogs" , controller.searchLogs)

router.post("/addPDF" , controller.addPDF);

router.delete("/deletePDF" , )

// router.post("/filter" , controller.filter)

router.get("/scrape" , controller.scrape )


module.exports = router;
