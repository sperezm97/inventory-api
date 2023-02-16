import express from 'express';
import PingController from '../controllers/ping';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const response = await PingController.getMessage();
  res.send(response);
});

export default router;
