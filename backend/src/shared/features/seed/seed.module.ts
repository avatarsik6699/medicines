import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drug } from "src/core/drug/entities/drug.entity";
import { SeedService } from "./seed.service";
import { PharmacologicalGroupFactory } from "src/core/drug/factories/pharmacological-group.factory";
import { ActiveSubstanceFactory } from "src/core/drug/factories/active-substance.factory";
import { DrugsAvailableInPharmacyFactory } from "src/core/pharmacy/factories/drugs-available-in-pharmacy.factory";
import { PharmacyChainFactory } from "src/core/pharmacy/factories/pharmacy-chain.factory";
import { PharmacyFactory } from "src/core/pharmacy/factories/pharmacy.factory";
import { DrugFactory } from "src/core/drug/factories/drug.factory";
import { TradeNameFactory } from "src/core/drug/factories/trade-name.factory";
import { PharmacologicalGroup } from "src/core/drug/entities/pharmacological-group.entity";
import { ActiveSubstance } from "src/core/drug/entities/active-substance.entity";
import { TradeName } from "src/core/drug/entities/trade-name.entity";
import { Pharmacy } from "src/core/pharmacy/entities/pharmacy.entity";
import { DrugsAvailableInPharmacy } from "src/core/pharmacy/entities/drugs-available-in-pharmacy.entity";
import { PharmacyChain } from "src/core/pharmacy/entities/pharmacy-chain.entity";
import { SeedCommand } from "./seed.command";

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
export class SeedModule {}
