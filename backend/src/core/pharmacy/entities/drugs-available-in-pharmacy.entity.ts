import { Drug } from "src/core/drug/entities/drug.entity";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { Entity, Column, ManyToOne, Check } from "typeorm";
import { Pharmacy } from "./pharmacy.entity";

@Entity({ name: "drugs_available_in_pharmacy" })
@Check("price_check", "price >= 0")
@Check("quantity_check", "quantity >= 0")
export class DrugsAvailableInPharmacy extends BaseMixin() {
	@Column({ type: "decimal", precision: 10, scale: 2 })
	price: number;

	@Column({ type: "int", default: 0 })
	quantity: number;

	@ManyToOne(() => Drug, ({ drugsAvailableInPharmacy }) => drugsAvailableInPharmacy)
	drug: Drug;

	@ManyToOne(() => Pharmacy, ({ drugsAvailableInPharmacy }) => drugsAvailableInPharmacy)
	pharmacy: Pharmacy;
}
