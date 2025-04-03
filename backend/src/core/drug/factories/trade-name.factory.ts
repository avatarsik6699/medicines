import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { TradeName } from "src/core/drug/entities/trade-name.entity";

@Injectable()
export class TradeNameFactory extends BaseFactory<TradeName> {
	constructor(
		@InjectRepository(TradeName)
		public readonly repository: Repository<TradeName>
	) {
		super(repository);
	}

	create(data?: Partial<TradeName>): Promise<TradeName> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<TradeName>): Promise<TradeName[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<TradeName>) {
		return this.repository.create({
			name: faker.helpers.arrayElement([
				"Парацетамол",
				"Ибупрофен",
				"Амоксициллин",
				"Цетиризин",
				"Аскорбиновая кислота",
			]),
			description: faker.lorem.sentence(),
			originCountry: faker.helpers.arrayElement([
				"Россия",
				"США",
				"Великобритания",
				"Франция",
				"Германия",
			]),
			isOriginal: faker.helpers.arrayElement([true, false]),
			...data,
		});
	}
}
