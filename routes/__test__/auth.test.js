import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/api/users/auth/signup')
		.send({
			email: 'test@test.com',
			name: 'Joe'
		})
		.expect(201);
});

it('returns a 400 with an invalid email, invalid name', async () => {
	await request(app)
		.post('/api/users/auth/signup')
		.send({
			email: 'alskdflaskjfd',
			name: 'name'
		})
		.expect(400);

	await request(app)
		.post('/api/users/auth/signup')
		.send({
			email: 'test@test.com',
			name: ''
		})
		.expect(400);
});

it('returns a 400 with missing email and name', async () => {
	await request(app)
		.post('/api/users/auth/signup')
		.send({
			email: 'test@test.com'
		})
		.expect(400);

	await request(app)
		.post('/api/users/auth/signup')
		.send({
			name: 'alskjdf'
		})
		.expect(400);
});

it('disallows duplicate emails', async () => {
	await global.signup();

	await request(app)
		.post('/api/users/auth/signup')
		.send({
			email: 'test@test.com',
			name: 'password'
		})
		.expect(400);
});

it('sets a cookie after successful signup', async () => {
	const cookie = await global.signup();

	expect(cookie).toBeDefined();
});

it('publishes an event', async () => {
	const cookie = await global.signup();

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});


it('fails when a email that does not exist is supplied', async () => {
	await request(app)
		.post('/api/users/auth/signin')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(404);
});

it('responds with a 200 when given valid credentials', async () => {
	await global.signup();

	await request(app)
		.post('/api/users/auth/signin')
		.send({
			email: 'test@test.com'
		})
		.expect(200);
});

it('responds with a cookie when email authentication is complete', async () => {
	await global.signup();
	const token = await global.signin();

	const response = await request(app).get(`/api/users/auth/signin/authenticate?token=${token}`).expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});


it('clears the cookie after signing out', async () => {
	const response = await request(app).post('/api/users/auth/signout').send().expect(200);
	expect(response.get('Set-Cookie')[0]).toEqual(
		'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
	);
});
