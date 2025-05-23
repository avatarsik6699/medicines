import { ApiProperty, ApiSchema, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { TradeName } from "../entities/trade-name.entity";
import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsString } from "class-validator";
import { PaginationDto } from "src/shared/features/pagination/pagionation.dto";

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
			@ApiProperty({
				description: "The active substance id",
				example: 1,
				type: Number,
			})
			@IsNotEmpty()
			@IsNumber()
			activeSubstanceId: TradeName["activeSubstance"]["id"];

			@ApiProperty({
				description: "Is the drug with trade name original",
				example: true,
				type: Boolean,
			})
			@IsOptional()
			@IsBoolean()
			isOriginal: boolean | null = null;
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
			@ApiProperty({
				description: "The active substance id",
				example: 1,
				type: Number,
				required: false,
			})
			@IsOptional()
			@IsNumber()
			activeSubstanceId?: TradeName["activeSubstance"]["id"];

			@ApiProperty({
				description: "Is the drug with trade name original",
				example: true,
				type: Boolean,
			})
			@IsBoolean()
			@IsOptional()
			isOriginal?: boolean | null = null;
		}
	}

	export namespace Delete {
		@ApiSchema({
			name: "TradeNameDtoDeleteParams",
			description: "The trade name to delete",
		})
		export class Params extends PickType(TradeName, ["id"]) {}
	}

	export namespace GetTradeNameSuggestions {
		@ApiSchema({
			name: "TradeNameDtoGetTradeNameSuggestionsQuery",
			description: "The trade name to get suggestions",
		})
		export class Query extends PaginationDto.Query {}

		@ApiSchema({
			name: "TradeNameDtoGetTradeNameSuggestionsParams",
			description: "The trade name to get suggestions",
		})
		export class Params {
			@ApiProperty({
				description: "The trade name to get suggestions",
				example: "Paracetamol",
				type: String,
			})
			@IsNotEmpty()
			@IsString()
			tradeName: TradeName["name"];
		}

		@ApiSchema({
			name: "TradeNameDtoGetTradeNameSuggestionsResponse",
			description: "The trade name to get suggestions",
		})
		export class Response extends PaginationDto.Response<TradeName> {}
	}
}
