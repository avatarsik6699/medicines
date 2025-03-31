import { ApiProperty } from "@nestjs/swagger";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { TradeName } from "./trade-name.entity";

@Entity({ name: "drugs" })
@Unique("UQ_DRUG_TRADENAME_DOSAGE", ["tradeName", "dosage"])
export class Drug extends NameDescriptionMixin(BaseMixin()) {
	@ApiProperty({
		description: "Dosage of the drug (e.g., 500mg, 100ml)",
		example: "500mg",
		minLength: 1,
		maxLength: 120,
	})
	@Column({ type: "varchar", length: 120 })
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
}
