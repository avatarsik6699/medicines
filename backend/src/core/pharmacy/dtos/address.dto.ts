import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class AddressDto {
	@IsString()
	@ApiProperty({
		description: "Street name",
		example: "Lenina",
		required: true,
	})
	street: string;

	@IsString()
	@ApiProperty({
		description: "District name",
		example: "Tverskoy",
		required: true,
	})
	district: string;

	@IsString()
	@ApiProperty({
		description: "Region or state name",
		example: "Moscow Oblast",
		required: true,
	})
	region: string;

	@IsString()
	@ApiProperty({
		description: "The nearest metro",
		example: "Vosstanie",
		nullable: true,
	})
	metro: string | null;

	@IsString()
	@ApiProperty({
		description: "Postal code",
		example: "123456",
		nullable: true,
	})
	postalCode: string | null;

	@IsNumber()
	@Min(-90)
	@Max(90)
	@ApiProperty({
		description: "Latitude coordinate",
		example: 55.7558,
		minimum: -90,
		maximum: 90,
		required: true,
	})
	latitude: number;

	@IsNumber()
	@Min(-180)
	@Max(180)
	@ApiProperty({
		description: "Longitude coordinate",
		example: 37.6173,
		minimum: -180,
		maximum: 180,
		required: true,
	})
	longitude: number;
}
