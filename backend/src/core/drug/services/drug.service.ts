import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Drug } from "../entities/drug.entity";
import { DrugDto as Dto } from "../dtos/drug.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TradeName } from "../entities/trade-name.entity";

@Injectable()
export class DrugService {
	constructor(
		@InjectRepository(Drug)
		private drugRepository: Repository<Drug>,
		@InjectRepository(TradeName)
		private tradeNameRepository: Repository<TradeName>
	) {}

	findAll(): Promise<Dto.FindAll.Response[]> {
		return this.drugRepository.find();
	}

	async findOne(params: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		const drug = await this.drugRepository.findOne({
			where: { id: params.id },
			relations: ["tradeName"],
		});

		if (!drug) {
			throw new NotFoundException("Drug not found");
		}

		return drug;
	}

	async create({ tradeNameId, ...params }: Dto.Create.Params): Promise<Dto.Create.Response> {
		const tradeName = await this.tradeNameRepository.findOne({
			where: { id: tradeNameId },
		});

		if (!tradeName) {
			throw new NotFoundException("Trade name not found");
		}

		const isDrugWithSameTradeNameAndDosageAlreadyExists = await this.drugRepository.exists({
			where: { tradeName: { id: tradeName.id }, dosage: params.dosage },
		});

		if (isDrugWithSameTradeNameAndDosageAlreadyExists) {
			throw new BadRequestException("Drug with same trade name and dosage already exists");
		}

		return this.drugRepository.save({
			...params,
			tradeName,
		});
	}

	async update({ tradeNameId, ...params }: Dto.Update.Params): Promise<Dto.Update.Response> {
		const drug = await this.findOne(params);

		if (tradeNameId) {
			const tradeName = await this.tradeNameRepository.findOne({
				where: { id: tradeNameId },
			});

			if (!tradeName) {
				throw new NotFoundException("Trade name not found");
			}

			drug.tradeName = tradeName;
		}

		const isDrugWithSameTradeNameAndDosageAlreadyExists = await this.drugRepository.exists({
			where: { tradeName: { id: drug.tradeName.id }, dosage: params.dosage },
		});

		if (isDrugWithSameTradeNameAndDosageAlreadyExists) {
			throw new BadRequestException("Drug with same trade name and dosage already exists");
		}

		return this.drugRepository.save({ ...drug, ...params });
	}

	async delete(params: Dto.Delete.Params): Promise<void> {
		const drug = await this.findOne(params);

		await this.drugRepository.delete(drug.id);
	}
}
