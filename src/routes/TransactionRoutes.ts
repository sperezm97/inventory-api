import express from 'express';
import { TransactionController } from '../controllers';
import { requiredId, transactionCreateSchema, transactionUpdatedSchema, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await TransactionController.getAllTransactions();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', validate(transactionCreateSchema), async (req, res, next) => {
  const { body } = req;

  try {
    const response = await TransactionController.createOneTransaction(body);

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validate(requiredId), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await TransactionController.getOneTransaction(Number(id));
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validate(transactionUpdatedSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await TransactionController.updateOneTransaction(Number(id), body);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validate(requiredId), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await TransactionController.removeOneTransaction(Number(id));
    res.send(response);
  } catch (error) {
    next(error);
  }
});

export default router;
