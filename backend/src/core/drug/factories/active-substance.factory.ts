import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { ActiveSubstance } from "src/core/drug/entities/active-substance.entity";

@Injectable()
export class ActiveSubstanceFactory extends BaseFactory<ActiveSubstance> {
	constructor(
		@InjectRepository(ActiveSubstance)
		public readonly repository: Repository<ActiveSubstance>
	) {
		super(repository);
	}

	create(data?: Partial<ActiveSubstance>): Promise<ActiveSubstance> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<ActiveSubstance>): Promise<ActiveSubstance[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<ActiveSubstance>) {
		return this.repository.create({
			name: faker.helpers.arrayElement([
				"Парацетамол",
				"Ибупрофен",
				"Амоксициллин",
				"Цетиризин",
				"Аскорбиновая кислота",
			]),
			description: faker.lorem.sentence(),
			...data,
		});
	}
}
