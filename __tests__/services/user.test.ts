import CreateUserService from '../../src/services/CreateUserService';
import { getConnection, createConnections } from 'typeorm';

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

describe("User Service", () => {
  it("should create a user", async () => {

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name: 'Lucas',
      email: 'lucas23@email.com',
      password: '123456',
    });

    expect(user.name).toBe('Lucas');
    expect(user.email).toBe('lucas23@email.com');
  });
})
