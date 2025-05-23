import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseFactory } from "../../../shared/factories/base.factory";
import { PharmacyChain } from "../entities/pharmacy-chain.entity";

@Injectable()
export class PharmacyChainFactory extends BaseFactory<PharmacyChain> {
	constructor(
		@InjectRepository(PharmacyChain)
		public readonly repository: Repository<PharmacyChain>
	) {
		super(repository);
	}

	getEntity(data: Partial<PharmacyChain> = {}) {
		return this.repository.create({
			name: faker.company.name(),
			description: faker.lorem.sentence(),
			websiteLink: faker.internet.url(),
			logoLink: faker.image.url(),
			...data,
		});
	}
}
