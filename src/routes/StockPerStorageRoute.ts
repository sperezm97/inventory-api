import express from 'express';
import { StockPerStorageController } from '../controllers';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await StockPerStorageController.getOneStockPerProduct(Number(id));

    res.send(response);
  } catch (error) {
    next(error);
  }
});

export default router;
