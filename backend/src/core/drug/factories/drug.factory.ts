import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Drug } from "src/core/drug/entities/drug.entity";

@Injectable()
export class DrugFactory extends BaseFactory<Drug> {
	constructor(
		@InjectRepository(Drug)
		public readonly repository: Repository<Drug>
	) {
		super(repository);
	}

	create(data?: Partial<Drug>): Promise<Drug> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<Drug>): Promise<Drug[]> {
		return this.saveMany(
			faker.helpers.arrayElements(["100mg", "200mg", "300mg", "400mg", "500mg"]).map(dosage =>
				this.getEntity({
					...data,
					dosage,
				})
			)
		);
	}

	private getEntity(data?: Partial<Drug>) {
		return this.repository.create({
			name: faker.helpers.arrayElement([
				"Парацетамол",
				"Ибупрофен",
				"Амоксициллин",
				"Цетиризин",
				"Аскорбиновая кислота",
				"Рибоксин",
				"Цианокобаламин",
				"Лазолван",
				"Рибоксин",
				"Цианокобаламин",
				"Лазолван",
			]),
			description: faker.lorem.sentence(),
			...data,
		});
	}
}
