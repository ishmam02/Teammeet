import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { server } from './app.js';

dotenv.config();

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('Connected to MongoDb');
	} catch (err) {
		console.error(err);
	}

	server.listen(process.env.PORT || 8080, () => {
		console.log(`Listening on port ${process.env.PORT}`);
	});
};

start();
