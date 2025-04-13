import * as request from "supertest";

export namespace Types {
	export type Params<T extends (...args: never[]) => unknown> = Parameters<T>[0];

	export type GenericConstructor<Instance extends object = object> = new (
		...args: any[]
	) => Instance;

	export namespace Data {
		export type Link = string | null;
	}

	export namespace Test {
		export type Response<Body extends object> = Omit<request.Response, "body"> & { body: Body };
	}
}
