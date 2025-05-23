import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";
type Options = {
	isOptional?: boolean;
};

export function Identifier(options: Options = {}) {
	const { isOptional = false } = options;

	return function (target: object, propertyKey: string) {
		ApiProperty({
			description: `The identifier of the ${target.constructor.name}`,
			example: 1,
			type: Number,
			required: !isOptional,
		})(target, propertyKey);

		Type(() => Number)(target, propertyKey);

		IsNumber()(target, propertyKey);

		if (isOptional) {
			IsOptional()(target, propertyKey);
		} else {
			IsNotEmpty()(target, propertyKey);
		}
	};
}
