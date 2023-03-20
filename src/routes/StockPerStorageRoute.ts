import express from 'express';
import StockPerStorageController from '../controllers/StockPerStorageController';

const router = express.Router();

router.post('/', async (req, res) => {
  const { body } = req;

  const response = await StockPerStorageController.createOneStockInStorage(body);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await StockPerStorageController.getOneStockPerProduct(Number(id));

  res.send(response);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const response = await StockPerStorageController.updateOneStockInStorage(Number(id), body);

  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await StockPerStorageController.removeOneStockInStorage(Number(id));

  res.send(response);
});

export default router;
