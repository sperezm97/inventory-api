import express from 'express';
import { StockPerStorageController } from '../controllers';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await StockPerStorageController.getOneStockPerProduct(Number(id));

  res.send(response);
});

export default router;
