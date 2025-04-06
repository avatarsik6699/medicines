import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";
import { Types } from "../types";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export function NameDescriptionMixin<ClassToExtends extends Types.GenericConstructor>(
	ExtendableClass: ClassToExtends = class {} as ClassToExtends
) {
	class NameDescription extends ExtendableClass {
		@ApiProperty({
			description: "Name of the entity",
			example: "Paracetamol",
			minLength: 1,
			maxLength: 255,
		})
		@Column({ type: "varchar", length: 255, unique: true })
		@IsString()
		@IsNotEmpty()
		name: string;

		@ApiProperty({
			description: "Description of the entity",
			example: "Common pain reliever and fever reducer",
			required: false,
			nullable: true,
			minLength: 1,
			maxLength: 255,
		})
		@Column({ type: "text", nullable: true })
		@IsString()
		@IsOptional()
		description: string | null;
	}

	return NameDescription;
}
