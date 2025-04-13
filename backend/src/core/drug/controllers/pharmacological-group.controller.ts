import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { PharmacologicalGroupService } from "../services/pharmacological-group.service";
import { PharmacologicalGroupDto as Dto } from "../dtos/pharmacological-group.dto";
import {
	ApiOperation,
	ApiTags,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiParam,
	ApiBody,
	OmitType,
} from "@nestjs/swagger";

@ApiTags("Pharmacological Group")
@Controller("pharmacological-group")
export class PharmacologicalGroupController {
	constructor(private readonly pharmacologicalGroupService: PharmacologicalGroupService) {}

	@ApiOperation({ summary: "Create a new pharmacological group" })
	@ApiCreatedResponse({ type: Dto.Create.Response })
	@Post()
	create(@Body() createPharmacologicalGroupDto: Dto.Create.Params): Promise<Dto.Create.Response> {
		return this.pharmacologicalGroupService.create(createPharmacologicalGroupDto);
	}

	@ApiOperation({ summary: "Get all pharmacological groups" })
	@ApiOkResponse({ type: [Dto.FindAll.Response] })
	@Get()
	findAll(): Promise<Dto.FindAll.Response[]> {
		return this.pharmacologicalGroupService.findAll();
	}

	@ApiOperation({ summary: "Get a pharmacological group by id" })
	@ApiOkResponse({ type: Dto.FindOne.Response })
	@ApiParam({ name: "id", type: Number })
	@Get(":id")
	findOne(@Param("id") id: Dto.FindOne.Params["id"]): Promise<Dto.FindOne.Response> {
		return this.pharmacologicalGroupService.findOne({ id });
	}

	@ApiOperation({ summary: "Update a pharmacological group by id" })
	@ApiOkResponse({ type: Dto.Update.Response })
	@ApiBody({ type: OmitType(Dto.Update.Params, ["id"]) })
	@ApiParam({ name: "id", type: Number })
	@Patch(":id")
	update(
		@Param("id") id: Dto.Update.Params["id"],
		@Body() updatePharmacologicalGroupDto: Omit<Dto.Update.Params, "id">
	): Promise<Dto.Update.Response> {
		return this.pharmacologicalGroupService.update({ id, ...updatePharmacologicalGroupDto });
	}

	@ApiOperation({ summary: "Delete a pharmacological group by id" })
	@ApiNoContentResponse()
	@ApiParam({ name: "id", type: Number })
	@Delete(":id")
	remove(@Param("id") id: Dto.Delete.Params["id"]): Promise<void> {
		return this.pharmacologicalGroupService.delete({ id });
	}
}
