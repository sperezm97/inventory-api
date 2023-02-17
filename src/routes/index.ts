import express from 'express';
import PingController from '../controllers/ping';
import InventoryTypeRoute from './InventoryTypeRoute';
import StorageRoute from './StorageRoute';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const response = await PingController.getMessage();
  res.send(response);
});

router.use('/inventory-type', InventoryTypeRoute);
router.use('/storage', StorageRoute);

export default router;
