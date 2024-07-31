const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware");
const zod = require('zod');
const { Schedule } = require('../db'); // Assuming this is your Mongoose model
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
        // Fetch all previous schedules for the email
        const previousSchedules = await Schedule.find({ email: req.body.email });

        // Check if the selected date is greater than all previous dates
        const isValidDate = previousSchedules.every(schedule => {
            return moment(req.body.selectedDate).isAfter(moment(schedule.selectedDate));
        });

        if (!isValidDate) {
            return res.status(400).send('Selected date must be greater than all previous dates');
        }

        // Prepare the data for creation, assuming selectedTruck needs to be serialized
        const truckData = {
          id: req.body.selectedTruck.id,
          license: req.body.selectedTruck.license,
          driver: req.body.selectedTruck.driver
        };

        // Create the schedule
        const schedule = await Schedule.create({
            email: req.body.email,
            selectedDate: req.body.selectedDate,
            selectedTruck: truckData // Adjusted to match expected data structure
        });
        res.status(201).json(schedule);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        let errorMessage;
        if (error instanceof mongoose.Error && error.name === 'ValidationError') {
            errorMessage = 'Validation failed';
        } else {
            errorMessage = 'Error saving data';
        }
        res.status(500).send(errorMessage);
    }
});

module.exports = router;
