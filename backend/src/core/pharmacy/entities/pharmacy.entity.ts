import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AddressDto } from "../dto/address.dto";
import { ContactDto } from "../dto/contact.dto";
import { PharmacyChain } from "./pharmacy-chain.entity";
import { WorkingHoursDto } from "../dto/woking-hours.dto";
import { DrugsAvailableInPharmacy } from "./drugs-available-in-pharmacy.entity";

@Entity({ name: "pharmacies" })
export class Pharmacy extends NameDescriptionMixin(BaseMixin()) {
	@ApiProperty({
		type: AddressDto,
		description: "Адрес аптеки",
		example: {
			street: "Новочеркасский пр., 17",
			city: "Санкт-Петербург",
			region: "Ленинградская область",
			postalCode: "190000",
			latitude: 59.9311,
			longitude: 30.3609,
		},
	})
	@Column("jsonb")
	@ValidateNested()
	@Type(() => AddressDto)
	address: AddressDto;

	@ApiProperty({
		type: ContactDto,
		description: "Контактная информация",
		example: {
			phone: "+7 (999) 123-45-67",
			email: "pharmacy@example.com",
			whatsapp: "+7 (999) 123-45-67",
		},
	})
	@Column("jsonb")
	@ValidateNested()
	@Type(() => ContactDto)
	contact: ContactDto;

	@ApiProperty({
		type: [WorkingHoursDto],
		description: "Режим работы",
		example: [
			{
				dayOfWeek: 1,
				openTime: "09:00",
				closeTime: "18:00",
				is24Hours: false,
			},
			{
				dayOfWeek: 2,
				openTime: "09:00",
				closeTime: "18:00",
				is24Hours: false,
			},
		],
	})
	@Column("jsonb")
	@ValidateNested({ each: true })
	@Type(() => WorkingHoursDto)
	workingHours: WorkingHoursDto[];

	@ApiProperty({
		type: () => [Pharmacy],
	})
	@ManyToOne(() => PharmacyChain, ({ pharmacies }) => pharmacies)
	pharmacyChain: PharmacyChain;

	@ApiProperty({
		type: () => [DrugsAvailableInPharmacy],
		description: "List of drugs available in this pharmacy",
	})
	@OneToMany(() => DrugsAvailableInPharmacy, ({ pharmacy }) => pharmacy)
	drugsAvailableInPharmacy: DrugsAvailableInPharmacy[];
}
