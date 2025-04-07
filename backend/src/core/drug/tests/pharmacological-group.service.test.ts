import { TypeOrmModule } from "@nestjs/typeorm";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TestingPostgreSqlDbContainer } from "src/shared/tests/testing-postgresql-db.container";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";
import { PharmacologicalGroupService } from "../services/pharmacological-group.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PharmacologicalGroupFactory } from "../factories/pharmacological-group.factory";
import { faker } from "@faker-js/faker/.";

describe("PharmacologicalGroupService", () => {
	let $module: TestingModuleFactory;
	let $service: PharmacologicalGroupService;

	beforeAll(async () => {
		try {
			await TestingPostgreSqlDbContainer.start();

			$module = await TestingModuleFactory.create({
				dataSource: TestingPostgreSqlDbContainer.dataSource,
				imports: [TypeOrmModule.forFeature([PharmacologicalGroup])],
				providers: [PharmacologicalGroupService, PharmacologicalGroupFactory],
			}).initialize();

			$service = $module.getModuleRef().get(PharmacologicalGroupService);
		} catch (error) {
			console.log(error);

			throw error;
		}
	});

	afterAll(async () => {
		await $module.cleanup();
		await TestingPostgreSqlDbContainer.stop();
	});

	beforeEach(async () => {
		await TestingPostgreSqlDbContainer.cleanDatabase();
	});

	describe("create", () => {
		it("should create and retrieve a pharmacological group", async () => {
			const data = {
				name: "Test Group",
				description: "Test Description",
			};

			const created = await $service.create(data);
			const found = await $service.findOne({
				id: created.id,
			});

			expect(created).toBeDefined();
			expect(created.name).toBe(data.name);
			expect(created.description).toBe(data.description);

			expect(found).toBeDefined();
			expect(found.name).toBe(data.name);
			expect(found.description).toBe(data.description);
		});

		it("should throw an error if the name is already taken", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);
			const created = await $factory.createOne();

			const data = {
				name: created.name,
				description: "Test Description",
			};

			await expect(async () => {
				await $service.create(data);
			}).rejects.toThrow(
				new BadRequestException("Pharmacological group with this name already exists")
			);
		});
	});

	describe("findAll", () => {
		it("should return all pharmacological groups", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createMany({ count: 3 });

			const found = await $service.findAll();

			expect(found).toBeDefined();
			expect(found.length).toBe(created.length);

			created.forEach(item => {
				expect(found.some(foundItem => foundItem.id === item.id)).toBe(true);
			});
		});
	});

	describe("findOne", () => {
		it("should return a pharmacological group by id", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne();

			const found = await $service.findOne({
				id: created.id,
			});

			expect(found).toBeDefined();
			expect(found.name).toBe(created.name);
			expect(found.description).toBe(created.description);
		});

		it("should throw an error if the pharmacological group is not found", async () => {
			await expect(async () => {
				await $service.findOne({
					id: faker.number.int({ min: 1, max: 9999 }),
				});
			}).rejects.toThrow(new NotFoundException("Pharmacological group not found"));
		});
	});

	describe("update", () => {
		it("should update a pharmacological group", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne();

			const updated = await $service.update({
				id: created.id,
				name: "Updated Name",
				description: "Updated Description",
			});

			expect(updated).toBeDefined();
			expect(updated.name).toBe("Updated Name");
			expect(updated.description).toBe("Updated Description");
		});

		it("should throw an error if the pharmacological group is not found", async () => {
			await expect(async () => {
				await $service.update({
					id: faker.number.int({ min: 1, max: 9999 }),
					name: "Updated Name",
					description: "Updated Description",
				});
			}).rejects.toThrow(new NotFoundException("Pharmacological group not found"));
		});

		it("should throw an error if the name is already taken", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createMany({ count: 2 });

			const dataToUpdateFirstItemWithSecondItemName = {
				id: created[0].id,
				name: created[1].name,
				description: "Updated Description",
			};

			await expect(async () => {
				await $service.update(dataToUpdateFirstItemWithSecondItemName);
			}).rejects.toThrow(
				new BadRequestException("Pharmacological group with this name already exists")
			);
		});
	});

	describe("delete", () => {
		it("should delete a pharmacological group", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne();

			await $service.delete({ id: created.id });

			await expect(async () => {
				await $service.findOne({ id: created.id });
			}).rejects.toThrow(new NotFoundException("Pharmacological group not found"));
		});

		it("should throw an error if the pharmacological group is not found", async () => {
			await expect(async () => {
				await $service.delete({ id: faker.number.int({ min: 1, max: 9999 }) });
			}).rejects.toThrow(new NotFoundException("Pharmacological group not found"));
		});
	});
});
