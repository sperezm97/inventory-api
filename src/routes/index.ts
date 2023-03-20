import express from 'express';
import PingController from '../controllers/ping';
import InventoryTypeRoute from './InventoryTypeRoute';
import ItemRoutes from './ItemRoute';
import StorageRoute from './StorageRoute';
import TransactionRoute from './TransactionRoutes';
import StockPerStorageRoute from './StockPerStorageRoute';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const response = await PingController.getMessage();
  res.send(response);
});

router.use('/inventory-type', InventoryTypeRoute);
router.use('/storage', StorageRoute);
router.use('/item', ItemRoutes);
router.use('/transaction', TransactionRoute);
router.use('/stock-per-storage', StockPerStorageRoute);

export default router;
