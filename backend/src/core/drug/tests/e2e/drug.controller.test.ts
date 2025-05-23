import { TypeOrmModule } from "@nestjs/typeorm";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { Types } from "src/shared/types";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TradeName } from "../../entities/trade-name.entity";
import { TradeNameFactory } from "../../factories/trade-name.factory";
import { TradeNameService } from "../../services/trade-name.serivce";
import * as request from "supertest";
import { HttpStatus, BadRequestException } from "@nestjs/common";
import { Drug } from "../../entities/drug.entity";
import { DrugService } from "../../services/drug.service";
import { DrugFactory } from "../../factories/drug.factory";
import { DrugController } from "../../controllers/drug.controller";
import { DrugDto as Dto } from "../../dtos/drug.dto";
describe("DrugController", () => {
	let $module: TestingModuleFactory;
	let $server: Types.Test.Server;

	let tradeName: TradeName;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [
					TypeOrmModule.forFeature([TradeName, ActiveSubstance, PharmacologicalGroup, Drug]),
				],
				controllers: [DrugController],
				providers: [
					DrugService,
					DrugFactory,
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

		const activeSubstance = await $module.getApp().get(ActiveSubstanceFactory).createOne({
			pharmacologicalGroup,
		});

		tradeName = await $module.getApp().get(TradeNameFactory).createOne({
			activeSubstance,
		});
	});

	describe("[POST][create] /drug", () => {
		it("should create a drug", async () => {
			await request($server)
				.post("/api/drug")
				.send({
					tradeNameId: tradeName.id,
					dosage: "Test",
				})
				.expect(({ status, body }: Types.Test.Response<Dto.Create.Response>) => {
					expect(status).toBe(HttpStatus.CREATED);
					expect(body.dosage).toBe("Test");
				});
		});

		it("should throw a bad request error if trade name not found", async () => {
			await request($server)
				.post("/api/drug")
				.send({ tradeNameId: -1, dosage: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toBe("Trade name not found");
				});
		});

		it("should not create a drug if dosage already exists", async () => {
			await $module.getApp().get(DrugFactory).createOne({
				tradeName,
				dosage: "Test",
			});

			await request($server)
				.post("/api/drug")
				.send({ tradeNameId: tradeName.id, dosage: "Test" })
				.expect(({ status, body }: Types.Test.Response<BadRequestException>) => {
					expect(status).toBe(HttpStatus.BAD_REQUEST);
					expect(body.message).toBe("Drug already exists");
				});
		});
	});
});
