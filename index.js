
import mongoose from 'mongoose';

import { server } from './app.js';


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
		server.listen(process.env.PORT || 8080, () => {
			console.log(`Listening on port ${process.env.PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
};

start();
