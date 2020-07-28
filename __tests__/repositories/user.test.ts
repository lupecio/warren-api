import User from '../../src/models/User';
import { getRepository, getConnection, createConnections } from 'typeorm';

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

describe("User Repository", () => {
  it("should create a user", async () => {
    const userRepository = await getRepository(User);
    const user = await userRepository.create({
      name: "Lucas",
      email: "lucas@email.com",
      password: "123456",
    });

    expect(user.email).toBe("lucas@email.com");
    expect(user.name).toBe("Lucas");
  })
})
