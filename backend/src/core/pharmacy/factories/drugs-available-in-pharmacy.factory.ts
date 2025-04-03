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

	create(data?: Partial<DrugsAvailableInPharmacy>): Promise<DrugsAvailableInPharmacy> {
		return this.save(this.getEntity(data));
	}

	createMany(
		count: number,
		data?: Partial<DrugsAvailableInPharmacy>
	): Promise<DrugsAvailableInPharmacy[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<DrugsAvailableInPharmacy>) {
		return this.repository.create({
			price: faker.number.int({ min: 100, max: 1000 }),
			quantity: faker.number.int({ min: 1, max: 100 }),
			...data,
		});
	}
}
