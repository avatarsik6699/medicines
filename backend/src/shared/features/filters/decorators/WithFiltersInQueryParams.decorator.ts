import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiQuery, getSchemaPath } from "@nestjs/swagger";

/**
 * Combines Swagger Decorators to create a description for `filters[name]=something`
 *  - has support for swagger
 *  - automatic transformation with nestjs
 */
export function WithFiltrsInQueryParams<FiltersFieldsDto extends object>(
	FiltersFieldsDto: new () => FiltersFieldsDto,
	fieldName: string = "filters"
) {
	return applyDecorators(
		ApiExtraModels(FiltersFieldsDto),
		ApiQuery({
			name: fieldName,
			required: false,
			explode: true,
			style: "deepObject",
			type: "object",
			description: "Filters for request",
			schema: {
				$ref: getSchemaPath(FiltersFieldsDto),
			},
		})
	);
}
