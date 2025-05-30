import { Request, Response } from 'express';
import { identify } from '../services/contactService';

export const identifyContact = async (req: Request, res: Response) => {
  try {
    const result = await identify(req.body);
    res.status(200).json({ contact: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
