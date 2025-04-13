import { TypeOrmModule } from "@nestjs/typeorm";
import { TestingModuleFactory } from "src/shared/tests/testing-module.factory";
import { ActiveSubstanceFactory } from "../../factories/active-substance.factory";
import { ActiveSubstance } from "../../entities/active-substance.entity";
import { ActiveSubstanceService } from "../../services/active-substance.service";
import { PharmacologicalGroup } from "../../entities/pharmacological-group.entity";

describe("ActiveSubstanceService", () => {
	let $module: TestingModuleFactory;
	let $service: ActiveSubstanceService;

	beforeAll(async () => {
		try {
			$module = await TestingModuleFactory.create({
				imports: [TypeOrmModule.forFeature([ActiveSubstance, PharmacologicalGroup])],
				providers: [ActiveSubstanceService, ActiveSubstanceFactory],
			}).initialize();

			$service = $module.getModuleRef().get(ActiveSubstanceService);
		} catch (error) {
			console.log(error);

			throw error;
		}
	});

	afterAll(async () => {
		await $module.destroy();
	});
});
