import {
	ApiBody,
	OmitType,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
} from "@nestjs/swagger";
import { Controller, Get, Post, Body, Patch, Delete, Param, Query } from "@nestjs/common";
import { TradeNameDto as Dto } from "../dtos/trade-name.dto";
import { TradeNameService } from "../services/trade-name.serivce";

@ApiTags("Trade Name")
@Controller("trade-name")
export class TradeNameController {
	constructor(private readonly tradeNameService: TradeNameService) {}

	@ApiOperation({ summary: "Create a new trade name" })
	@ApiCreatedResponse({ type: Dto.Create.Response })
	@Post()
	create(@Body() createTradeNameDto: Dto.Create.Params): Promise<Dto.Create.Response> {
		return this.tradeNameService.create(createTradeNameDto);
	}

	@ApiOperation({ summary: "Get all trade names" })
	@ApiOkResponse({ type: [Dto.FindAll.Response] })
	@Get()
	findAll(): Promise<Dto.FindAll.Response[]> {
		return this.tradeNameService.findAll();
	}

	@ApiOperation({ summary: "Get a trade name by id" })
	@ApiOkResponse({ type: Dto.FindOne.Response })
	@ApiParam({ name: "id", type: Number })
	@Get(":id")
	findOne(@Param("id") id: Dto.FindOne.Params["id"]): Promise<Dto.FindOne.Response> {
		return this.tradeNameService.findOne({ id });
	}

	@ApiOperation({ summary: "Update a trade name by id" })
	@ApiOkResponse({ type: Dto.Update.Response })
	@ApiBody({ type: OmitType(Dto.Update.Params, ["id"]) })
	@ApiParam({ name: "id", type: Number })
	@Patch(":id")
	update(
		@Param("id") id: Dto.Update.Params["id"],
		@Body() updateTradeNameDto: Omit<Dto.Update.Params, "id">
	): Promise<Dto.Update.Response> {
		return this.tradeNameService.update({ id, ...updateTradeNameDto });
	}

	@ApiOperation({ summary: "Delete a trade name by id" })
	@ApiNoContentResponse()
	@ApiParam({ name: "id", type: Number })
	@Delete(":id")
	remove(@Param("id") id: Dto.Delete.Params["id"]): Promise<void> {
		return this.tradeNameService.delete({ id });
	}

	@ApiOperation({ summary: "Get trade name suggestions" })
	@ApiOkResponse({ type: Dto.GetTradeNameSuggestions.Response })
	@ApiParam({ name: "tradeName", type: String })
	@Get("suggestions/:tradeName")
	getTradeNameSuggestions(
		@Param() params: Dto.GetTradeNameSuggestions.Params,
		@Query() query: Dto.GetTradeNameSuggestions.Query
	): Promise<Dto.GetTradeNameSuggestions.Response> {
		return this.tradeNameService.getTradeNameSuggestions({
			tradeName: params.tradeName,
			limit: query.limit,
		});
	}
}
