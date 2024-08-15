const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware");
const zod = require('zod');
const { Schedule, User } = require('../db');
const moment = require('moment');

const scheduleBody = zod.object({
    selectedDate: zod.string(),
    selectedTruck: zod.object({
      id: zod.number(),
      license: zod.string().min(1),
      driver: zod.string().min(1)
    }),
    email: zod.string().email()
});

router.post('/submit', authMiddleware, async (req, res) => {
    const result = scheduleBody.safeParse(req.body);

    if (!result.success) {
        console.log(result.error);
        return res.status(400).send('Invalid data');
    }

    try {
        const previousSchedules = await Schedule.find({ email: req.body.email });

        const isValidDate = previousSchedules.every(schedule => {
            return moment(req.body.selectedDate).isAfter(moment(schedule.selectedDate));
        });

        if (!isValidDate) {
            return res.status(400).send('Selected date must be greater than all previous dates');
        }

        const truckData = {
          id: req.body.selectedTruck.id,
          license: req.body.selectedTruck.license,
          driver: req.body.selectedTruck.driver
        };

        const schedule = await Schedule.create({
            email: req.body.email,
            selectedDate: req.body.selectedDate,
            selectedTruck: truckData
        });
        res.status(201).json(schedule);
    } catch (error) {
        console.error(error);
        let errorMessage;
        if (error instanceof mongoose.Error && error.name === 'ValidationError') {
            errorMessage = 'Validation failed';
        } else {
            errorMessage = 'Error saving data';
        }
        res.status(500).send(errorMessage);
    }
});

router.post('/info', authMiddleware, async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const schedules = await Schedule.find({ email: email });

        // Convert dates to local time
        const localSchedules = schedules.map(schedule => {
          const localDate = new Date(schedule.selectedDate.getTime() + (new Date().getTimezoneOffset() * 60000));
          return { ...schedule.toObject(), selectedDate: localDate };
        });

        res.json({ firstName: user.firstName, schedules: localSchedules });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

router.post('/remove', authMiddleware, async (req, res) => {
    try {
        const scheduleId = req.body.scheduleId;
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return res.status(404).send({ message: 'Schedule not found' });
        }

        res.send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting schedule', error });
    }
});

module.exports = router;
