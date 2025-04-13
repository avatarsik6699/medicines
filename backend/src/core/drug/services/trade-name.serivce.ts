import { InjectRepository } from "@nestjs/typeorm";
import { TradeName } from "../entities/trade-name.entity";
import { Repository } from "typeorm";
import { TradeNameDto as Dto } from "../dtos/trade-name.dto";
import { NotFoundException, Injectable } from "@nestjs/common";
import { ActiveSubstance } from "../entities/active-substance.entity";

@Injectable()
export class TradeNameService {
	constructor(
		@InjectRepository(TradeName)
		private tradeNameRepository: Repository<TradeName>,
		@InjectRepository(ActiveSubstance)
		private activeSubstanceRepository: Repository<ActiveSubstance>
	) {}

	async findAll(): Promise<Dto.FindAll.Response[]> {
		return this.tradeNameRepository.find();
	}

	async findOne(params: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		const tradeName = await this.tradeNameRepository.findOne({
			where: { id: params.id },
		});

		if (!tradeName) {
			throw new NotFoundException("Trade name not found");
		}

		return tradeName;
	}

	async create({ activeSubstanceId, ...params }: Dto.Create.Params): Promise<Dto.Create.Response> {
		const activeSubstance = await this.activeSubstanceRepository.findOne({
			where: { id: activeSubstanceId },
		});

		if (!activeSubstance) {
			throw new NotFoundException("Active substance not found");
		}

		return this.tradeNameRepository.save({
			...params,
			activeSubstance,
		});
	}

	async update({ activeSubstanceId, ...params }: Dto.Update.Params): Promise<Dto.Update.Response> {
		const tradeName = await this.findOne(params);

		if (activeSubstanceId) {
			const activeSubstance = await this.activeSubstanceRepository.findOne({
				where: { id: activeSubstanceId },
			});

			if (!activeSubstance) {
				throw new NotFoundException("Active substance not found");
			}

			tradeName.activeSubstance = activeSubstance;
		}

		return this.tradeNameRepository.save({
			...tradeName,
			...params,
		});
	}

	async delete(params: Dto.Delete.Params): Promise<void> {
		const tradeName = await this.findOne(params);

		await this.tradeNameRepository.delete(tradeName.id);
	}
}
