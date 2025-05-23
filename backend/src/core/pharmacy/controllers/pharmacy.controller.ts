import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { PharmacyDto as Dto } from "../dtos/pharmacy.dto";
import { PharmacyService } from "../services/pharmacy.service";

@Controller("pharmacy")
export class PharmacyController {
	constructor(private readonly pharmacyService: PharmacyService) {}

	@Get()
	@ApiOperation({ summary: "Find all pharmacies" })
	@ApiQuery({ type: Dto.FindAll.Query })
	@ApiResponse({ type: Dto.FindAll.Response })
	findAll(@Query() query: Dto.FindAll.Query): Promise<Dto.FindAll.Response> {
		return this.pharmacyService.findAll(query);
	}

	@Get(":id")
	@ApiOperation({ summary: "Find pharmacy by id" })
	@ApiResponse({ type: Dto.FindOne.Response })
	findOne(@Param() params: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		return this.pharmacyService.findOne(params);
	}

	@Post()
	@ApiOperation({ summary: "Create pharmacy" })
	@ApiResponse({ type: Dto.Create.Response })
	create(@Body() body: Dto.Create.Body): Promise<Dto.Create.Response> {
		return this.pharmacyService.create(body);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete pharmacy" })
	@ApiNoContentResponse({ description: "Pharmacy deleted successfully" })
	delete(@Param() params: Dto.Delete.Params): Promise<void> {
		return this.pharmacyService.delete(params);
	}
}
