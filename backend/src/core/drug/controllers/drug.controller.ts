import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
	ApiOkResponse,
	ApiOperation,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiParam,
	ApiBody,
	OmitType,
	ApiTags,
} from "@nestjs/swagger";
import { DrugDto as Dto } from "../dtos/drug.dto";
import { DrugService } from "../services/drug.service";

@ApiTags("Drug")
@Controller("drug")
export class DrugController {
	constructor(private readonly drugService: DrugService) {}

	@ApiOperation({ summary: "Create a new drug" })
	@ApiCreatedResponse({ type: Dto.Create.Response })
	@Post()
	create(@Body() createDrugDto: Dto.Create.Params): Promise<Dto.Create.Response> {
		return this.drugService.create(createDrugDto);
	}

	@ApiOperation({ summary: "Get all drugs" })
	@ApiOkResponse({ type: [Dto.FindAll.Response] })
	@Get()
	findAll(): Promise<Dto.FindAll.Response[]> {
		return this.drugService.findAll();
	}

	@ApiOperation({ summary: "Get a drug by id" })
	@ApiOkResponse({ type: Dto.FindOne.Response })
	@ApiParam({ name: "id", type: Number })
	@Get(":id")
	findOne(@Param("id") id: Dto.FindOne.Params["id"]): Promise<Dto.FindOne.Response> {
		return this.drugService.findOne({ id });
	}

	@ApiOperation({ summary: "Update a drug by id" })
	@ApiOkResponse({ type: Dto.Update.Response })
	@ApiBody({ type: OmitType(Dto.Update.Params, ["id"]) })
	@ApiParam({ name: "id", type: Number })
	@Patch(":id")
	update(
		@Param("id") id: Dto.Update.Params["id"],
		@Body() updateDrugDto: Omit<Dto.Update.Params, "id">
	): Promise<Dto.Update.Response> {
		return this.drugService.update({ id, ...updateDrugDto });
	}

	@ApiOperation({ summary: "Delete a drug by id" })
	@ApiNoContentResponse()
	@ApiParam({ name: "id", type: Number })
	@Delete(":id")
	remove(@Param("id") id: Dto.Delete.Params["id"]): Promise<void> {
		return this.drugService.delete({ id });
	}
}
