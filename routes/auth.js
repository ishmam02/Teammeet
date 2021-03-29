import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError, NotFoundError, DatabaseConnectionError } from '@ishmam_tech/common';

import { User } from '../models/user.js';
import { Password } from '../services/password.js';

const router = express.Router();

router.post(
	'/api/auth/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('name').notEmpty().isString().isLength({ min: 2 }).withMessage('Name should not be empty'),
		body('password').notEmpty().isString().isLength({ min: 7 }).withMessage('Password should not be empty')
	],
	validateRequest,
	async (req, res) => {
		const { email, name, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}
		let user;
		try {
			user = User.build({ email, name, password });
			await user.save();
		} catch (err) {
			throw new DatabaseConnectionError();
		}

		res.status(201).send(user);
	}
);

router.post(
	'/api/auth/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').notEmpty().isString().isLength({ min: 7 }).withMessage('Password should not be empty')
	],
	validateRequest,
	async (req, res) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new NotFoundError();
		}

		const passwordsMatch = await Password.compare(existingUser.password, password);
		if (!passwordsMatch) {
			throw new BadRequestError('Invalid Credentials');
		}
		const options = { expiresIn: '24h' };
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email
			},
			process.env.JWT_KEY,
			options
		);
		req.session = {
			jwt: userJwt
		};
		res.status(200).send(existingUser);
	}
);

router.post('/api/auth/signout', async (req, res) => {
	req.session = null;

	res.status(200).send();
});

export { router as authRouter };
