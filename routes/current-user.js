import express from 'express';
import { currentUser } from '@ishmam_tech/common';

const router = express.Router();

router.get('/api/currentUser', currentUser, (req, res) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
