import { ApiPropertyOptional } from "@nestjs/swagger";
import { Column } from "typeorm";

export function LinkColumn(
	options: {
		description?: string;
		nullable?: boolean;
		length?: number;
		type?: "string" | "text"; // Расширяем поддержку типов
	} = {}
) {
	const { description = "", nullable = true, length = 255, type = "string" } = options;

	return function (target: object, propertyKey: string) {
		ApiPropertyOptional({
			nullable,
			type: type === "text" ? "string" : type,
			description,
		})(target, propertyKey);

		Column({
			type: type === "text" ? "text" : "varchar",
			nullable,
			length: type === "text" ? undefined : length,
		})(target, propertyKey);
	};
}
