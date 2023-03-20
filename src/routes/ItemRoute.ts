import express from 'express';
import ItemController from '../controllers/ItemController';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await ItemController.getAllItems();

  res.send(response);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const response = await ItemController.createOneItem(body);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ItemController.getOneItem(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const response = await ItemController.updateOneItem(Number(id), body);
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ItemController.removeOneItem(Number(id));
    res.send(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
