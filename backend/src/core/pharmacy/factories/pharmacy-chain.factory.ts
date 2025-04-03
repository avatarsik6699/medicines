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

	create(data?: Partial<PharmacyChain>): Promise<PharmacyChain> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<PharmacyChain>): Promise<PharmacyChain[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<PharmacyChain>) {
		return this.repository.create({
			name: faker.company.name(),
			description: faker.lorem.sentence(),
			websiteLink: faker.internet.url(),
			logoLink: faker.image.url(),
			...data,
		});
	}
}
