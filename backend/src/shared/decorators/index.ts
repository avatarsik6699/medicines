import { LinkColumn } from "./link-column.decorator";

export namespace Decorators {
	export namespace Database {
		export namespace Column {
			export const Link = LinkColumn;
			export type Link = string;
		}
	}
}
