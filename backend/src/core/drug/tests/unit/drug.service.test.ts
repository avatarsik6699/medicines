import { TypeOrmModule } from "@nestjs/typeorm";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TradeName } from "../../entities/trade-name.entity";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { TradeNameFactory } from "../../factories/trade-name.factory";
import { TradeNameService } from "../../services/trade-name.serivce";
import { DrugService } from "../../services/drug.service";
import { DrugFactory } from "../../factories/drug.factory";
import { Drug } from "../../entities/drug.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("DrugService", () => {
	let $module: TestingModuleFactory;
	let $drugService: DrugService;
	let $tradeNameFactory: TradeNameFactory;
	let $drugFactory: DrugFactory;
	let $activeSubstanceFactory: ActiveSubstanceFactory;
	let $pharmacologicalGroupFactory: PharmacologicalGroupFactory;

	let tradeName: TradeName;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [
					TypeOrmModule.forFeature([ActiveSubstance, PharmacologicalGroup, TradeName, Drug]),
				],
				providers: [
					DrugService,
					DrugFactory,
					TradeNameService,
					TradeNameFactory,
					ActiveSubstanceFactory,
					PharmacologicalGroupFactory,
				],
			}).initialize();

			$drugService = $module.getModuleRef().get(DrugService);
			$tradeNameFactory = $module.getModuleRef().get(TradeNameFactory);
			$drugFactory = $module.getModuleRef().get(DrugFactory);
			$activeSubstanceFactory = $module.getModuleRef().get(ActiveSubstanceFactory);
			$pharmacologicalGroupFactory = $module.getModuleRef().get(PharmacologicalGroupFactory);
		} catch (error) {
			console.log(error);

			throw error;
		}
	});

	afterAll(async () => {
		await $module.destroy();
	});

	beforeEach(async () => {
		tradeName = await $tradeNameFactory.createOne({
			activeSubstance: await $activeSubstanceFactory.createOne({
				pharmacologicalGroup: await $pharmacologicalGroupFactory.createOne(),
			}),
		});
	});

	describe("create", () => {
		it("should create a new drug", async () => {
			const created = await $drugService.create({
				tradeNameId: tradeName.id,
				dosage: "10mg",
			});

			expect(created).toBeDefined();
			expect(created.tradeName).toBeDefined();
			expect(created.tradeName.id).toBe(tradeName.id);
			expect(created.dosage).toBe("10mg");
		});

		it("should throw an error if drug with same dosage and trade name already exists", async () => {
			await $drugFactory.createOne({ tradeName, dosage: "10mg" });

			await expect(
				$drugService.create({ tradeNameId: tradeName.id, dosage: "10mg" })
			).rejects.toThrow(
				new BadRequestException("Drug with same trade name and dosage already exists")
			);
		});

		it("should throw an error if the trade name does not exist", async () => {
			await expect($drugService.create({ tradeNameId: 0, dosage: "10mg" })).rejects.toThrow(
				new NotFoundException("Trade name not found")
			);
		});
	});

	describe("findAll", () => {
		it("should find all drugs", async () => {
			const created = await $drugFactory.createMany({
				dataList: $drugFactory.randomUniqueDosages.map(dosage => ({
					dosage,
					tradeName,
				})),
			});

			const drugs = await $drugService.findAll();

			expect(drugs).toBeDefined();
			expect(drugs.length).toBe(created.length);
			created.forEach(item => {
				expect(drugs).toContainEqual(
					expect.objectContaining({
						id: item.id,
						dosage: item.dosage,
					})
				);
			});
		});
	});

	describe("findOne", () => {
		it("should find a drug by id", async () => {
			const created = await $drugFactory.createOne({ tradeName });

			const found = await $drugService.findOne({ id: created.id });

			expect(found).toBeDefined();
			expect(found.id).toBe(created.id);
			expect(found.dosage).toBe(created.dosage);
		});

		it("should throw an error if the drug does not exist", async () => {
			await expect($drugService.findOne({ id: 0 })).rejects.toThrow(
				new NotFoundException("Drug not found")
			);
		});
	});

	describe("update", () => {
		it("should update a drug", async () => {
			const created = await $drugFactory.createOne({ tradeName });

			const updated = await $drugService.update({
				id: created.id,
				dosage: "20mg",
			});

			expect(updated).toBeDefined();
			expect(updated.id).toBe(created.id);
			expect(updated.dosage).toBe("20mg");
		});

		it("should throw an error if drug with same dosage and trade name already exists", async () => {
			await $drugFactory.createOne({ tradeName, dosage: "10mg" });
			const created = await $drugFactory.createOne({ tradeName, dosage: "20mg" });

			await expect($drugService.update({ id: created.id, dosage: "10mg" })).rejects.toThrow(
				new BadRequestException("Drug with same trade name and dosage already exists")
			);
		});

		it("should throw an error if the drug does not exist", async () => {
			await expect($drugService.update({ id: 0, dosage: "20mg" })).rejects.toThrow(
				new NotFoundException("Drug not found")
			);
		});
	});

	describe("delete", () => {
		it("should delete a drug", async () => {
			const created = await $drugFactory.createOne({ tradeName });

			await $drugService.delete({ id: created.id });

			await expect($drugService.findOne({ id: created.id })).rejects.toThrow(
				new NotFoundException("Drug not found")
			);
		});

		it("should throw an error if the drug does not exist", async () => {
			await expect($drugService.delete({ id: 0 })).rejects.toThrow(
				new NotFoundException("Drug not found")
			);
		});
	});
});
