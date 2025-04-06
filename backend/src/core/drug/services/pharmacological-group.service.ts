import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { PharmacologicalGroup } from "../entities/pharmacological-group.entity";
import { PharmacologicalGroupDto as Dto } from "../dtos/pharmacological-group.dto";

@Injectable()
export class PharmacologicalGroupService {
	constructor(
		@InjectRepository(PharmacologicalGroup)
		private readonly pharmacologicalGroupRepository: Repository<PharmacologicalGroup>
	) {}

	async create(params: Dto.Create.Params): Promise<Dto.Create.Response> {
		const isPharmacologicalGroupNameAlreadyTaken = await this.pharmacologicalGroupRepository.exists(
			{
				where: { name: params.name },
			}
		);

		if (isPharmacologicalGroupNameAlreadyTaken) {
			throw new BadRequestException("Pharmacological group with this name already exists");
		}

		return this.pharmacologicalGroupRepository.save(
			this.pharmacologicalGroupRepository.create(params)
		);
	}

	async findAll(): Promise<Dto.FindAll.Response[]> {
		return this.pharmacologicalGroupRepository.find();
	}

	async findOne(params: Dto.FindOne.Params): Promise<Dto.FindOne.Response> {
		const pharmacologicalGroup = await this.pharmacologicalGroupRepository.findOne({
			where: { id: params.id },
		});

		if (!pharmacologicalGroup) {
			throw new NotFoundException("Pharmacological group not found");
		}

		return pharmacologicalGroup;
	}

	async update({ id, ...params }: Dto.Update.Params): Promise<Dto.Update.Response> {
		const pharmacologicalGroup = await this.findOne({ id });

		const isPharmacologicalGroupNameAlreadyTaken = await this.pharmacologicalGroupRepository.exists(
			{
				where: { name: params.name, id: Not(id) },
			}
		);

		if (isPharmacologicalGroupNameAlreadyTaken) {
			throw new BadRequestException("Pharmacological group with this name already exists");
		}

		return this.pharmacologicalGroupRepository.save({
			...pharmacologicalGroup,
			...params,
		});
	}

	async delete({ id }: Dto.Delete.Params): Promise<void> {
		const pharmacologicalGroup = await this.findOne({ id });

		await this.pharmacologicalGroupRepository.delete(pharmacologicalGroup.id);
	}
}
