import express from 'express';
import { ItemController } from '../controllers';
import { itemCreateSchema, itemUpdatedSchema, requiredId, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await ItemController.getAllItems();

  res.send(response);
});

router.post('/', validate(itemCreateSchema), async (req, res) => {
  const { body } = req;

  const response = await ItemController.createOneItem(body);

  res.send(response);
});

router.get('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ItemController.getOneItem(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', validate(itemUpdatedSchema), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await ItemController.updateOneItem(Number(id), body);
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ItemController.removeOneItem(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
