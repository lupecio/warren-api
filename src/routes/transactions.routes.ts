import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Transaction from '../models/Transaction';

const transactionsRouter = Router();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const transactionsRepository = getRepository(Transaction);
  const transactions = await transactionsRepository.find({
    where: {
      user_id: request.user.id
    }
  });

  return response.json(transactions);
});

transactionsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { price, transaction_type } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({ user_id: request.user.id, price, transaction_type });

  return response.json(transaction);
});

export default transactionsRouter;
