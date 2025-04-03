import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class ContactDto {
	@IsString()
	@IsPhoneNumber()
	@ApiProperty({
		description: "Phone number of the pharmacy",
		example: "+79123456789",
		required: true,
	})
	phone: string;

	@IsString()
	@IsEmail()
	@IsOptional()
	@ApiPropertyOptional({
		description: "Email address of the pharmacy",
		example: "pharmacy@example.com",
	})
	email?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({
		description: "WhatsApp number of the pharmacy",
		example: "+79123456789",
		required: false,
	})
	whatsapp?: string;
}
