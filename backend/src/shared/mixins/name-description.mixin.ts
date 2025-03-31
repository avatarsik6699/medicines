import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";
import { Types } from "../types";

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
		@Column({ type: "varchar", length: 255 })
		name: string;

		@ApiProperty({
			description: "Description of the entity",
			example: "Common pain reliever and fever reducer",
			required: false,
			nullable: true,
		})
		@Column({ type: "text" })
		description: string;
	}

	return NameDescription;
}
