import { BaseFactory } from "../../../shared/factories/base.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Pharmacy } from "../entities/pharmacy.entity";
import { plainToClass } from "class-transformer";
import { AddressDto } from "../dto/address.dto";
import { ContactDto } from "../dto/contact.dto";
import { WorkingHoursDto } from "../dto/woking-hours.dto";

@Injectable()
export class PharmacyFactory extends BaseFactory<Pharmacy> {
	constructor(
		@InjectRepository(Pharmacy)
		public readonly repository: Repository<Pharmacy>
	) {
		super(repository);
	}

	create(data?: Partial<Pharmacy>): Promise<Pharmacy> {
		return this.save(this.getEntity(data));
	}

	createMany(count: number, data?: Partial<Pharmacy>): Promise<Pharmacy[]> {
		return this.saveMany(Array.from({ length: count }).map(() => this.getEntity(data)));
	}

	private getEntity(data?: Partial<Pharmacy>) {
		return this.repository.create({
			name: faker.company.name(),
			description: faker.lorem.sentence(),
			address: plainToClass(AddressDto, {
				region: faker.location.country(),
				city: faker.location.city(),
				street: faker.location.streetAddress(),
				metro: faker.location.state(),
				postalCode: faker.location.zipCode(),
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude(),
			} satisfies AddressDto),
			contact: plainToClass(ContactDto, {
				phone: faker.phone.number(),
				email: faker.internet.email(),
				whatsapp: faker.phone.number(),
			} satisfies ContactDto),
			workingHours: Array.from({ length: 6 }).map((_, dayOfWeek) =>
				plainToClass(WorkingHoursDto, {
					dayOfWeek,
					openTime: faker.date.recent().toISOString(),
					closeTime: faker.date.recent().toISOString(),
					is24Hours: faker.helpers.arrayElement([true, false]),
				} satisfies WorkingHoursDto)
			),
			...data,
		});
	}
}
