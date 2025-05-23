import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AvailableDrugFiltersDto as Dto } from "../dtos/available-drug-filters.dto";
import { AvailableDrugFiltersService } from "../services/available-drug-filters.service";

@ApiTags("Available Drug Filters")
@Controller("available-drug-filters")
export class AvailableDrugFiltersController {
	constructor(private readonly availableDrugFiltersService: AvailableDrugFiltersService) {}

	@Get("pharmacy-chains")
	@ApiOperation({ summary: "Get pharmacy chains list" })
	@ApiOkResponse({
		description: "Pharmacy chains list",
		type: Dto.GetPharmacyChainsList.Response,
	})
	async getPharmacyChainsList(): Promise<Dto.GetPharmacyChainsList.Response> {
		return this.availableDrugFiltersService.getPharmacyChainsList();
	}

	@Get("regions")
	@ApiOperation({ summary: "Get regions list" })
	@ApiOkResponse({
		description: "Regions list",
		type: Dto.GetRegionsList.Response,
	})
	async getRegionsList(): Promise<Dto.GetRegionsList.Response> {
		return this.availableDrugFiltersService.getRegionsList();
	}

	@Get("metros")
	@ApiOperation({ summary: "Get metros list" })
	@ApiOkResponse({
		description: "Metros list",
		type: Dto.GetMetroList.Response,
	})
	async getMetroList(): Promise<Dto.GetMetroList.Response> {
		return this.availableDrugFiltersService.getMetroList();
	}

	@Get("districts")
	@ApiOperation({ summary: "Get districts list" })
	@ApiOkResponse({
		description: "Districts list",
		type: Dto.GetDistrictsList.Response,
	})
	async getDistrictsList(): Promise<Dto.GetDistrictsList.Response> {
		return this.availableDrugFiltersService.getDistrictsList();
	}

	@Get("dosages/:tradeNameId")
	@ApiOperation({ summary: "Get drug dosages by trade name" })
	@ApiResponse({ type: Dto.GetDrugDosagesList.Response })
	getDrugDosagesList(
		@Param() params: Dto.GetDrugDosagesList.Params
	): Promise<Dto.GetDrugDosagesList.Response> {
		return this.availableDrugFiltersService.getDrugDosagesList(params);
	}
}
