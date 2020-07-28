import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.get('/balance', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne({ where: { id: request.user.id } });

  if (user) {
    delete user.password;
  }

  return response.json(user);
});

export default usersRouter;
