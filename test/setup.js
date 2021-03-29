import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo;
beforeAll(async () => {
	process.env.JWT_KEY = 'asdfasdf';
	process.env.EMAIL_ADDRESS = 'test@test.com';
	process.env.EMAIL_PASSWORD = 'test@test.com';
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signup = async () => {
	const email = 'test@test.com';
	const name = 'name';

	const token = jwt.sign(
		{
			email,
			name,
			remember: false,
			image: 'images/avatar.png'
		},
		process.env.JWT_KEY,
		{ expiresIn: '5m' }
	);

	const response = await request(app).get(`/api/users/auth/signup/authenticate?token=${token}`).expect(201);

	const cookie = response.get('Set-Cookie');

	return cookie;
};

global.signin = async () => {
	const email = 'test@test.com';

	const token = jwt.sign(
		{
			email
		},
		process.env.JWT_KEY,
		{ expiresIn: '5m' }
	);

	return token;
};

global.token = () => {
	// Build a JWT payload.  { id, email }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com'
	};

	// Create the JWT!
	const token = jwt.sign(payload, process.env.JWT_KEY);

	// Build session Object. { jwt: MY_JWT }
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// return a string thats the cookie with the encoded data
	return [ `express:sess=${base64}` ];
};
