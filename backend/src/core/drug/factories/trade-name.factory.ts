import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { TradeName } from "src/core/drug/entities/trade-name.entity";

@Injectable()
export class TradeNameFactory extends BaseFactory<TradeName> {
	public readonly DEFAULT_NAMES = [
		"Парацетамол",
		"Ибупрофен",
		"Амоксициллин",
		"Цетиризин",
		"Аскорбиновая кислота",
	];

	public readonly DEFAULT_ORIGIN_COUNTRIES = [
		"Россия",
		"США",
		"Великобритания",
		"Франция",
		"Германия",
	];

	constructor(
		@InjectRepository(TradeName)
		public readonly repository: Repository<TradeName>
	) {
		super(repository);
	}

	getEntity(data?: Partial<TradeName>) {
		return this.repository.create({
			name: this.getRandomName(),
			description: faker.lorem.sentence(),
			originCountry: this.getRandomOriginCountry(),
			isOriginal: faker.helpers.arrayElement([true, false]),
			...data,
		});
	}

	private getRandomName() {
		return `${faker.helpers.arrayElement(this.DEFAULT_NAMES)}-${faker.string.uuid().slice(0, 8)}`;
	}

	private getRandomOriginCountry() {
		return faker.helpers.arrayElement(this.DEFAULT_ORIGIN_COUNTRIES);
	}
}
