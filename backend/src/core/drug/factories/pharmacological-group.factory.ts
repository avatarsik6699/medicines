import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PharmacologicalGroup } from "src/core/drug/entities/pharmacological-group.entity";
import { Repository } from "typeorm";
import { BaseFactory } from "../../../shared/factories/base.factory";

@Injectable()
export class PharmacologicalGroupFactory extends BaseFactory<PharmacologicalGroup> {
	public readonly DEFAULT_NAMES = [
		"Анальгетики",
		"Антибиотики",
		"Антигистаминные препараты",
		"Противовоспалительные препараты",
		"Витамины",
	];

	constructor(
		@InjectRepository(PharmacologicalGroup)
		public readonly repository: Repository<PharmacologicalGroup>
	) {
		super(repository);
	}

	getEntity(data: Partial<PharmacologicalGroup> = {}) {
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
