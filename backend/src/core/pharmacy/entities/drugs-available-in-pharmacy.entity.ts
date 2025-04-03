import { ApiProperty } from "@nestjs/swagger";
import { Drug } from "src/core/drug/entities/drug.entity";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { Entity, Column, ManyToOne } from "typeorm";
import { Pharmacy } from "./pharmacy.entity";

@Entity({ name: "drugs_available_in_pharmacy" })
export class DrugsAvailableInPharmacy extends BaseMixin() {
	@ApiProperty({
		description: "Price of the drug in this pharmacy",
		example: 15.99,
		type: "number",
		minimum: 0,
	})
	@Column({ type: "decimal", precision: 10, scale: 2 })
	price: number;

	@ApiProperty({
		description: "Quantity of the drug available in this pharmacy",
		example: 100,
		type: "number",
		minimum: 0,
	})
	@Column({ type: "int" })
	quantity: number;

	@ApiProperty({
		type: () => Drug,
		description: "Drug available in the pharmacy",
		example: {
			id: "1",
			name: "Paracetamol",
			dosage: "500mg",
		},
	})
	@ManyToOne(() => Drug, ({ drugsAvailableInPharmacy }) => drugsAvailableInPharmacy)
	drug: Drug;

	@ApiProperty({
		type: () => Pharmacy,
		description: "Pharmacy where the drug is available",
		example: {
			id: "1",
			name: "City Pharmacy",
		},
	})
	@ManyToOne(() => Pharmacy, ({ drugsAvailableInPharmacy }) => drugsAvailableInPharmacy)
	pharmacy: Pharmacy;
}
