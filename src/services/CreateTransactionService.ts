import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';
import Transaction from '../models/Transaction';

interface Request {
  user_id: string;
  price: number;
  transaction_type: number;
}

class CreateTransactionService {
  public async execute({ user_id, price, transaction_type }: Request): Promise<Transaction> {
    const PAYMENT = 2;
    const EXCHANGE = 3;

    const transactionsRepository = getRepository(Transaction);
    const usersRepository = getRepository(User);

    const user: User = await usersRepository.findOneOrFail({
      where: {
        id: user_id
      }
    });

    if ((transaction_type === PAYMENT || transaction_type === EXCHANGE) && user.balance < price) {
      throw new AppError("You don't have enough money");
    }

    const transaction = transactionsRepository.create({ user_id, price, transaction_type });

    await transactionsRepository.save(transaction);

    if (transaction_type === PAYMENT || transaction_type === EXCHANGE) {
      user.balance = +user.balance - +price;
    } else {
      user.balance = +price + +user.balance;
    }

    usersRepository.save(user);

    return transaction;
  }
}

export default CreateTransactionService;
