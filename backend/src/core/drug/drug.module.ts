import { Module } from "@nestjs/common";
import { DrugController } from "./controllers/drug.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drug } from "./entities/drug.entity";
import { TradeName } from "./entities/trade-name.entity";
import { PharmacologicalGroup } from "./entities/pharmacological-group.entity";
import { ActiveSubstance } from "./entities/active-substance.entity";
import { PharmacologicalGroupController } from "./controllers/pharmacological-group.controller";
import { PharmacologicalGroupService } from "./services/pharmacological-group.service";
import { DrugService } from "./services/drug.service";
import { TradeNameService } from "./services/trade-name.serivce";
import { ActiveSubstanceService } from "./services/active-substance.service";
import { TradeNameController } from "./controllers/trade-name.controller";
import { ActiveSubstanceController } from "./controllers/active-substance.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Drug, ActiveSubstance, PharmacologicalGroup, TradeName])],
	controllers: [
		DrugController,
		PharmacologicalGroupController,
		TradeNameController,
		ActiveSubstanceController,
	],
	providers: [DrugService, PharmacologicalGroupService, TradeNameService, ActiveSubstanceService],
	exports: [TypeOrmModule],
})
export class DrugModule {}
