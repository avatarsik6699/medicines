import { TypeOrmModule } from "@nestjs/typeorm";
import { TradeName } from "../../entities/trade-name.entity";
import { TradeNameService } from "../../services/trade-name.serivce";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { TradeNameFactory } from "../../factories/trade-name.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { NotFoundException } from "@nestjs/common";

describe("TradeNameService", () => {
	let $module: TestingModuleFactory;
	let $tradeNameService: TradeNameService;
	let $tradeNameFactory: TradeNameFactory;

	let $activeSubstanceFactory: ActiveSubstanceFactory;
	let $pharmacologicalGroupFactory: PharmacologicalGroupFactory;

	let activeSubstance: ActiveSubstance;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([TradeName, ActiveSubstance, PharmacologicalGroup])],
				providers: [
					TradeNameService,
					TradeNameFactory,
					ActiveSubstanceFactory,
					PharmacologicalGroupFactory,
				],
			}).initialize();

			$tradeNameService = $module.getModuleRef().get(TradeNameService);
			$tradeNameFactory = $module.getModuleRef().get(TradeNameFactory);
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
		activeSubstance = await $activeSubstanceFactory.createOne({
			pharmacologicalGroup: await $pharmacologicalGroupFactory.createOne(),
		});
	});

	describe("create", () => {
		it("should create a trade name", async () => {
			const tradeName = await $tradeNameService.create({
				activeSubstanceId: activeSubstance.id,
				name: "Trade Name",
				description: "Description",
				originCountry: "Country",
				isOriginal: true,
			});

			expect(tradeName).toBeDefined();
			expect(tradeName.id).toBeDefined();
			expect(tradeName.name).toBe("Trade Name");
			expect(tradeName.description).toBe("Description");
			expect(tradeName.originCountry).toBe("Country");
			expect(tradeName.isOriginal).toBe(true);
		});
	});

	describe("findAll", () => {
		it("should find all trade names", async () => {
			const createdTradeNames = await $tradeNameFactory.createMany({
				count: 3,
				dataForEach: { activeSubstance },
			});

			const tradeNames = await $tradeNameService.findAll();

			expect(tradeNames).toBeDefined();
			expect(tradeNames.length).toBe(createdTradeNames.length);
			createdTradeNames.forEach(item => {
				expect(tradeNames).toContainEqual(
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

	describe("findOne", () => {
		it("should find a trade name by id", async () => {
			const tradeName = await $tradeNameFactory.createOne({
				activeSubstance,
			});

			const foundTradeName = await $tradeNameService.findOne({ id: tradeName.id });

			expect(foundTradeName).toBeDefined();
			expect(foundTradeName.id).toBe(tradeName.id);
			expect(foundTradeName.name).toBe(tradeName.name);
			expect(foundTradeName.description).toBe(tradeName.description);
			expect(foundTradeName.originCountry).toBe(tradeName.originCountry);
		});

		it("should throw an error if the trade name is not found", async () => {
			await expect($tradeNameService.findOne({ id: 0 })).rejects.toThrow(
				new NotFoundException("Trade name not found")
			);
		});
	});

	describe("update", () => {
		it("should update a trade name", async () => {
			const tradeName = await $tradeNameFactory.createOne({
				activeSubstance,
			});

			const updatedTradeName = await $tradeNameService.update({
				id: tradeName.id,
				name: "Updated Name",
			});

			expect(updatedTradeName).toBeDefined();
			expect(updatedTradeName.id).toBe(tradeName.id);
			expect(updatedTradeName.name).toBe("Updated Name");
			expect(updatedTradeName.description).toBe(tradeName.description);
		});

		it("should throw an error if the trade name is not found", async () => {
			await expect($tradeNameService.update({ id: 0, name: "Updated Name" })).rejects.toThrow(
				new NotFoundException("Trade name not found")
			);
		});
	});

	describe("delete", () => {
		it("should delete a trade name", async () => {
			const tradeName = await $tradeNameFactory.createOne({
				activeSubstance,
			});

			await $tradeNameService.delete({ id: tradeName.id });

			await expect($tradeNameService.findOne({ id: tradeName.id })).rejects.toThrow(
				new NotFoundException("Trade name not found")
			);
		});

		it("should throw an error if the trade name is not found", async () => {
			await expect($tradeNameService.delete({ id: 0 })).rejects.toThrow(
				new NotFoundException("Trade name not found")
			);
		});
	});
});
