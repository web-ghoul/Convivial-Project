const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainControllers")
const protect = require("../middleware/authMiddleware")
console.log("Here we are")


router.post("/login" , controller.login)

router.use(protect);

router.get("/displayLogs" , controller.displayLogs)

router.post("/sendEmail" , controller.sendEmail)

router.get("/searchHotels" , controller.searchHotels)

router.post("/addPDF" , controller.addPDF);

router.delete("/deletePDF/:id" , controller.deletePDF )

router.get("/displayPDF/:id" , controller.displayPDF)

router.put("/editPDF/:id" , controller.editPDF)

router.get("/scrape" , controller.scrape )

router.put("/editHotel/:id" , controller.editHotel)

// router.post("/filter" , controller.filter)




module.exports = router;
