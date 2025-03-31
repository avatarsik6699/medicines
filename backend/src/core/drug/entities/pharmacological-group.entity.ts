import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Entity, OneToMany } from "typeorm";
import { ActiveSubstance } from "./active-substance.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "pharmacological_groups" })
export class PharmacologicalGroup extends NameDescriptionMixin(BaseMixin()) {
	@ApiProperty({
		description: "Active substances related to the farm. group",
		type: () => [ActiveSubstance],
	})
	@OneToMany(() => ActiveSubstance, ({ pharmacologicalGroup }) => pharmacologicalGroup)
	activeSubstances: ActiveSubstance[];
}
