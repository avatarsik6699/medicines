import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActiveSubstance } from "../entities/active-substance.entity";
import { ActiveSubstanceDto as Dto } from "../dtos/active-substance.dto";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";

@Injectable()
export class ActiveSubstanceService {
	constructor(
		@InjectRepository(ActiveSubstance)
		private activeSubstanceRepository: Repository<ActiveSubstance>,
		@InjectRepository(PharmacologicalGroup)
		private pharmacologicalGroupRepository: Repository<PharmacologicalGroup>
	) {}

	async findAll(): Promise<Dto.FindAll.Response[]> {
		return this.activeSubstanceRepository.find();
	}

	async findOne(params: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		const activeSubstance = await this.activeSubstanceRepository.findOne({
			where: { id: params.id },
		});

		if (!activeSubstance) {
			throw new NotFoundException("Active substance not found");
		}

		return activeSubstance;
	}

	async create({
		pharmacologicalGroupId,
		...params
	}: Dto.Create.Params): Promise<Dto.Create.Response> {
		const pharmacologicalGroup = await this.pharmacologicalGroupRepository.findOne({
			where: { id: pharmacologicalGroupId },
		});

		if (!pharmacologicalGroup) {
			throw new NotFoundException("Pharmacological group not found");
		}

		return this.activeSubstanceRepository.save({
			...params,
			pharmacologicalGroup,
		});
	}

	async update({
		id,
		pharmacologicalGroupId,
		...params
	}: Dto.Update.Params): Promise<Dto.Update.Response> {
		const activeSubstance = await this.findOne({ id });

		if (pharmacologicalGroupId) {
			const pharmacologicalGroup = await this.pharmacologicalGroupRepository.findOne({
				where: { id: pharmacologicalGroupId },
			});

			if (!pharmacologicalGroup) {
				throw new NotFoundException("Pharmacological group not found");
			}

			activeSubstance.pharmacologicalGroup = pharmacologicalGroup;
		}

		return this.activeSubstanceRepository.save({
			...activeSubstance,
			...params,
		});
	}

	async delete({ id }: Dto.Delete.Params): Promise<void> {
		const activeSubstance = await this.findOne({ id });

		await this.activeSubstanceRepository.delete(activeSubstance.id);
	}
}
