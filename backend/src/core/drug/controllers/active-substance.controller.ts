import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { ActiveSubstanceService } from "../services/active-substance.service";
import { ApiBody, ApiNoContentResponse, OmitType } from "@nestjs/swagger";
import { ApiParam } from "@nestjs/swagger";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ActiveSubstanceDto as Dto } from "../dtos/active-substance.dto";

@ApiTags("Active Substance")
@Controller("active-substance")
export class ActiveSubstanceController {
	constructor(private readonly activeSubstanceService: ActiveSubstanceService) {}

	@ApiOperation({ summary: "Create a new active substance" })
	@ApiCreatedResponse({ type: Dto.Create.Response })
	@Post()
	create(@Body() createActiveSubstanceDto: Dto.Create.Params): Promise<Dto.Create.Response> {
		return this.activeSubstanceService.create(createActiveSubstanceDto);
	}

	@ApiOperation({ summary: "Get all active substances" })
	@ApiOkResponse({ type: [Dto.FindAll.Response] })
	@Get()
	findAll(): Promise<Dto.FindAll.Response[]> {
		return this.activeSubstanceService.findAll();
	}

	@ApiOperation({ summary: "Get an active substance by id" })
	@ApiOkResponse({ type: Dto.FindOne.Response })
	@ApiParam({ name: "id", type: Number })
	@Get(":id")
	findOne(@Param("id") id: Dto.FindOne.Params["id"]): Promise<Dto.FindOne.Response> {
		return this.activeSubstanceService.findOne({ id });
	}

	@ApiOperation({ summary: "Update an active substance by id" })
	@ApiOkResponse({ type: Dto.Update.Response })
	@ApiBody({ type: OmitType(Dto.Update.Params, ["id"]) })
	@ApiParam({ name: "id", type: Number })
	@Patch(":id")
	update(
		@Param("id") id: Dto.Update.Params["id"],
		@Body() updateActiveSubstanceDto: Omit<Dto.Update.Params, "id">
	): Promise<Dto.Update.Response> {
		return this.activeSubstanceService.update({ id, ...updateActiveSubstanceDto });
	}

	@ApiOperation({ summary: "Delete an active substance by id" })
	@ApiNoContentResponse()
	@ApiParam({ name: "id", type: Number })
	@Delete(":id")
	remove(@Param("id") id: Dto.Delete.Params["id"]): Promise<void> {
		return this.activeSubstanceService.delete({ id });
	}
}
