import { Injectable } from "@nestjs/common";
import { PharmacologicalGroup } from "src/core/drug/entities/pharmacological-group.entity";
import { ActiveSubstanceFactory } from "../../../../core/drug/factories/active-substance.factory";
import { PharmacologicalGroupFactory } from "../../../../core/drug/factories/pharmacological-group.factory";
import { Drug } from "src/core/drug/entities/drug.entity";
import { TradeName } from "src/core/drug/entities/trade-name.entity";
import { TradeNameFactory } from "../../../../core/drug/factories/trade-name.factory";
import { DrugFactory } from "../../../../core/drug/factories/drug.factory";
import { ActiveSubstance } from "src/core/drug/entities/active-substance.entity";
import { PharmacyFactory } from "src/core/pharmacy/factories/pharmacy.factory";
import { PharmacyChainFactory } from "src/core/pharmacy/factories/pharmacy-chain.factory";
import { DrugsAvailableInPharmacyFactory } from "src/core/pharmacy/factories/drugs-available-in-pharmacy.factory";
import { DrugsAvailableInPharmacy } from "src/core/pharmacy/entities/drugs-available-in-pharmacy.entity";
import { Pharmacy } from "src/core/pharmacy/entities/pharmacy.entity";
import { PharmacyChain } from "src/core/pharmacy/entities/pharmacy-chain.entity";
import { faker } from "@faker-js/faker";
@Injectable()
export class SeedService {
	constructor(
		private readonly pharmacologicalGroupFactory: PharmacologicalGroupFactory,
		private readonly activeSubstanceFactory: ActiveSubstanceFactory,
		private readonly tradeNameFactory: TradeNameFactory,
		private readonly drugFactory: DrugFactory,
		private readonly pharmacyFactory: PharmacyFactory,
		private readonly pharmacyChainFactory: PharmacyChainFactory,
		private readonly drugsAvailableInPharmacyFactory: DrugsAvailableInPharmacyFactory
	) {}

	/**
	 * Check if database already contains data
	 * @returns Promise<boolean>
	 */
	async hasData(): Promise<boolean> {
		return Promise.all([
			this.pharmacologicalGroupFactory.hasData(),
			this.activeSubstanceFactory.hasData(),
			this.tradeNameFactory.hasData(),
			this.drugFactory.hasData(),
			this.pharmacyChainFactory.hasData(),
			this.pharmacyFactory.hasData(),
			this.drugsAvailableInPharmacyFactory.hasData(),
		]).then(results => results.some(result => result));
	}

	/**
	 * Clean all data from the database
	 * @returns Promise<void>
	 */
	async cleanDatabase(): Promise<void> {
		await this.pharmacologicalGroupFactory.truncate();
		await this.activeSubstanceFactory.truncate();
		await this.tradeNameFactory.truncate();
		await this.drugFactory.truncate();
		await this.pharmacyChainFactory.truncate();
		await this.pharmacyFactory.truncate();
		await this.drugsAvailableInPharmacyFactory.truncate();
	}

	/**
	 * Create pharmacological groups
	 * @param count - Number of pharmacological groups to create
	 * @returns Promise<PharmacologicalGroup[]>
	 */
	createPharmacologicalGroups(count: number = 5) {
		return this.pharmacologicalGroupFactory.createMany(count);
	}

	/**
	 * Create active substances for pharmacological groups
	 * @param groups - Pharmacological groups to create substances for
	 * @param count - Number of substances to create per group
	 * @returns Promise<ActiveSubstance[]>
	 */
	async createActiveSubstances(
		pharmacologicalGroups: PharmacologicalGroup[],
		count: number = 3
	): Promise<ActiveSubstance[]> {
		return (
			await Promise.all(
				pharmacologicalGroups.map(group =>
					this.activeSubstanceFactory.createMany(count, { pharmacologicalGroup: group })
				)
			)
		).flat();
	}

	/**
	 * Create trade names for active substances
	 * @param count - Number of trade names to create
	 * @returns Promise<TradeName[]>
	 */
	async createTradeNames(
		activeSubstances: ActiveSubstance[],
		count: number = 2
	): Promise<TradeName[]> {
		return (
			await Promise.all(
				activeSubstances.map(activeSubstance =>
					this.tradeNameFactory.createMany(count, { activeSubstance })
				)
			)
		).flat();
	}

	/**
	 * Create drugs for trade names
	 * @param count - Number of drugs to create
	 * @returns Promise<Drug[]>
	 */
	async createDrugs(tradeNames: TradeName[], count: number = 2): Promise<Drug[]> {
		return (
			await Promise.all(
				tradeNames.map(tradeName => this.drugFactory.createMany(count, { tradeName }))
			)
		).flat();
	}

	/**
	 * Create pharmacy chains
	 * @param count - Number of pharmacy chains to create
	 * @returns Promise<PharmacyChain[]>
	 */
	async createPharmacyChains(count: number = 5): Promise<PharmacyChain[]> {
		return this.pharmacyChainFactory.createMany(count);
	}

	/**
	 * Create pharmacies
	 * @param count - Number of pharmacies to create
	 * @returns Promise<Pharmacy[]>
	 */
	async createPharmacies(pharmacyChains: PharmacyChain[], count: number = 5): Promise<Pharmacy[]> {
		return (
			await Promise.all(
				pharmacyChains.map(pharmacyChain =>
					this.pharmacyFactory.createMany(count, { pharmacyChain })
				)
			)
		).flat();
	}

	/**
	 * Create drugs available in pharmacies
	 * @param pharmacies - Pharmacies to create drugs for
	 * @param count - Number of drugs to create per pharmacy
	 * @returns Promise<DrugsAvailableInPharmacy[]>
	 */
	async createDrugsAvailableInPharmacies(
		pharmacies: Pharmacy[],
		drugs: Drug[],
		count: number = 2
	): Promise<DrugsAvailableInPharmacy[]> {
		return (
			await Promise.all(
				pharmacies
					.map(pharmacy =>
						faker.helpers.arrayElements(drugs).map(drug => {
							return this.drugsAvailableInPharmacyFactory.createMany(count, {
								pharmacy,
								drug,
							});
						})
					)
					.flat()
			)
		).flat();
	}
}
