import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";
import { ApiSchema } from "@nestjs/swagger";

export namespace PharmacologicalGroupDto {
	export namespace Create {
		@ApiSchema({
			name: "PharmacologicalGroupDtoCreateParams",
			description: "The pharmacological group to create",
		})
		export class Params extends PickType(PharmacologicalGroup, ["name", "description"]) {}
		@ApiSchema({
			name: "PharmacologicalGroupDtoCreateResponse",
			description: "The pharmacological group created",
		})
		export class Response extends PharmacologicalGroup {}
	}

	export namespace Update {
		@ApiSchema({
			name: "PharmacologicalGroupDtoUpdateParams",
			description: "The pharmacological group to update",
		})
		export class Params extends IntersectionType(
			PickType(PharmacologicalGroup, ["id"]),
			PartialType(PickType(PharmacologicalGroup, ["name", "description"]))
		) {}
		@ApiSchema({
			name: "PharmacologicalGroupDtoUpdateResponse",
			description: "The pharmacological group updated",
		})
		export class Response extends PharmacologicalGroup {}
	}

	export namespace FindAll {
		@ApiSchema({
			name: "PharmacologicalGroupDtoFindAllResponse",
			description: "The pharmacological groups found",
		})
		export class Response extends PharmacologicalGroup {}
	}

	export namespace FindOne {
		@ApiSchema({
			name: "PharmacologicalGroupDtoFindOneParams",
			description: "The pharmacological group to find",
		})
		export class Params extends PickType(PharmacologicalGroup, ["id"]) {}
		@ApiSchema({
			name: "PharmacologicalGroupDtoFindOneResponse",
			description: "The pharmacological group found",
		})
		export class Response extends PharmacologicalGroup {}
	}

	export namespace Delete {
		@ApiSchema({
			name: "PharmacologicalGroupDtoDeleteParams",
			description: "The pharmacological group to delete",
		})
		export class Params extends PickType(PharmacologicalGroup, ["id"]) {}
	}
}
