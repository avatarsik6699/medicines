import { ObjectLiteral, Repository } from "typeorm";

export abstract class BaseFactory<Entity extends ObjectLiteral = ObjectLiteral> {
	constructor(protected readonly repository: Repository<Entity>) {}

	abstract create(data?: Partial<Entity>): Promise<Entity>;
	abstract createMany(count: number, data?: Partial<Entity>): Promise<Entity[]>;

	protected async save(entity: Entity): Promise<Entity> {
		return this.repository.save(entity);
	}

	protected async saveMany(entities: Entity[]): Promise<Entity[]> {
		return this.repository.save(entities);
	}

	async truncate() {
		await this.repository.query(
			"TRUNCATE TABLE " + this.repository.metadata.tableName + " RESTART IDENTITY CASCADE"
		);
	}

	async hasData() {
		const count = await this.repository.count();

		return count > 0;
	}
}
