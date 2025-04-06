import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, Matches, Max, Min } from "class-validator";

export class WorkingHoursDto {
	@IsNumber()
	@Min(0)
	@Max(6)
	@ApiProperty({
		description: "Day of the week (0-6, where 0 is Sunday)",
		example: 1,
		minimum: 0,
		maximum: 6,
		required: true,
	})
	dayOfWeek: number;

	@IsString()
	@Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
	@ApiProperty({
		description: "Opening time in 24-hour format (HH:MM)",
		example: "09:00",
		pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
		required: true,
	})
	openTime: string;

	@IsString()
	@Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
	@ApiProperty({
		description: "Closing time in 24-hour format (HH:MM)",
		example: "18:00",
		pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
		required: true,
	})
	closeTime: string;

	@IsBoolean()
	@ApiProperty({
		description: "Indicates if the pharmacy is open 24 hours",
		example: false,
		required: true,
	})
	is24Hours: boolean;
}
