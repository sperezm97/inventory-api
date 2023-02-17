import express from 'express';
import StorageController from '../controllers/StorageRepository';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await StorageController.getAllStorages();

  res.send(response);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const response = await StorageController.createOneStorage(body);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await StorageController.getOneStorage(Number(id));
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const response = await StorageController.updateOneStorage(Number(id), body);
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await StorageController.removeOneStorage(Number(id));
  res.send(response);
});

export default router;
