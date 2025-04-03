export namespace Types {
	export type GenericConstructor<Instance extends object = object> = new (
		...args: any[]
	) => Instance;

	export namespace Data {
		export type Link = string | null;
	}
}
