import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Types } from "../types";
import { ApiProperty } from "@nestjs/swagger";

export function BaseMixin<ClassToExtends extends Types.GenericConstructor>(
	ExtendableClass: ClassToExtends = class {} as ClassToExtends
) {
	class Base extends ExtendableClass {
		@ApiProperty({
			example: "1",
			description: "Unique identifier of the entity",
		})
		@PrimaryGeneratedColumn()
		id: number;

		@ApiProperty({
			description: "Create entity date",
			example: "2023-10-01T12:00:00Z",
			type: "string",
			format: "date-time",
		})
		@CreateDateColumn()
		createdAt: Date;

		@ApiProperty({
			description: "Update entity date",
			example: "2023-10-01T12:00:00Z",
			type: "string",
			format: "date-time",
		})
		@UpdateDateColumn()
		updatedAt: Date;
	}

	return Base;
}
