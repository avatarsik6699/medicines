import { ApiProperty, ApiSchema, PickType } from "@nestjs/swagger";
import { PharmacyChain } from "../entities/pharmacy-chain.entity";
import { Decorators } from "src/shared/decorators";
import { IsOptional, IsString } from "class-validator";

export namespace AvailableDrugFiltersDto {
	export namespace GetPharmacyChainsList {
		class ResponseItemDto extends PickType(PharmacyChain, ["name"]) {
			@Decorators.Fields.Identifier()
			id: Decorators.Fields.Identifier;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetPharmacyChainsListQuery",
			description: "Get pharmacy chains list",
		})
		export class Query {
			@Decorators.Fields.Identifier({ isOptional: true })
			pharmacyChainId?: Decorators.Fields.Identifier;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetPharmacyChainsListResponse",
			description: "Get pharmacy chains list",
		})
		export class Response {
			@ApiProperty({
				type: [ResponseItemDto],
				description: "Pharmacy chains list",
			})
			items: ResponseItemDto[];

			@ApiProperty({
				type: Number,
				description: "Total number of items",
			})
			total: number;
		}
	}

	export namespace GetRegionsList {
		export class ResponseItemDto {
			@ApiProperty({
				type: String,
				description: "Region name",
			})
			name: string;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetRegionsListQuery",
			description: "Get regions list by name",
		})
		export class Query {
			@ApiProperty({
				type: String,
				description: "The name of the region",
			})
			@IsOptional()
			@IsString()
			regionName?: ResponseItemDto["name"];
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetRegionsListResponse",
			description: "Get regions list",
		})
		export class Response {
			@ApiProperty({ type: [ResponseItemDto], description: "Regions list" })
			items: ResponseItemDto[];

			@ApiProperty({ type: Number, description: "Total number of items" })
			total: number;
		}
	}

	export namespace GetMetroList {
		export class ResponseItemDto {
			@ApiProperty({ type: String, description: "Metro name" })
			name: string;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetMetroListQuery",
			description: "Get metro list by name",
		})
		export class Query {
			@ApiProperty({
				type: String,
				description: "The name of the metro",
			})
			@IsOptional()
			@IsString()
			metroName?: ResponseItemDto["name"];
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetMetroListResponse",
			description: "Get metro list",
		})
		export class Response {
			@ApiProperty({ type: [ResponseItemDto], description: "Metro list" })
			items: ResponseItemDto[];

			@ApiProperty({ type: Number, description: "Total number of items" })
			total: number;
		}
	}

	export namespace GetDistrictsList {
		export class ResponseItemDto {
			@ApiProperty({ type: String, description: "District name" })
			name: string;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetDistrictsListQuery",
			description: "Get districts list by name",
		})
		export class Query {
			@ApiProperty({ type: String, description: "The name of the district" })
			@IsOptional()
			@IsString()
			districtName?: ResponseItemDto["name"];
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetDistrictsListResponse",
			description: "Get districts list",
		})
		export class Response {
			@ApiProperty({ type: [ResponseItemDto], description: "Districts list" })
			items: ResponseItemDto[];

			@ApiProperty({ type: Number, description: "Total number of items" })
			total: number;
		}
	}

	export namespace GetDrugDosagesList {
		export class ResponseItemDto {
			@ApiProperty({ type: String, description: "Drug dosage name" })
			name: string;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetDrugDosagesListParams",
			description: "Get drug dosages list params",
		})
		export class Params {
			@Decorators.Fields.Identifier()
			tradeNameId: Decorators.Fields.Identifier;
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetDrugDosagesListQuery",
			description: "Get drug dosages list query",
		})
		export class Query {
			@ApiProperty({ type: String, description: "The name of the dosage" })
			@IsOptional()
			@IsString()
			dosage?: ResponseItemDto["name"];
		}

		@ApiSchema({
			name: "AvailableDrugFiltersDtoGetDrugDosagesListResponse",
			description: "Get drug dosages list response",
		})
		export class Response {
			@ApiProperty({ type: [ResponseItemDto], description: "Drug dosages list" })
			items: ResponseItemDto[];

			@ApiProperty({ type: Number, description: "Total number of items" })
			total: number;
		}
	}
}
