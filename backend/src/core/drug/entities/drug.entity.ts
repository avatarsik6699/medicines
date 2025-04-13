import { ApiProperty } from "@nestjs/swagger";
import { DrugsAvailableInPharmacy } from "src/core/pharmacy/entities/drugs-available-in-pharmacy.entity";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { TradeName } from "./trade-name.entity";
import { IsNotEmpty, IsString } from "class-validator";
@Entity({ name: "drugs" })
@Unique("UQ_DRUG_TRADENAME_DOSAGE", ["tradeName", "dosage"])
export class Drug extends BaseMixin() {
	@ApiProperty({
		description: "Dosage of the drug (e.g., 500mg, 100ml)",
		example: "500mg",
		minLength: 1,
		maxLength: 120,
	})
	@Column({ type: "varchar", length: 120 })
	@IsNotEmpty()
	@IsString()
	dosage: string;

	@ApiProperty({
		type: () => TradeName,
		description: "Trade name of the drug",
		example: {
			id: "1",
			name: "Paracetamol",
			description: "Common pain reliever",
		},
	})
	@ManyToOne(() => TradeName, ({ drugs }) => drugs)
	tradeName: TradeName;

	@ApiProperty({
		type: () => [DrugsAvailableInPharmacy],
		description: "List of pharmacies where this drug is available",
	})
	@OneToMany(() => DrugsAvailableInPharmacy, ({ drug }) => drug)
	drugsAvailableInPharmacy: DrugsAvailableInPharmacy[];
}
