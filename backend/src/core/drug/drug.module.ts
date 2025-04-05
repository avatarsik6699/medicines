import { Module } from "@nestjs/common";
import { DrugService } from "./drug.service";
import { DrugController } from "./drug.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drug } from "./entities/drug.entity";
import { TradeName } from "./entities/trade-name.entity";
import { PharmacologicalGroup } from "./entities/pharmacological-group.entity";
import { ActiveSubstance } from "./entities/active-substance.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Drug, ActiveSubstance, PharmacologicalGroup, TradeName])],
	controllers: [DrugController],
	providers: [DrugService],
})
export class DrugModule {}
