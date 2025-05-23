import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseFactory } from "../../../shared/factories/base.factory";
import { DrugsAvailableInPharmacy } from "../entities/drugs-available-in-pharmacy.entity";

@Injectable()
export class DrugsAvailableInPharmacyFactory extends BaseFactory<DrugsAvailableInPharmacy> {
	constructor(
		@InjectRepository(DrugsAvailableInPharmacy)
		public readonly repository: Repository<DrugsAvailableInPharmacy>
	) {
		super(repository);
	}

	getEntity(data: Partial<DrugsAvailableInPharmacy> = {}) {
		if (!data.pharmacy) {
			throw new Error("Pharmacy is required");
		}

		if (!data.drug) {
			throw new Error("Drug is required");
		}

		return this.repository.create({
			price: faker.number.int({ min: 100, max: 1000 }),
			quantity: faker.number.int({ min: 1, max: 100 }),
			...data,
		});
	}
}
