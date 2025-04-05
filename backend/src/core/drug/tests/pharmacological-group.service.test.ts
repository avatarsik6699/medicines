import { Test } from "@nestjs/testing";
import { PharmacologicalGroupService } from "../services/pharmacological-group.service";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { utils } from "src/shared/utils";
import { StartedTestContainer } from "testcontainers";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { NestExpressApplication } from "@nestjs/platform-express";

describe("PharmacologicalGroupService", () => {
	let container: StartedTestContainer;
	let app: NestExpressApplication;
	let service: PharmacologicalGroupService;

	beforeAll(async () => {
		const pathResolver = utils.PathResolver.init();

		const { paths: entities } = await pathResolver.getPaths({
			required: true,
			patterns: ["**/*.entity{.ts,.js}"],
		});

		try {
			container = await new PostgreSqlContainer("postgres:17-alpine")
				.withExposedPorts(5432)
				.withDatabase("testdb")
				.withUsername("test")
				.withPassword("test")
				.start();

			console.log(container.getHost());

			const moduleRef = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRoot({
						type: "postgres",
						host: container.getHost(),
						port: container.getMappedPort(5432),
						username: "test", // должно соответствовать .withUsername()
						password: "test",
						database: "testdb",
						entities, // все сущности
						synchronize: true,
					}),
					TypeOrmModule.forFeature([PharmacologicalGroup]),
				],
				providers: [PharmacologicalGroupService],
			}).compile();

			app = moduleRef.createNestApplication();
			await app.init();

			service = moduleRef.get(PharmacologicalGroupService);
		} catch (error) {
			console.log(error);
		}
	});

	afterAll(async () => {
		await app?.close();
		await container?.stop();
	});

	// beforeEach(async () => {
	//   // Очищаем таблицы перед каждым тестом
	//   const dataSource = app.get(DataSource);
	//   const entities = dataSource.entityMetadatas;
	//   const tableNames = entities
	//     .map((entity) => `"${entity.tableName}"`)
	//     .join(', ');
	//   await dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE;`);
	// });

	describe("create", () => {
		it("should create and retrieve a pharmacological group", async () => {
			const data = {
				name: "Test Group",
				description: "Test Description",
			};

			const created = await service.create(data);
			const found = await service.findOne({
				id: created.id,
			});

			expect(created).toBeDefined();
			expect(created.name).toBe(data.name);
			expect(created.description).toBe(data.description);

			expect(found).toBeDefined();
			expect(found.name).toBe(data.name);
			expect(found.description).toBe(data.description);
		});
	});
});
