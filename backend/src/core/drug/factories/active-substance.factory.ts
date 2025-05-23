import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { ActiveSubstance } from "src/core/drug/entities/active-substance.entity";

@Injectable()
export class ActiveSubstanceFactory extends BaseFactory<ActiveSubstance> {
	public readonly DEFAULT_NAMES = [
		"Парацетамол",
		"Ибупрофен",
		"Амоксициллин",
		"Цетиризин",
		"Аскорбиновая кислота",
	];

	constructor(
		@InjectRepository(ActiveSubstance)
		public readonly repository: Repository<ActiveSubstance>
	) {
		super(repository);
	}

	getEntity(data: Partial<ActiveSubstance> = {}) {
		if (!data.pharmacologicalGroup) {
			throw new Error("Pharmacological group is required");
		}

		return this.repository.create({
			name: this.getRandomName(),
			description: faker.lorem.sentence(),
			...data,
		});
	}

	private getRandomName() {
		return `${faker.helpers.arrayElement(this.DEFAULT_NAMES)}-${faker.string.uuid().slice(0, 8)}`;
	}
}
