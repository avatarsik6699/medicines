import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { AvailableDrugDto as Dto } from "../dtos/available-drug.dto";
import { AvailableDrugService } from "../services/available-drug.service";

@Controller("available-drug")
export class AvailableDrugController {
	constructor(private readonly availableDrugService: AvailableDrugService) {}

	@Get(":tradeNameId")
	@ApiOperation({ summary: "Find available drugs by trade name" })
	@ApiOkResponse({ type: Dto.FindAll.Response })
	findAll(
		@Param() params: Dto.FindAll.Params,
		@Query() query: Dto.FindAll.Query
	): Promise<Dto.FindAll.Response> {
		return this.availableDrugService.findAll({
			tradeNameId: params.tradeNameId,
			...query,
		});
	}
}
