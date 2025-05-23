import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Types } from "../../types";
import { Type } from "class-transformer";
import { LIMIT_SIZES } from "../../constants";
export namespace PaginationDto {
	export class Query {
		@ApiPropertyOptional({
			description: "Current page number",
			example: 1,
			minimum: 1,
			default: 1,
		})
		@Type(() => Number)
		@IsInt()
		@Min(1)
		@IsOptional()
		readonly page?: number = 1;

		@ApiPropertyOptional({
			description: "Number of items per page",
			example: 10,
			minimum: 1,
			maximum: 100,
			default: 10,
		})
		@Type(() => Number)
		@IsInt()
		@Min(1)
		@Max(100)
		@IsOptional()
		readonly limit: number = LIMIT_SIZES.MEDIUM;
	}

	export class Response<Items extends Types.GenericObject> {
		items: Items[];
		total: number;
		page: number;
		limit: number;
	}
}
