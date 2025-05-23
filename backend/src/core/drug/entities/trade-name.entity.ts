import { ApiProperty } from "@nestjs/swagger";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Drug } from "./drug.entity";
import { ActiveSubstance } from "./active-substance.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity({ name: "trade_names" })
export class TradeName extends NameDescriptionMixin(BaseMixin()) {
	// TODO: need take from country table
	@ApiProperty({ description: "Country of origin for the drug" })
	@Column({ type: "varchar", length: 255 })
	@IsString()
	@IsNotEmpty()
	originCountry: string;

	@ApiProperty({ description: "Is the drug with trade name original", default: null })
	@Column({ type: "bool", nullable: true })
	isOriginal: boolean | null;

	@ApiProperty({ type: () => [Drug] })
	@OneToMany(() => Drug, ({ tradeName }) => tradeName)
	drugs: Drug[];

	@ApiProperty({ type: () => ActiveSubstance })
	@ManyToOne(() => ActiveSubstance, ({ tradeNames }) => tradeNames)
	activeSubstance: ActiveSubstance;
}
