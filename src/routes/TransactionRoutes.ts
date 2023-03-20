import express from 'express';
import TransactionController from '../controllers/TransactionController';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await TransactionController.getAllTransactions();

  res.send(response);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const response = await TransactionController.createOneTransaction(body);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await TransactionController.getOneTransaction(Number(id));
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const response = await TransactionController.updateOneTransaction(Number(id), body);
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await TransactionController.removeOneTransaction(Number(id));
  res.send(response);
});

export default router;
