"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const appointmentController = require("../controller/appointment");
const isAuth = require("../middleware/isAuth");
router.get("/appointments", isAuth, appointmentController.getAppointments);
router.post("/appointments", isAuth, appointmentController.addAppointment);
router.get("/appointments/:appId", isAuth, appointmentController.getAppointment);
module.exports = {
    router: router,
};
