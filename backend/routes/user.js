const express = require('express');
const { authMiddleware } = require("../middleware");
const zod = require('zod');
const { User, AdditionalDetailsUser } = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signupBody = zod.object({
  firstName: zod.string().min(1).max(50),
  lastName: zod.string().min(1).max(50),
  email: zod.string().email(),
});

const AdditionalDetailsUserBody = zod.object({
  email: zod.string().email(),
  phoneNumber: zod.string().min(10).max(10),
  address: zod.string().max(200)
});

const loginBody = zod.object({
  email: zod.string().email()
});

router.post('/check',async(req,res) => {
  const parsedBody = loginBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      message: 'Incorrect input',
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: 'Email already exists',
    });
  }
  res.json({
    message: 'Success',
  });

})

router.post('/signup', async (req, res) => {
  const parsedBody = signupBody.safeParse(req.body);
  console.log(req.body)
  if (!parsedBody.success) {
    return res.status(411).json({
      message: 'Incorrect input',
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: 'Email already exists',
    });
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  res.json({
    message: 'User created successfully',
  });
});

router.post('/additional-details', async (req, res) => {
  const parsedBody = AdditionalDetailsUserBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      message: 'Incorrect input',
    });
  }

  const existingUser = await AdditionalDetailsUser.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: 'User already exists',
    });
  }

  try {
    const user = await AdditionalDetailsUser.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });

    res.json({
      message: 'Additional details saved successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(411).json({
        message: 'Phone number already exists',
      });
    }
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.post('/login', async (req, res) => {
  const parsedBody = loginBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      message: 'Incorrect input',
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({
      message: 'User does not exist',
    });
  }

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: user._id }, secret);

  const userDetails = await AdditionalDetailsUser.findOne({ email: user.email });

  res.json({
    message: 'Login successful',
    token: token,
    user: {
      email: user.email,
      phoneNumber: userDetails ? userDetails.phoneNumber : null,
      address: userDetails ? userDetails.address : null
    },
  });
});

router.post('/changeaddress', authMiddleware, async (req, res) => {
  const { email, address } = req.body;

  try {
    const user = await AdditionalDetailsUser.findOneAndUpdate(
      { email },
      { address },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json({
      message: 'Address updated successfully',
      user: {
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  const message = 'User is logged in';
  res.json({ message, user: req.user });
});

module.exports = router;
