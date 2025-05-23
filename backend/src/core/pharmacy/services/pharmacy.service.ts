import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { withPagination } from "src/shared/features/pagination";
import { Repository } from "typeorm";
import { PharmacyDto as Dto } from "../dtos/pharmacy.dto";
import { PharmacyChain } from "../entities/pharmacy-chain.entity";
import { Pharmacy } from "../entities/pharmacy.entity";

@Injectable()
export class PharmacyService {
	constructor(
		@InjectRepository(PharmacyChain)
		private readonly pharmacyChainRepository: Repository<PharmacyChain>,
		@InjectRepository(Pharmacy)
		private readonly pharmacyRepository: Repository<Pharmacy>
	) {}

	async findAll(args: Dto.FindAll.Query): Promise<Dto.FindAll.Response> {
		const sql = this.pharmacyRepository.createQueryBuilder("pharmacies");

		sql.select([`pharmacies.*`]);

		withPagination({ sql, limit: args.limit, page: args.page });

		return {
			items: await sql
				.getRawMany<Dto.FindAll.Item>()
				.then(pharmacies => pharmacies.map(item => plainToInstance(Dto.FindAll.Item, item))),
			total: await sql.getCount(),
			page: args.page ?? 1,
			limit: args.limit ?? 10,
		};
	}

	async findOne(args: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		const pharmacy = await this.pharmacyRepository.findOne({ where: { id: args.id } });

		if (!pharmacy) {
			throw new NotFoundException("Pharmacy not found");
		}

		return plainToInstance(Dto.FindOne.Item, pharmacy);
	}

	async create(args: Dto.Create.Body): Promise<Dto.Create.Response> {
		const pharmacyChain = await this.pharmacyChainRepository.findOne({
			where: { id: args.pharmacyChainId },
		});

		if (!pharmacyChain) {
			throw new NotFoundException("Pharmacy chain not found");
		}

		const isPharmacyInSamePharmacyChainWithSameNameAlreadyExists =
			await this.pharmacyRepository.exists({
				where: { name: args.name, pharmacyChain: { id: args.pharmacyChainId } },
			});

		if (isPharmacyInSamePharmacyChainWithSameNameAlreadyExists) {
			throw new BadRequestException(
				"Pharmacy in same pharmacy chain with same name already exists"
			);
		}

		return this.pharmacyRepository.save({
			...args,
			pharmacyChain,
		});
	}

	async delete(params: Dto.Delete.Params): Promise<void> {
		const pharmacy = await this.findOne(params);

		await this.pharmacyRepository.delete(pharmacy.id);
	}
}
