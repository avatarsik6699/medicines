import { ObjectLiteral, Repository } from "typeorm";

export abstract class BaseFactory<Entity extends ObjectLiteral = ObjectLiteral> {
	constructor(protected readonly repository: Repository<Entity>) {}

	abstract getEntity(data: Partial<Entity>): Entity;

	public createOne(data: Partial<Entity> = {}): Promise<Entity> {
		return this.save(this.getEntity(data));
	}

	public createMany(
		params: { count: number; dataForEach?: Partial<Entity> } | { dataList: Partial<Entity>[] }
	): Promise<Entity[]> {
		if ("count" in params) {
			return this.saveMany(
				Array.from({ length: params.count }).map(() => this.getEntity(params.dataForEach ?? {}))
			);
		} else {
			return this.saveMany(params.dataList.map(data => this.getEntity(data)));
		}
	}

	protected save(entity: Entity): Promise<Entity> {
		return this.repository.save(entity);
	}

	protected saveMany(entities: Entity[]): Promise<Entity[]> {
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
