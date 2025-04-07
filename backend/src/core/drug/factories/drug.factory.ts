import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Drug } from "src/core/drug/entities/drug.entity";

@Injectable()
export class DrugFactory extends BaseFactory<Drug> {
	public readonly DEFAULT_DOSAGES = ["100mg", "200mg", "300mg", "400mg", "500mg"];

	get randomUniqueDosages() {
		const rawDosages = faker.helpers.arrayElements(this.DEFAULT_DOSAGES);

		return faker.helpers.uniqueArray(rawDosages, rawDosages.length);
	}

	constructor(
		@InjectRepository(Drug)
		public readonly repository: Repository<Drug>
	) {
		super(repository);
	}

	getEntity(data?: Partial<Drug>) {
		return this.repository.create({
			dosage: this.getRandomDosage(),
			...data,
		});
	}

	private getRandomDosage() {
		return faker.helpers.arrayElement(this.DEFAULT_DOSAGES);
	}
}
