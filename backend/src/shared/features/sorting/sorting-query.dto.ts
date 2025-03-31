import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsOptional, IsString, Matches } from "class-validator";

export function createSortingDto<Entity extends object>(entity: new () => Entity) {
	const sortEnum = Object.keys(new entity()).flatMap(key =>
		["asc", "desc"].map(order => `${key}:${order}`)
	);

	class SortingDto {
		@ApiProperty({
			description: 'Sort by property and order. Format: "property:order".',
			example: ["name:asc", "price:desc"],
			required: false,
			isArray: true,
			enum: sortEnum,
		})
		@IsOptional()
		@Transform(({ value }: { value: string | undefined | string[] }) => {
			return typeof value === "string" ? [value] : value;
		})
		@IsArray() // Должно быть массивом после преобразования
		@ArrayNotEmpty() // Массив не должен быть пустым (если передан)
		@IsString({ each: true }) // Каждый элемент массива должен быть строкой
		@Matches(
			new RegExp(`^(${Object.keys(new entity()).join("|")}):(asc|desc)$`), // Регулярное выражение для проверки формата
			{ each: true } // Применяем к каждому элементу массива
		)
		sort?: string[];
	}

	return SortingDto;
}
