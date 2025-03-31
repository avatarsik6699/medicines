import { applyDecorators, Type } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { plainToInstance, Transform } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

export function TransformJsonToClass(DtoClass: Type<unknown>) {
	return applyDecorators(
		ApiPropertyOptional({ type: DtoClass }),
		IsOptional(),
		ValidateNested(),
		// TransformType(() => DtoClass),
		Transform(({ value }) => {
			// Если значение - строка JSON, пробуем распарсить
			if (typeof value === "string") {
				try {
					const parsedValue = JSON.parse(value);

					return plainToInstance(DtoClass, parsedValue);
				} catch {
					return value;
				}
			}

			return value;
		})
	);
}
