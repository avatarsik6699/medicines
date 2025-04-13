import { ApiSchema, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { TradeName } from "../entities/trade-name.entity";

export namespace TradeNameDto {
	export namespace FindAll {
		@ApiSchema({
			name: "TradeNameDtoFindAllResponse",
			description: "The trade name to find all",
		})
		export class Response extends TradeName {}
	}

	export namespace FindOne {
		@ApiSchema({
			name: "TradeNameDtoFindOneParams",
			description: "The trade name to find one",
		})
		export class Params extends PickType(TradeName, ["id"]) {}

		@ApiSchema({
			name: "TradeNameDtoFindOneResponse",
			description: "The trade name to find one",
		})
		export class Response extends TradeName {}
	}

	export namespace Create {
		@ApiSchema({
			name: "TradeNameDtoCreateResponse",
			description: "The trade name to create",
		})
		export class Response extends TradeName {}

		@ApiSchema({
			name: "TradeNameDtoCreateParams",
			description: "The trade name to create",
		})
		export class Params extends PickType(TradeName, [
			"name",
			"description",
			"originCountry",
			"isOriginal",
		]) {
			activeSubstanceId: TradeName["activeSubstance"]["id"];
		}
	}

	export namespace Update {
		@ApiSchema({
			name: "TradeNameDtoUpdateResponse",
			description: "The trade name to update",
		})
		export class Response extends TradeName {}

		@ApiSchema({
			name: "TradeNameDtoUpdateParams",
			description: "The trade name to update",
		})
		export class Params extends IntersectionType(
			PickType(TradeName, ["id"]),
			PartialType(PickType(TradeName, ["name", "description", "originCountry", "isOriginal"]))
		) {
			activeSubstanceId?: TradeName["activeSubstance"]["id"];
		}
	}

	export namespace Delete {
		@ApiSchema({
			name: "TradeNameDtoDeleteParams",
			description: "The trade name to delete",
		})
		export class Params extends PickType(TradeName, ["id"]) {}
	}
}
