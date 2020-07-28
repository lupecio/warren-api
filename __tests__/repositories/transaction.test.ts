import { getRepository, getConnection, createConnections } from 'typeorm';

import User from '../../src/models/User';
import Transaction from '../../src/models/Transaction';

beforeAll(async () => {
  await createConnections()
});

afterAll(async () => {
  const defaultConnection = getConnection('default');

  const clearDb = async () => {
    const entities = defaultConnection.entityMetadatas;

    for (const entity of entities) {
      const repository = await defaultConnection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    }
  };

  clearDb();
  await defaultConnection.close();
});

describe("Transaction Repository", () => {
  it("should create a transaction", async () => {
    const userRepository = await getRepository(User);
    const user = await userRepository.create({
      name: "Lucas",
      email: "lucas123@email.com",
      password: "123456",
      balance: 0.00
    });

    userRepository.save(user);

    const transactionRepository = await getRepository(Transaction);
    const transaction = await transactionRepository.create({
      user_id: user.id,
      price: 100.00,
      description: 'teste',
      transaction_type: 1
    });

    transactionRepository.save(transaction);

    expect(user.email).toBe("lucas123@email.com");
    expect(user.name).toBe("Lucas");
    expect(transaction.price).toBe(100.00);
    expect(transaction.description).toBe('teste');
  })
})
