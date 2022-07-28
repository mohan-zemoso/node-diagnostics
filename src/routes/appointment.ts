import express from "express";
const router = express.Router();
const appointmentController = require("../controller/appointment");
const isAuth = require("../middleware/isAuth");

router.get("/appointments", isAuth, appointmentController.getAppointments);
router.post("/appointments", isAuth, appointmentController.addAppointment);
router.get(
  "/appointments/:appId",
  isAuth,
  appointmentController.getAppointment
);

module.exports = {
  router: router,
};
