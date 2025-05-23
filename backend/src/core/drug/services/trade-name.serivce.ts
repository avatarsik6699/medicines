import { InjectRepository } from "@nestjs/typeorm";
import { TradeName } from "../entities/trade-name.entity";
import { Repository } from "typeorm";
import { TradeNameDto as Dto } from "../dtos/trade-name.dto";
import { NotFoundException, Injectable } from "@nestjs/common";
import { ActiveSubstance } from "../entities/active-substance.entity";
import { plainToInstance } from "class-transformer";

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
			activeSubstance,
			...params,
		});
	}

	async update({ activeSubstanceId, ...params }: Dto.Update.Params): Promise<Dto.Update.Response> {
		const tradeName = await this.findOne({ id: params.id });

		if (activeSubstanceId) {
			const activeSubstance = await this.activeSubstanceRepository.findOne({
				where: { id: activeSubstanceId },
			});

			if (!activeSubstance) {
				throw new NotFoundException("Active substance not found");
			}

			tradeName.activeSubstance = activeSubstance;
		}

		return this.tradeNameRepository
			.createQueryBuilder()
			.update(TradeName, {
				...params,
				...(activeSubstanceId && { activeSubstance: tradeName.activeSubstance }),
			})
			.where("id = :id", { id: tradeName.id })
			.returning("*")
			.execute()
			.then(({ raw: tradeName }) =>
				Array.isArray(tradeName)
					? plainToInstance(TradeName, tradeName[0])
					: plainToInstance(TradeName, tradeName)
			);
	}

	async delete(params: Dto.Delete.Params): Promise<void> {
		const tradeName = await this.findOne(params);

		await this.tradeNameRepository.delete(tradeName.id);
	}

	async getTradeNameSuggestions(
		args: Dto.GetTradeNameSuggestions.Params & Dto.GetTradeNameSuggestions.Query
	): Promise<Dto.GetTradeNameSuggestions.Response> {
		const sql = this.tradeNameRepository.createQueryBuilder("trade_name");

		sql
			.where("trade_name.name ILIKE :name", { name: `%${args.tradeName}%` })
			.orderBy("trade_name.name", "ASC")
			.take(args.limit);

		const [tradeNames, total] = await sql.getManyAndCount();

		return {
			items: tradeNames,
			total,
			limit: args.limit,
			// TODO: temporary unusable, because the pagination is not implemented yet
			page: 1,
		};
	}
}
