import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { Types } from "src/shared/types";
import { ActiveSubstanceController } from "../../controllers/active-substance.controller";
import { ActiveSubstanceService } from "../../services/active-substance.service";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { BadRequestException, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { ActiveSubstanceDto as Dto } from "../../dtos/active-substance.dto";
import { NotFoundError } from "rxjs";

describe("ActiveSubstanceController", () => {
	let $module: TestingModuleFactory;
	let $server: Types.Test.Server;

	let pharmacologicalGroup: PharmacologicalGroup;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([ActiveSubstance, PharmacologicalGroup])],
				controllers: [ActiveSubstanceController],
				providers: [ActiveSubstanceService, ActiveSubstanceFactory, PharmacologicalGroupFactory],
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

	beforeEach(async () => {
		pharmacologicalGroup = await $module.getApp().get(PharmacologicalGroupFactory).createOne();
	});

	describe("[POST][create] /active-substance", () => {
		it("should create a new active substance", async () => {
			await request($server)
				.post("/api/active-substance")
				.send({
					name: "Test",
					description: "Test",
					pharmacologicalGroupId: pharmacologicalGroup.id,
				})
				.expect(({ status, body }: Types.Test.Response<Dto.Create.Response>) => {
					expect(status).toBe(HttpStatus.CREATED);
					expect(body.name).toBe("Test");
					expect(body.description).toBe("Test");
				});
		});

		it("should return a bad request error if the pharmacological group id is not provided", async () => {
			await request($server)
				.post("/api/active-substance")
				.send({ name: "Test", description: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain("pharmacologicalGroupId should not be empty");
				});
		});

		it("should return a bad request error if the pharmacological group id is not a number", async () => {
			await request($server)
				.post("/api/active-substance")
				.send({ name: "Test", description: "Test", pharmacologicalGroupId: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain(
						"pharmacologicalGroupId must be a number conforming to the specified constraints"
					);
				});
		});

		it("should return a bad request error if the pharmacological group id is not exists", async () => {
			await request($server)
				.post("/api/active-substance")
				.send({ name: "Test", description: "Test", pharmacologicalGroupId: -1 })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Pharmacological group not found");
				});
		});
	});

	describe("[GET][findAll] /active-substance", () => {
		it("should return all active substances", async () => {
			const createdActiveSubstances = await $module
				.getApp()
				.get(ActiveSubstanceFactory)
				.createMany({
					count: 3,
					dataForEach: {
						pharmacologicalGroup: pharmacologicalGroup,
					},
				});

			await request($server)
				.get("/api/active-substance")
				.expect(({ status, body }: Types.Test.Response<Dto.FindAll.Response[]>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.length).toBe(createdActiveSubstances.length);
					createdActiveSubstances.forEach(item => {
						expect(body).toContainEqual(
							expect.objectContaining({
								id: item.id,
								name: item.name,
								description: item.description,
							})
						);
					});
				});
		});
	});

	describe("[GET][findOne] /active-substance/:id", () => {
		it("should return a active substance", async () => {
			const activeSubstance = await $module.getApp().get(ActiveSubstanceFactory).createOne({
				pharmacologicalGroup,
			});

			await request($server)
				.get(`/api/active-substance/${activeSubstance.id}`)
				.expect(({ status, body }: Types.Test.Response<Dto.FindOne.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.id).toBe(activeSubstance.id);
				});
		});

		it("should return a not found error if the active substance is not found", async () => {
			await request($server)
				.get("/api/active-substance/1")
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Active substance not found");
				});
		});
	});

	describe("[PATCH][update] /active-substance/:id", () => {
		it("should update a active substance", async () => {
			const activeSubstance = await $module.getApp().get(ActiveSubstanceFactory).createOne({
				pharmacologicalGroup,
			});

			await request($server)
				.patch(`/api/active-substance/${activeSubstance.id}`)
				.send({ name: "Test", description: "Test" })
				.expect(({ status, body }: Types.Test.Response<Dto.Update.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.id).toBe(activeSubstance.id);
					expect(body.name).toBe("Test");
					expect(body.description).toBe("Test");
				});
		});

		it("should return a not found error if the active substance is not found", async () => {
			await request($server)
				.patch("/api/active-substance/1")
				.send({ name: "Test", description: "Test" })
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Active substance not found");
				});
		});
	});

	describe("[DELETE][delete] /active-substance/:id", () => {
		it("should delete a active substance", async () => {
			const activeSubstance = await $module.getApp().get(ActiveSubstanceFactory).createOne({
				pharmacologicalGroup,
			});

			await request($server)
				.delete(`/api/active-substance/${activeSubstance.id}`)
				.expect(({ status }: Types.Test.Response<never>) => {
					expect(status).toBe(HttpStatus.OK);
				});
		});

		it("should return a not found error if the active substance is not found", async () => {
			await request($server)
				.delete("/api/active-substance/1")
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Active substance not found");
				});
		});
	});
});
