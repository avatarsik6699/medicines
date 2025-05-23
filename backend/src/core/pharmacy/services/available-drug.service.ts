import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Drug } from "src/core/drug/entities/drug.entity";
import { withPagination } from "src/shared/features/pagination";
import { Repository } from "typeorm";
import { AvailableDrugDto as Dto } from "../dtos/available-drug.dto";
import { DrugsAvailableInPharmacy } from "../entities/drugs-available-in-pharmacy.entity";

@Injectable()
export class AvailableDrugService {
	constructor(
		@InjectRepository(Drug)
		private readonly drugRepository: Repository<Drug>,
		@InjectRepository(DrugsAvailableInPharmacy)
		private readonly drugsAvailableInPharmacyRepository: Repository<DrugsAvailableInPharmacy>
	) {}

	async findAll(args: Dto.FindAll.Query & Dto.FindAll.Params): Promise<Dto.FindAll.Response> {
		const drugsWithCurrentTradeName = await this.drugRepository.find({
			where: { tradeName: { id: args.tradeNameId } },
			select: ["id"],
		});

		const sql = this.drugsAvailableInPharmacyRepository.createQueryBuilder("daip");

		sql.select([
			`daip.id as "id"`,
			`daip.price as "price"`,
			`daip.quantity as "quantity"`,
			`daip.pharmacyId as "pharmacyId"`,
			`daip.drugId as "drugId"`,

			`pharmacies.pharmacyChainId as "pharmacyChainId"`,
			`pharmacies.address as "address"`,

			`drugs.tradeNameId as "tradeNameId"`,
			`drugs.dosage as "dosage"`,

			`trade_names.id as "tradeNameId"`,
			`trade_names.name as "tradeName"`,
		]);

		sql.innerJoin("pharmacies", "pharmacies", "pharmacies.id = daip.pharmacyId");
		sql.innerJoin("drugs", "drugs", "drugs.id = daip.drugId");
		sql.innerJoin("trade_names", "trade_names", "trade_names.id = drugs.tradeNameId");

		sql.where("daip.drugId IN (:...ids)", {
			ids: drugsWithCurrentTradeName.map(drug => drug.id),
		});

		if (args.pharmacyChainId) {
			sql.andWhere("pharmacies.pharmacyChainId = :pharmacyChainId", {
				pharmacyChainId: args.pharmacyChainId,
			});
		}

		if (args.regionName) {
			sql.andWhere("pharmacies.address->>'region' = :regionName", {
				regionName: args.regionName,
			});
		}

		if (args.metroName) {
			sql.andWhere("pharmacies.address->>'metro' = :metroName", {
				metroName: args.metroName,
			});
		}

		if (args.districtName) {
			sql.andWhere("pharmacies.address->>'district' = :districtName", {
				districtName: args.districtName,
			});
		}

		if (args.dosage) {
			sql.andWhere("drugs.dosage = :dosage", {
				dosage: args.dosage,
			});
		}

		sql.orderBy("daip.price", "ASC");

		withPagination({ sql, limit: args.limit, page: args.page });

		return {
			items: await sql
				.getRawMany<Dto.FindAll.ResponseItem>()
				.then(drugsAvailableInPharmacy =>
					drugsAvailableInPharmacy.map(item => plainToInstance(Dto.FindAll.ResponseItem, item))
				),
			total: await sql.getCount(),
			page: args.page ?? 1,
			limit: args.limit ?? 10,
		};
	}
}
