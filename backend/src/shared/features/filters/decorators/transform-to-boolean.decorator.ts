import { Transform } from "class-transformer";

type Params = {
	value: unknown;
};

export function TransformToBoolean() {
	return Transform(({ value }: Params) => {
		if (value === "true" || value === true) return true;
		if (value === "false" || value === false) return false;

		return value;
	});
}
