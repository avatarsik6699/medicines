import { ApiProperty } from "@nestjs/swagger";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { PharmacologicalGroup } from "./pharmacological-group.entity";
import { TradeName } from "./trade-name.entity";

@Entity({ name: "active_substances" })
export class ActiveSubstance extends NameDescriptionMixin(BaseMixin()) {
	@ApiProperty({
		type: () => PharmacologicalGroup,
		description: "Pharmacological group of the active substance",
		example: {
			id: "1",
			name: "Analgesics",
			description: "Pain relief medications",
		},
	})
	@ManyToOne(() => PharmacologicalGroup, ({ activeSubstances }) => activeSubstances)
	pharmacologicalGroup: PharmacologicalGroup;

	@ApiProperty({
		type: () => [TradeName],
		description: "Trade names containing this active substance",
		example: [
			{
				id: "1",
				name: "Paracetamol",
				description: "Pain relief medications",
			},
		],
	})
	@OneToMany(() => TradeName, ({ activeSubstance }) => activeSubstance)
	tradeNames: TradeName[];
}
