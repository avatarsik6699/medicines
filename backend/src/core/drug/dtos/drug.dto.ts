import { ApiSchema, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { Drug } from "../entities/drug.entity";
import { Decorators } from "src/shared/decorators";

export namespace DrugDto {
	export namespace Create {
		@ApiSchema({
			name: "DrugDtoCreateParams",
			description: "The drug to create",
		})
		export class Params extends PickType(Drug, ["dosage"]) {
			@Decorators.Fields.Identifier()
			tradeNameId: Drug["tradeName"]["id"];
		}

		@ApiSchema({
			name: "DrugDtoCreateResponse",
			description: "The drug created",
		})
		export class Response extends Drug {}
	}

	export namespace Update {
		@ApiSchema({
			name: "DrugDtoUpdateParams",
			description: "The drug to update",
		})
		export class Params extends IntersectionType(
			PickType(Drug, ["id"]),
			PartialType(PickType(Drug, ["dosage"]))
		) {
			@Decorators.Fields.Identifier({ isOptional: true })
			tradeNameId?: Drug["tradeName"]["id"];
		}

		@ApiSchema({
			name: "DrugDtoUpdateResponse",
			description: "The drug updated",
		})
		export class Response extends Drug {}
	}

	export namespace Delete {
		@ApiSchema({
			name: "DrugDtoDeleteParams",
			description: "The drug to delete",
		})
		export class Params extends PickType(Drug, ["id"]) {}
	}

	export namespace FindAll {
		@ApiSchema({
			name: "DrugDtoFindAllResponse",
			description: "The drug to find all",
		})
		export class Response extends Drug {}
	}

	export namespace FindOne {
		@ApiSchema({
			name: "DrugDtoFindOneParams",
			description: "The drug to find one",
		})
		export class Params extends PickType(Drug, ["id"]) {}

		@ApiSchema({
			name: "DrugDtoFindOneResponse",
			description: "The drug to find one",
		})
		export class Response extends Drug {}
	}
}
