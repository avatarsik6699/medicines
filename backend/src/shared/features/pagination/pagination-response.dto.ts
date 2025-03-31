import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationMetadataDto } from "./pagination-metadata.dto";

export function createPaginationResponseDto<ListItem extends object>(ListItem: new () => ListItem) {
	class PaginationResponseDto {
		@ApiProperty({
			type: [ListItem],
			description: `list of ${ListItem.name} items`,
		})
		@IsArray()
		readonly data: ListItem[];

		@ApiProperty({ type: PaginationMetadataDto })
		readonly meta: PaginationMetadataDto;

		constructor(data: ListItem[], meta: ConstructorParameters<typeof PaginationMetadataDto>[0]) {
			this.data = data;
			this.meta = new PaginationMetadataDto(meta);
		}
	}

	return PaginationResponseDto;
}
