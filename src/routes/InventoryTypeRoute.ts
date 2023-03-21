import express from 'express';
import { InventoryTypeController } from '../controllers';
import { inventoryTypeCreateSchema, inventoryTypeUpdatedSchema, requiredId, validate } from '../helpers/validations';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await InventoryTypeController.getAllInventoryTypes();

  res.send(response);
});

router.post('/', validate(inventoryTypeCreateSchema), async (req, res) => {
  const { body } = req;

  const response = await InventoryTypeController.createOneInventoryType(body);

  res.send(response);
});

router.get('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InventoryTypeController.getOneInventoryType(Number(id));
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

router.put('/:id', validate(inventoryTypeUpdatedSchema), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await InventoryTypeController.updateOneInventoryType(Number(id), body);
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

router.delete('/:id', validate(requiredId), async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InventoryTypeController.removeOneInventoryType(Number(id));
    res.send(response);
  } catch (error) {
    res.send(404).json(error);
  }
});

export default router;
