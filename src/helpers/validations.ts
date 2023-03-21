import { type NextFunction, type Request, type Response } from 'express';
import * as yup from 'yup';

export const requiredId = yup.object({
  params: yup.object({
    id: yup.number().required(),
  }),
});

export const itemCreateSchema = yup.object({
  body: yup.object({
    description: yup.string().required(),
    unitPrice: yup.number().min(1).required(),
    status: yup.boolean().required(),
    inventoryId: yup.string().required(),
  }),
});

export const itemUpdatedSchema = yup.object({
  body: yup.object({
    description: yup.string(),
    unitPrice: yup.number().min(1),
    status: yup.boolean(),
    inventoryId: yup.string(),
  }),
  params: requiredId,
});

export const transactionCreateSchema = yup.object({
  body: yup.object({
    transactionType: yup.string().required(),
    quantity: yup.number().min(1).required(),
    itemId: yup.number().required(),
    storageId: yup.number().required(),
  }),
});

export const transactionUpdatedSchema = yup.object({
  body: yup.object({
    transactionType: yup.string(),
    quantity: yup.number().min(1),
    itemId: yup.number(),
    storageId: yup.number(),
  }),
  params: requiredId,
});

export const storageCreateSchema = yup.object({
  body: yup.object({
    description: yup.string().required(),
    status: yup.boolean().required(),
  }),
});

export const storageUpdatedSchema = yup.object({
  body: yup.object({
    description: yup.string(),
    status: yup.boolean(),
  }),
  params: requiredId,
});

export const inventoryTypeCreateSchema = yup.object({
  body: yup.object({
    description: yup.string().required(),
    account: yup.string().required(),
    status: yup.boolean().required(),
  }),
});

export const inventoryTypeUpdatedSchema = yup.object({
  body: yup.object({
    description: yup.string(),
    account: yup.string(),
    status: yup.boolean(),
  }),
  params: requiredId,
});

export const validate = (schema: yup.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
