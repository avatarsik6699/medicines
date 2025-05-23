import { SelectQueryBuilder } from "typeorm";
import { PaginationDto } from "./pagionation.dto";
import { Types } from "../../types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

type Params = PaginationDto.Query & {
	sql: SelectQueryBuilder<Types.GenericObject>;
};

export const withPagination = ({
	sql,
	page = DEFAULT_PAGE,
	limit = DEFAULT_LIMIT,
}: Params): SelectQueryBuilder<Types.GenericObject> => {
	const offset = (page - 1) * limit;

	sql.skip(offset).take(limit);

	return sql;
};
