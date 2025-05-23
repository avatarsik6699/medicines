import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AvailableDrugFiltersDto as Dto } from "../dtos/available-drug-filters.dto";
import { PharmacyChain } from "../entities/pharmacy-chain.entity";
import { Pharmacy } from "../entities/pharmacy.entity";
import { Drug } from "src/core/drug/entities/drug.entity";
@Injectable()
export class AvailableDrugFiltersService {
	constructor(
		@InjectRepository(PharmacyChain)
		private readonly pharmacyChainRepository: Repository<PharmacyChain>,
		@InjectRepository(Pharmacy)
		private readonly pharmacyRepository: Repository<Pharmacy>,
		@InjectRepository(Drug)
		private readonly drugRepository: Repository<Drug>
	) {}

	async getPharmacyChainsList(): Promise<Dto.GetPharmacyChainsList.Response> {
		const [pharmacyChains, total] = await this.pharmacyChainRepository.findAndCount();

		return {
			total,
			items: pharmacyChains.map(pharmacyChain => ({
				id: pharmacyChain.id,
				name: pharmacyChain.name,
			})),
		};
	}

	async getRegionsList(): Promise<Dto.GetRegionsList.Response> {
		const regions = await this.pharmacyRepository
			.createQueryBuilder("pharmacies")
			.select("DISTINCT pharmacies.address->>'region'", "name")
			.where("pharmacies.address->>'region' IS NOT NULL")
			.orderBy("pharmacies.address->>'region'", "ASC")
			.getRawMany<Dto.GetRegionsList.ResponseItemDto>();

		return {
			total: regions.length,
			items: regions,
		};
	}

	async getMetroList(): Promise<Dto.GetMetroList.Response> {
		const metros = await this.pharmacyRepository
			.createQueryBuilder("pharmacies")
			.select("DISTINCT pharmacies.address->>'metro'", "name")
			.where("pharmacies.address->>'metro' IS NOT NULL")
			.orderBy("pharmacies.address->>'metro'", "ASC")
			.getRawMany<Dto.GetMetroList.ResponseItemDto>();

		return {
			total: metros.length,
			items: metros,
		};
	}

	async getDistrictsList(): Promise<Dto.GetDistrictsList.Response> {
		const districts = await this.pharmacyRepository
			.createQueryBuilder("pharmacies")
			.select("DISTINCT pharmacies.address->>'district'", "name")
			.where("pharmacies.address->>'district' IS NOT NULL")
			.orderBy("pharmacies.address->>'district'", "ASC")
			.getRawMany<Dto.GetDistrictsList.ResponseItemDto>();

		return {
			total: districts.length,
			items: districts,
		};
	}

	async getDrugDosagesList(
		args: Dto.GetDrugDosagesList.Params
	): Promise<Dto.GetDrugDosagesList.Response> {
		const drugs = await this.drugRepository.find({
			where: { tradeName: { id: args.tradeNameId } },
			select: ["dosage"],
		});

		return {
			total: drugs.length,
			items: drugs.map(drug => ({
				name: drug.dosage,
			})),
		};
	}
}
