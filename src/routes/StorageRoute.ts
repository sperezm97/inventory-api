import express from 'express';
import { StorageController } from '../controllers';
import { requiredId, storageCreateSchema, storageUpdatedSchema, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await StorageController.getAllStorages();

  res.send(response);
});

router.post('/', validate(storageCreateSchema), async (req, res) => {
  const { body } = req;

  const response = await StorageController.createOneStorage(body);

  res.send(response);
});

router.get('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  try {
    const response = await StorageController.getOneStorage(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', validate(storageUpdatedSchema), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await StorageController.updateOneStorage(Number(id), body);
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;

  try {
    const response = await StorageController.removeOneStorage(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
