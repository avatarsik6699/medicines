import { PharmacologicalGroup } from "src/core/drug/entities/pharmacological-group.entity";
import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

@Injectable()
export class PharmacologicalGroupFactory extends BaseFactory<PharmacologicalGroup> {
	constructor(
		@InjectRepository(PharmacologicalGroup)
		public readonly repository: Repository<PharmacologicalGroup>
	) {
		super(repository);
	}

	create(data?: Partial<PharmacologicalGroup>): Promise<PharmacologicalGroup> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<PharmacologicalGroup>): Promise<PharmacologicalGroup[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<PharmacologicalGroup>) {
		return this.repository.create({
			name: faker.helpers.arrayElement([
				"Анальгетики",
				"Антибиотики",
				"Антигистаминные препараты",
				"Противовоспалительные препараты",
				"Витамины",
			]),
			description: faker.lorem.sentence(),
			...data,
		});
	}
}
