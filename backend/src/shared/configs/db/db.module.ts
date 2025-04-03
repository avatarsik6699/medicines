import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedCommand } from "./commands/seed.command";
import { PharmacologicalGroup } from "src/core/drug/entities/pharmacological-group.entity";
import { ActiveSubstance } from "src/core/drug/entities/active-substance.entity";
import { TradeName } from "src/core/drug/entities/trade-name.entity";
import { Drug } from "src/core/drug/entities/drug.entity";
import { Pharmacy } from "src/core/pharmacy/entities/pharmacy.entity";
import { DrugsAvailableInPharmacy } from "src/core/pharmacy/entities/drugs-available-in-pharmacy.entity";
import { PharmacologicalGroupFactory } from "../../../core/drug/factories/pharmacological-group.factory";
import { ActiveSubstanceFactory } from "../../../core/drug/factories/active-substance.factory";
import { SeedService } from "./services/seed.service";
import { DrugsAvailableInPharmacyFactory } from "src/core/pharmacy/factories/drugs-available-in-pharmacy.factory";
import { PharmacyChainFactory } from "src/core/pharmacy/factories/pharmacy-chain.factory";
import { PharmacyFactory } from "src/core/pharmacy/factories/pharmacy.factory";
import { DrugFactory } from "src/core/drug/factories/drug.factory";
import { TradeNameFactory } from "src/core/drug/factories/trade-name.factory";
import { PharmacyChain } from "src/core/pharmacy/entities/pharmacy-chain.entity";
@Module({
	imports: [
		TypeOrmModule.forFeature([
			PharmacologicalGroup,
			ActiveSubstance,
			TradeName,
			Drug,
			Pharmacy,
			DrugsAvailableInPharmacy,
			PharmacyChain,
		]),
	],
	providers: [
		SeedService,
		SeedCommand,
		PharmacologicalGroupFactory,
		ActiveSubstanceFactory,
		DrugsAvailableInPharmacyFactory,
		PharmacyChainFactory,
		PharmacyFactory,
		DrugFactory,
		TradeNameFactory,
	],
})
export class DatabaseModule {}
