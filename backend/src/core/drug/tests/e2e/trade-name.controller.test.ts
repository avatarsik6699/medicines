import { TypeOrmModule } from "@nestjs/typeorm";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { Types } from "src/shared/types";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TradeName } from "../../entities/trade-name.entity";
import { TradeNameFactory } from "../../factories/trade-name.factory";
import { TradeNameController } from "../../controllers/trade-name.controller";
import { TradeNameService } from "../../services/trade-name.serivce";
import * as request from "supertest";
import { HttpStatus, BadRequestException } from "@nestjs/common";
import { TradeNameDto as Dto } from "../../dtos/trade-name.dto";
import { NotFoundError } from "rxjs";

describe("TradeNameController", () => {
	let $module: TestingModuleFactory;
	let $server: Types.Test.Server;

	let activeSubstance: ActiveSubstance;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([TradeName, ActiveSubstance, PharmacologicalGroup])],
				controllers: [TradeNameController],
				providers: [
					TradeNameService,
					TradeNameFactory,
					ActiveSubstanceFactory,
					PharmacologicalGroupFactory,
				],
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
		const pharmacologicalGroup = await $module
			.getApp()
			.get(PharmacologicalGroupFactory)
			.createOne();

		activeSubstance = await $module.getApp().get(ActiveSubstanceFactory).createOne({
			pharmacologicalGroup,
		});
	});

	describe("[POST][create] /trade-name", () => {
		it("should create a trade name", async () => {
			await request($server)
				.post("/api/trade-name")
				.send({
					name: "Test",
					description: "Test",
					originCountry: "Test",
					isOriginal: true,
					activeSubstanceId: activeSubstance.id,
				})
				.expect(({ status, body }: Types.Test.Response<Dto.Create.Response>) => {
					expect(status).toBe(HttpStatus.CREATED);
					expect(body.name).toBe("Test");
					expect(body.description).toBe("Test");
					expect(body.originCountry).toBe("Test");
					expect(body.isOriginal).toBe(true);
				});
		});

		it("isOriginal should be null by default", async () => {
			await request($server)
				.post("/api/trade-name")
				.send({
					name: "Test",
					description: "Test",
					originCountry: "Test",
					activeSubstanceId: activeSubstance.id,
				})
				.expect(({ status, body }: Types.Test.Response<Dto.Create.Response>) => {
					expect(status).toBe(HttpStatus.CREATED);
					expect(body.isOriginal).toBe(null);
				});
		});

		it("should return a bad request error if the active substance id is not provided", async () => {
			await request($server)
				.post("/api/trade-name")
				.send({
					name: "Test",
					description: "Test",
				})
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain("activeSubstanceId should not be empty");
				});
		});

		it("should return a bad request error if the active substance id is not a number", async () => {
			await request($server)
				.post("/api/trade-name")
				.send({
					name: "Test",
					description: "Test",
					originCountry: "Test",
					activeSubstanceId: "Test",
				})
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toContain(
						"activeSubstanceId must be a number conforming to the specified constraints"
					);
				});
		});

		it("should return a bad request error if the active substance id is not exists", async () => {
			await request($server)
				.post("/api/trade-name")
				.send({
					name: "Test",
					description: "Test",
					originCountry: "Test",
					activeSubstanceId: -1,
				})
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Active substance not found");
				});
		});
	});

	describe("[GET][findAll] /trade-name", () => {
		it("should return all trade names", async () => {
			const createdTradeNames = await $module.getApp().get(TradeNameFactory).createMany({
				count: 3,
				dataForEach: {
					activeSubstance,
				},
			});

			await request($server)
				.get("/api/trade-name")
				.expect(({ status, body }: Types.Test.Response<Dto.FindAll.Response[]>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.length).toBe(createdTradeNames.length);
					createdTradeNames.forEach(item => {
						expect(body).toContainEqual(
							expect.objectContaining({
								id: item.id,
								name: item.name,
								description: item.description,
								originCountry: item.originCountry,
								isOriginal: item.isOriginal,
							})
						);
					});
				});
		});
	});

	describe("[GET][findOne] /trade-name/:id", () => {
		it("should return a trade name", async () => {
			const tradeName = await $module.getApp().get(TradeNameFactory).createOne({
				activeSubstance,
			});

			await request($server)
				.get(`/api/trade-name/${tradeName.id}`)
				.expect(({ status, body }: Types.Test.Response<Dto.FindOne.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.id).toBe(tradeName.id);
				});
		});

		it("should return a not found error if the trade name is not found", async () => {
			await request($server)
				.get("/api/trade-name/1")
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Trade name not found");
				});
		});
	});

	describe("[PATCH][update] /trade-name/:id", () => {
		it("should update a trade name", async () => {
			const tradeName = await $module.getApp().get(TradeNameFactory).createOne({
				activeSubstance,
			});

			await request($server)
				.patch(`/api/trade-name/${tradeName.id}`)
				.send({ name: "new name", description: "new description" })
				.expect(({ status, body }: Types.Test.Response<Dto.Update.Response>) => {
					expect(status).toBe(HttpStatus.OK);
					expect(body.id).toBe(tradeName.id);
					expect(body.name).toBe("new name");
					expect(body.description).toBe("new description");
				});
		});

		it("should return a not found error if the trade name is not found", async () => {
			await request($server)
				.patch("/api/trade-name/1")
				.send({ name: "new name", description: "new description" })
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Trade name not found");
				});
		});
	});

	describe("[DELETE][delete] /trade-name/:id", () => {
		it("should delete a trade name", async () => {
			const tradeName = await $module.getApp().get(TradeNameFactory).createOne({
				activeSubstance,
			});

			await request($server)
				.delete(`/api/trade-name/${tradeName.id}`)
				.expect(({ status }: Types.Test.Response<never>) => {
					expect(status).toBe(HttpStatus.OK);
				});
		});

		it("should return a not found error if the trade name is not found", async () => {
			await request($server)
				.delete("/api/trade-name/1")
				.expect(({ status, body }: Types.Test.Response<NotFoundError>) => {
					expect(status).toBe(HttpStatus.NOT_FOUND);
					expect(body.message).toBe("Trade name not found");
				});
		});
	});
});
