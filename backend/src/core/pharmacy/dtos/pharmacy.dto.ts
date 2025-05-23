import { ApiSchema } from "@nestjs/swagger";
import { Decorators } from "src/shared/decorators";
import { PaginationDto } from "src/shared/features/pagination/pagionation.dto";
import { Pharmacy } from "../entities/pharmacy.entity";

export namespace PharmacyDto {
	export namespace FindAll {
		export class Item extends Pharmacy {}

		@ApiSchema({ name: "PharmacyDtoFindAllResponse" })
		export class Response extends PaginationDto.Response<Item> {}

		@ApiSchema({ name: "PharmacyDtoFindAllQuery" })
		export class Query extends PaginationDto.Query {}
	}

	export namespace FindOne {
		export class Item extends Pharmacy {}

		@ApiSchema({ name: "PharmacyDtoFindOneParams" })
		export class Params {
			@Decorators.Fields.Identifier()
			id: Decorators.Fields.Identifier;
		}

		@ApiSchema({ name: "PharmacyDtoFindOneResponse" })
		export class Response extends Item {}
	}

	export namespace Create {
		export class Item extends Pharmacy {}

		@ApiSchema({ name: "PharmacyDtoCreateParams" })
		export class Body extends Pharmacy {
			@Decorators.Fields.Identifier({ isOptional: true })
			pharmacyChainId?: Decorators.Fields.Identifier;
		}

		@ApiSchema({ name: "PharmacyDtoCreateResponse" })
		export class Response extends Item {}
	}

	export namespace Delete {
		@ApiSchema({ name: "PharmacyDtoDeleteParams" })
		export class Params {
			@Decorators.Fields.Identifier()
			id: Decorators.Fields.Identifier;
		}
	}
}
