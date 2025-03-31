export namespace Types {
	export type GenericConstructor<Instance extends object = object> = new (
		...args: any[]
	) => Instance;
}
