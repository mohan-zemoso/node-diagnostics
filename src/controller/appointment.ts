const Appointment = require("../models/appointment");
const { validationResult } = require("express-validator/check");
import { errorType } from "../app";
import { appointmentType } from "../models/appointment";
import { patientType } from "../models/patient";

type getAppsResType = {
  status: (statusCode: number) => any;
  json: (appointments: appointmentType[]) => any;
};

type nextType = (error: errorType) => any;

type addAppReqType = {
  body: {
    dateTime: string;
    testPatients: Array<patientType>;
  };
  userId: number;
};

type addAppResType = {
  status: (statusCode: number) => any;
  json: (arg: {
    message: string;
    appointment: {
      dateTime: string;
      userId: number;
    };
  }) => any;
};

type getAppReqType = {
  params: {
    appId: number;
  };
};

type getAppResType = {
  status: (statusCode: number) => any;
  json: (appointment: appointmentType) => any;
};

const getAppointments = (_req: any, res: getAppsResType, next: nextType) => {
  Appointment.findAll()
    .then((appointments: appointmentType[]) => {
      res.status(200).json(appointments);
    })
    .catch((error: errorType) => {
      error.statusCode = 500;
      error.message = "Couldn't get appointments";
      return next(error);
    });
};

const addAppointment = (
  req: addAppReqType,
  res: addAppResType,
  next: nextType
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error: errorType = {
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
    .catch((err: errorType) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Couldn't book appointment";
      }
      return next(err);
    });
};

const getAppointment = (
  req: getAppReqType,
  res: getAppResType,
  next: nextType
) => {
  Appointment.findByPk(req.params.appId)
    .then((appointment: appointmentType) => {
      if (appointment === null) {
        const error: errorType = {
          message: `Appointment with id-${req.params.appId} not found. Please try another id`,
          statusCode: 404,
        };
        throw error;
      }
      res.status(200).json(appointment);
    })
    .catch((err: errorType) => {
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
