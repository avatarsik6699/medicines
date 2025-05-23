import { TypeOrmModule } from "@nestjs/typeorm";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { ActiveSubstanceService } from "../../services/active-substance.service";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";
import { PharmacologicalGroupFactory } from "../../factories/pharmacological-group.factory";
import { NotFoundException } from "@nestjs/common";

// TODO: add cases for test pharmacological group id

describe("ActiveSubstanceService", () => {
	let $module: TestingModuleFactory;
	let $service: ActiveSubstanceService;
	let $pharmacologicalGroupFactory: PharmacologicalGroupFactory;
	let $activeSubstanceFactory: ActiveSubstanceFactory;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([ActiveSubstance, PharmacologicalGroup])],
				providers: [ActiveSubstanceService, ActiveSubstanceFactory, PharmacologicalGroupFactory],
			}).initialize();

			$service = $module.getModuleRef().get(ActiveSubstanceService);
			$pharmacologicalGroupFactory = $module.getModuleRef().get(PharmacologicalGroupFactory);
			$activeSubstanceFactory = $module.getModuleRef().get(ActiveSubstanceFactory);
		} catch (error) {
			console.log(error);

			throw error;
		}
	});

	afterAll(async () => {
		await $module.destroy();
	});

	describe("create", () => {
		it("should create a new active substance", async () => {
			const pharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();

			const created = await $service.create({
				name: "Paracetamol",
				description: "Paracetamol is a pain reliever and fever reducer.",
				pharmacologicalGroupId: pharmacologicalGroup.id,
			});

			expect(created).toBeDefined();
			expect(created.name).toBe("Paracetamol");
			expect(created.description).toBe("Paracetamol is a pain reliever and fever reducer.");
			expect(created.pharmacologicalGroup).toBeDefined();
			expect(created.pharmacologicalGroup.id).toBe(pharmacologicalGroup.id);
		});

		it("should throw an error if the pharmacological group does not exist", async () => {
			await expect(
				$service.create({
					name: "Paracetamol",
					description: "Paracetamol is a pain reliever and fever reducer.",
					pharmacologicalGroupId: 0,
				})
			).rejects.toThrow(new NotFoundException("Pharmacological group not found"));
		});
	});

	describe("findAll", () => {
		it("should return all active substances", async () => {
			const pharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();
			const createdActiveSubstances = await $activeSubstanceFactory.createMany({
				count: 3,
				dataForEach: {
					pharmacologicalGroup,
				},
			});

			const activeSubstances = await $service.findAll();

			expect(activeSubstances).toBeDefined();
			expect(activeSubstances.length).toBe(createdActiveSubstances.length);
			createdActiveSubstances.forEach(item => {
				expect(activeSubstances).toContainEqual(
					expect.objectContaining({
						id: item.id,
					})
				);
			});
		});
	});

	describe("findOne", () => {
		it("should return an active substance by id", async () => {
			const pharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();
			const activeSubstance = await $activeSubstanceFactory.createOne({
				pharmacologicalGroup,
			});

			const found = await $service.findOne({ id: activeSubstance.id });

			expect(found).toBeDefined();
			expect(found.id).toBe(activeSubstance.id);
			expect(found.name).toBe(activeSubstance.name);
			expect(found.description).toBe(activeSubstance.description);
		});

		it("should throw an error if the active substance does not exist", async () => {
			await expect($service.findOne({ id: 0 })).rejects.toThrow(
				new NotFoundException("Active substance not found")
			);
		});
	});

	describe("update", () => {
		it("should update an active substance", async () => {
			const pharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();
			const updatedPharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();
			const activeSubstance = await $activeSubstanceFactory.createOne({
				pharmacologicalGroup,
			});

			const updated = await $service.update({
				id: activeSubstance.id,
				name: "Updated Name",
				description: "Updated Description",
				pharmacologicalGroupId: updatedPharmacologicalGroup.id,
			});

			expect(updated).toBeDefined();
			expect(updated.id).toBe(activeSubstance.id);
			expect(updated.name).toBe("Updated Name");
			expect(updated.description).toBe("Updated Description");
			expect(updated.pharmacologicalGroup.id).toBe(updatedPharmacologicalGroup.id);
		});

		it("should throw an error if the active substance does not exist", async () => {
			await expect($service.update({ id: 0 })).rejects.toThrow(
				new NotFoundException("Active substance not found")
			);
		});
	});

	describe("delete", () => {
		it("should delete an active substance", async () => {
			const pharmacologicalGroup = await $pharmacologicalGroupFactory.createOne();
			const activeSubstance = await $activeSubstanceFactory.createOne({
				pharmacologicalGroup,
			});

			await $service.delete({ id: activeSubstance.id });

			await expect($service.findOne({ id: activeSubstance.id })).rejects.toThrow(
				new NotFoundException("Active substance not found")
			);
		});

		it("should throw an error if the active substance does not exist", async () => {
			await expect($service.delete({ id: 0 })).rejects.toThrow(
				new NotFoundException("Active substance not found")
			);
		});
	});
});
