import { IntersectionType, PartialType, PickType } from "@nestjs/mapped-types";
import { ActiveSubstance } from "../entities/active-substance.entity";
import { ApiSchema } from "@nestjs/swagger";

export namespace ActiveSubstanceDto {
	export namespace Create {
		@ApiSchema({
			name: "ActiveSubstanceDtoCreateParams",
			description: "The active substance to create",
		})
		export class Params extends PickType(ActiveSubstance, ["name", "description"]) {
			pharmacologicalGroupId: ActiveSubstance["pharmacologicalGroup"]["id"];
		}

		@ApiSchema({
			name: "ActiveSubstanceDtoCreateResponse",
			description: "The active substance created",
		})
		export class Response extends ActiveSubstance {}
	}

	export namespace FindAll {
		@ApiSchema({
			name: "ActiveSubstanceDtoFindAllResponse",
			description: "The active substances found",
		})
		export class Response extends ActiveSubstance {}
	}

	export namespace FindOne {
		@ApiSchema({
			name: "ActiveSubstanceDtoFindOneParams",
			description: "The active substance to find",
		})
		export class Params extends PickType(ActiveSubstance, ["id"]) {}

		@ApiSchema({
			name: "ActiveSubstanceDtoFindOneResponse",
			description: "The active substance found",
		})
		export class Response extends ActiveSubstance {}
	}

	export namespace Update {
		@ApiSchema({
			name: "ActiveSubstanceDtoUpdateParams",
			description: "The active substance to update",
		})
		export class Params extends IntersectionType(
			PickType(ActiveSubstance, ["id"]),
			PartialType(PickType(ActiveSubstance, ["name", "description"]))
		) {
			pharmacologicalGroupId?: ActiveSubstance["pharmacologicalGroup"]["id"];
		}

		@ApiSchema({
			name: "ActiveSubstanceDtoUpdateResponse",
			description: "The active substance updated",
		})
		export class Response extends ActiveSubstance {}
	}

	export namespace Delete {
		@ApiSchema({
			name: "ActiveSubstanceDtoDeleteParams",
			description: "The active substance to delete",
		})
		export class Params extends PickType(ActiveSubstance, ["id"]) {}
	}
}
