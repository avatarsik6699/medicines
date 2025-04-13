import { BadRequestException, HttpStatus } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Server } from "http";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { Types } from "src/shared/types";
import * as request from "supertest";
import { PharmacologicalGroupController } from "../../controllers/pharmacological-group.controller";
import { PharmacologicalGroupDto as Dto } from "../../dtos/pharmacological-group.dto";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { PharmacologicalGroupService } from "../../services/pharmacological-group.service";

describe("PharmacologicalGroupController", () => {
	let $module: TestingModuleFactory;
	let $server: Server;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([PharmacologicalGroup])],
				controllers: [PharmacologicalGroupController],
				providers: [PharmacologicalGroupService, PharmacologicalGroupFactory],
				config: { globalPrefix: "api", validationPipe: { whitelist: true, transform: true } },
			}).initialize();

			$server = $module.getApp().getHttpServer();
		} catch (error) {
			console.log(error);

			throw error;
		}
	});

	afterAll(async () => {
		await $module.destroy();
	});

	describe("[POST][create] /pharmacological-group", () => {
		it("should create a pharmacological group", async () => {
			await request($server)
				.post("/api/pharmacological-group")
				.send({
					name: "Test",
					description: "Test",
				})
				.expect(({ status, body }: Types.Test.Response<Dto.Create.Response>) => {
					expect(status).toBe(HttpStatus.CREATED);
					expect(body.name).toBe("Test");
					expect(body.description).toBe("Test");
				});
		});

		it("should return a bad request error if the name is not provided", async () => {
			await request($server)
				.post("/api/pharmacological-group")
				.send({ description: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain("name should not be empty");
				});
		});

		it("should return a bad request error if the provided name is not a string", async () => {
			await request($server)
				.post("/api/pharmacological-group")
				.send({ name: {}, description: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain("name must be a string");
				});
		});
	});

	describe("[GET][findAll] /pharmacological-group", () => {
		it("should get all pharmacological groups", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createMany({ count: 2 });

			await request($server)
				.get("/api/pharmacological-group")
				.expect(({ status, body }: Types.Test.Response<Dto.FindAll.Response[]>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.length).toBe(created.length);
					body.forEach(item => {
						const target = created.find(
							pharmacologicalGroup => pharmacologicalGroup.id === item.id
						);

						expect(target).toBeDefined();
						expect(target?.name).toBe(item.name);
						expect(target?.description).toBe(item.description);
					});
				});
		});
	});

	describe("[GET][findOne] /pharmacological-group/:id", () => {
		it("should get a pharmacological group by id", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne({ name: "Test", description: "Test" });

			await request($server)
				.get(`/api/pharmacological-group/${created.id}`)
				.expect(({ status, body }: Types.Test.Response<Dto.FindOne.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.name).toBe(created.name);
					expect(body.description).toBe(created.description);
				});
		});

		it("should return a not found error if the pharmacological group does not exist", async () => {
			await request($server)
				.get("/api/pharmacological-group/1")
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toContain("Pharmacological group not found");
				});
		});
	});

	describe("[PATCH][update] /pharmacological-group/:id", () => {
		it("should update a pharmacological group", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne({ name: "Test", description: "Test" });

			await request($server)
				.patch(`/api/pharmacological-group/${created.id}`)
				.send({ name: "Test2", description: "Test2" })
				.expect(({ status, body }: Types.Test.Response<Dto.Update.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.name).toBe("Test2");
					expect(body.description).toBe("Test2");
				});
		});

		it("should return a not found error if the pharmacological group does not exist", async () => {
			await request($server)
				.patch("/api/pharmacological-group/1")
				.send({ name: "Test2", description: "Test2" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toContain("Pharmacological group not found");
				});
		});
	});

	describe("[DELETE][delete] /pharmacological-group/:id", () => {
		it("should delete a pharmacological group", async () => {
			const $factory = $module.getModuleRef().get(PharmacologicalGroupFactory);

			const created = await $factory.createOne({ name: "Test", description: "Test" });

			await request($server)
				.delete(`/api/pharmacological-group/${created.id}`)
				.expect(({ status }: Types.Test.Response<never>) => {
					expect(status).toBe(HttpStatus.OK);
				});
		});

		it("should return a not found error if the pharmacological group does not exist", async () => {
			await request($server)
				.delete("/api/pharmacological-group/1")
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toContain("Pharmacological group not found");
				});
		});
	});
});
