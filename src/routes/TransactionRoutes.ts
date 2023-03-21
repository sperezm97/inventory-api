import express from 'express';
import { TransactionController } from '../controllers';
import { requiredId, transactionCreateSchema, transactionUpdatedSchema, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await TransactionController.getAllTransactions();

  res.send(response);
});

router.post('/', validate(transactionCreateSchema), async (req, res) => {
  const { body } = req;

  const response = await TransactionController.createOneTransaction(body);

  res.send(response);
});

router.get('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;

  const response = await TransactionController.getOneTransaction(Number(id));
  res.send(response);
});

router.put('/:id', validate(transactionUpdatedSchema), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const response = await TransactionController.updateOneTransaction(Number(id), body);
  res.send(response);
});

router.delete('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  const response = await TransactionController.removeOneTransaction(Number(id));
  res.send(response);
});

export default router;
