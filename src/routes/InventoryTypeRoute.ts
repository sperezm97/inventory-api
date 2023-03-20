import express from 'express';
import { InventoryTypeController } from '../controllers';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await InventoryTypeController.getAllInventoryTypes();

  res.send(response);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const response = await InventoryTypeController.createOneInventoryType(body);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InventoryTypeController.getOneInventoryType(Number(id));
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await InventoryTypeController.updateOneInventoryType(Number(id), body);
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InventoryTypeController.removeOneInventoryType(Number(id));
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

export default router;
