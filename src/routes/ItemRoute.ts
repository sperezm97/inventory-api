import express from 'express';
import { ItemController } from '../controllers';
import { itemCreateSchema, itemUpdatedSchema, requiredId, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const response = await ItemController.getAllItems();

  try {
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', validate(itemCreateSchema), async (req, res, next) => {
  const { body } = req;

  const response = await ItemController.createOneItem(body);

  try {
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validate(requiredId), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ItemController.getOneItem(Number(id));
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validate(itemUpdatedSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await ItemController.updateOneItem(Number(id), body);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validate(requiredId), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ItemController.removeOneItem(Number(id));
    res.send(response);
  } catch (error) {
    next(error);
  }
});

export default router;
