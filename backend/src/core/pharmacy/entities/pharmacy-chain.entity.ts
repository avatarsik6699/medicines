import { Decorators } from "src/shared/decorators";
import { BaseMixin } from "src/shared/mixins/base.mixin";
import { NameDescriptionMixin } from "src/shared/mixins/name-description.mixin";
import { Types } from "src/shared/types";
import { Entity, OneToMany } from "typeorm";
import { Pharmacy } from "./pharmacy.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "pharmacy_chains" })
export class PharmacyChain extends NameDescriptionMixin(BaseMixin()) {
	@Decorators.Database.Column.Link({ description: "logo link" })
	logoLink: Types.Data.Link;

	@Decorators.Database.Column.Link({ description: "website link" })
	websiteLink: Types.Data.Link;

	@OneToMany(() => Pharmacy, ({ pharmacyChain }) => pharmacyChain)
	pharmacies: Pharmacy[];
}
