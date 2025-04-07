import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Pharmacy } from "../entities/pharmacy.entity";
import { plainToClass } from "class-transformer";
import { AddressDto } from "../dtos/address.dto";
import { ContactDto } from "../dtos/contact.dto";
import { WorkingHoursDto } from "../dtos/woking-hours.dto";

@Injectable()
export class PharmacyFactory extends BaseFactory<Pharmacy> {
	constructor(
		@InjectRepository(Pharmacy)
		public readonly repository: Repository<Pharmacy>
	) {
		super(repository);
	}

	getEntity(data?: Partial<Pharmacy>) {
		return this.repository.create({
			name: faker.company.name(),
			description: faker.lorem.sentence(),
			address: this.getRandomAddress(),
			contact: this.getRandomContact(),
			workingHours: this.getRandomWorkingHours(),
			...data,
		});
	}

	private getRandomWorkingHours() {
		return Array.from({ length: 6 }).map((_, dayOfWeek) => {
			return plainToClass(WorkingHoursDto, {
				dayOfWeek,
				openTime: faker.date.recent().toISOString(),
				closeTime: faker.date.recent().toISOString(),
				is24Hours: faker.helpers.arrayElement([true, false]),
			} satisfies WorkingHoursDto);
		});
	}

	private getRandomContact() {
		return plainToClass(ContactDto, {
			phone: faker.phone.number(),
			email: faker.internet.email(),
			whatsapp: faker.phone.number(),
		} satisfies ContactDto);
	}

	private getRandomAddress() {
		return plainToClass(AddressDto, {
			region: faker.location.country(),
			city: faker.location.city(),
			street: faker.location.streetAddress(),
			metro: faker.location.state(),
			postalCode: faker.location.zipCode(),
			latitude: faker.location.latitude(),
			longitude: faker.location.longitude(),
		} satisfies AddressDto);
	}
}
