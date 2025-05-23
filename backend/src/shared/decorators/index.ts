import { LinkColumn } from "./link-column.decorator";
import { Identifier as IdentifierField } from "./fields/identifier";
export namespace Decorators {
	export namespace Fields {
		export const Identifier = IdentifierField;
		export type Identifier = number;
	}

	export namespace Database {
		export namespace Column {
			export const Link = LinkColumn;
			export type Link = string;
		}
	}
}
