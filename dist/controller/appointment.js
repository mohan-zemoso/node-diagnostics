"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment = require("../models/appointment");
const { validationResult } = require("express-validator/check");
const getAppointments = (_req, res, next) => {
    Appointment.findAll()
        .then((appointments) => {
        res.status(200).json(appointments);
    })
        .catch((error) => {
        error.statusCode = 500;
        error.message = "Couldn't get appointments";
        return next(error);
    });
};
const addAppointment = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const error = {
            message: "Validation failed",
            statusCode: 422,
        };
        throw error;
    }
    const dateTime = req.body.dateTime;
    const testPatients = req.body.testPatients;
    Appointment.create({
        dateTime: dateTime,
        testPatients: testPatients,
        userId: req.userId,
    })
        .then(() => {
        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment: {
                dateTime: dateTime,
                testPatients: testPatients,
                userId: req.userId,
            },
        });
    })
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Couldn't book appointment";
        }
        return next(err);
    });
};
const getAppointment = (req, res, next) => {
    Appointment.findByPk(req.params.appId)
        .then((appointment) => {
        if (appointment === null) {
            const error = {
                message: `Appointment with id-${req.params.appId} not found. Please try another id`,
                statusCode: 404,
            };
            throw error;
        }
        res.status(200).json(appointment);
    })
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Couldn't get appointment";
        }
        return next(err);
    });
};
module.exports = {
    getAppointments: getAppointments,
    addAppointment: addAppointment,
    getAppointment: getAppointment,
};
