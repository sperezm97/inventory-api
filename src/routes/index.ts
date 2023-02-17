import express from 'express';
import PingController from '../controllers/ping';
import InventoryTypeRoute from './InventoryTypeRoute';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const response = await PingController.getMessage();
  res.send(response);
});

router.use('/inventory-type', InventoryTypeRoute);
export default router;
