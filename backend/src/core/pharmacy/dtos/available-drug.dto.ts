import { IntersectionType, PickType } from "@nestjs/swagger";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { PaginationDto } from "src/shared/features/pagination/pagionation.dto";
import { Decorators } from "src/shared/decorators";
import { DrugsAvailableInPharmacy } from "../entities/drugs-available-in-pharmacy.entity";
import { AvailableDrugFiltersDto } from "./available-drug-filters.dto";
import { IsOptional, IsString } from "class-validator";

export namespace AvailableDrugDto {
	export namespace FindAll {
		// TODO: нужно заменить тем, что реально возвращается (т.к. щас реально возвращается больше полей в сервисе)
		export class ResponseItem extends PickType(DrugsAvailableInPharmacy, [
			"id",
			"price",
			"quantity",
		]) {
			@Decorators.Fields.Identifier()
			pharmacyId: Decorators.Fields.Identifier;

			@Decorators.Fields.Identifier()
			drugId: Decorators.Fields.Identifier;
		}

		@ApiSchema({
			name: "AvailableDrugDtoFindAllParams",
			description: "Find all available drugs params",
		})
		export class Params {
			@Decorators.Fields.Identifier()
			tradeNameId: Decorators.Fields.Identifier;
		}

		@ApiSchema({
			name: "AvailableDrugDtoFindAllQuery",
			description: "Find all available drugs query",
		})
		export class Query extends IntersectionType(
			PaginationDto.Query,
			AvailableDrugFiltersDto.GetPharmacyChainsList.Query,
			AvailableDrugFiltersDto.GetRegionsList.Query,
			AvailableDrugFiltersDto.GetMetroList.Query,
			AvailableDrugFiltersDto.GetDistrictsList.Query,
			AvailableDrugFiltersDto.GetDrugDosagesList.Query
		) {
			@ApiProperty({
				description: "Sort by price and distance",
				enum: ["price_asc", "price_desc", "distance_asc", "distance_desc"],
				required: false,
				default: "price_asc",
			})
			@IsOptional()
			@IsString()
			sortBy?: "price_asc" | "price_desc" | "distance_asc" | "distance_desc";
		}

		@ApiSchema({
			name: "AvailableDrugDtoFindAllResponse",
			description: "Find all available drugs response",
		})
		export class Response extends PaginationDto.Response<ResponseItem> {}
	}
}
