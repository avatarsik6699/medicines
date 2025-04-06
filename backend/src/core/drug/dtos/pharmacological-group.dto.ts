import { IntersectionType, PartialType, PickType } from "@nestjs/mapped-types";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";

export namespace PharmacologicalGroupDto {
	export namespace Create {
		export class Params extends PickType(PharmacologicalGroup, ["name", "description"]) {}
		export class Response extends PharmacologicalGroup {}
	}

	export namespace Update {
		export class Response extends PharmacologicalGroup {}
		export class Params extends IntersectionType(
			PickType(PharmacologicalGroup, ["id"]),
			PartialType(PickType(PharmacologicalGroup, ["name", "description"]))
		) {}
	}

	export namespace FindAll {
		export class Response extends PharmacologicalGroup {}
	}

	export namespace FindOne {
		export class Params extends PickType(PharmacologicalGroup, ["id"]) {}
		export class Response extends PharmacologicalGroup {}
	}

	export namespace Delete {
		export class Params extends PickType(PharmacologicalGroup, ["id"]) {}
	}
}
