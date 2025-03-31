import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetadataDto {
	@ApiProperty({ description: "Current page number", example: 1 })
	readonly page: number;

	@ApiProperty({ description: "Number of items per page", example: 10 })
	readonly limit: number;

	@ApiProperty({ description: "Total number of items", example: 100 })
	readonly totalItemsCount: number;

	@ApiProperty({ description: "Total number of pages", example: 10 })
	readonly totalPagesCount: number;

	@ApiProperty({ description: "Total number of pages", example: true })
	readonly hasPreviousPage: boolean;

	@ApiProperty()
	readonly hasNextPage: boolean;

	constructor(args: { page: number; limit: number; totalItemsCount: number }) {
		this.page = args.page;
		this.limit = args.limit;
		this.totalItemsCount = args.totalItemsCount;

		this.totalPagesCount = Math.ceil(args.totalItemsCount / args.limit);
		this.hasNextPage = args.page < this.totalPagesCount;
		this.hasPreviousPage = args.page > 1;
	}
}
