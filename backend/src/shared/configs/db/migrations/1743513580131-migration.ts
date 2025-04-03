import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743513580131 implements MigrationInterface {
    name = 'Migration1743513580131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pharmacy_chains" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "logoLink" character varying(255), "websiteLink" character varying(255), CONSTRAINT "PK_b34368f4855fba91836ae8d1cec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacological_groups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_42902bb6dfb4034509e7b538aa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "active_substances" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "pharmacologicalGroupId" integer, CONSTRAINT "PK_4580464e4cc1128ce013322ac19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade_names" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "originCountry" character varying(255) NOT NULL, "isOriginal" boolean, "activeSubstanceId" integer, CONSTRAINT "PK_7de675f92796ac97cee30b49cb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drugs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "dosage" character varying(120) NOT NULL, "tradeNameId" integer, CONSTRAINT "UQ_DRUG_TRADENAME_DOSAGE" UNIQUE ("tradeNameId", "dosage"), CONSTRAINT "PK_a3788abdeb2ec977862b17351ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drugs_available_in_pharmacy" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "drugId" integer, "pharmacyId" integer, CONSTRAINT "PK_e2dd058de0ef39b62c788df8038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "address" jsonb NOT NULL, "contact" jsonb NOT NULL, "workingHours" jsonb NOT NULL, "pharmacyChainId" integer, CONSTRAINT "PK_887410330080d3beb73850ebc8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "active_substances" ADD CONSTRAINT "FK_63ff6dca210fc3e725065a075b9" FOREIGN KEY ("pharmacologicalGroupId") REFERENCES "pharmacological_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_names" ADD CONSTRAINT "FK_cf00b32eef405863777a412302c" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drugs" ADD CONSTRAINT "FK_0519eda58ae39987b05015ba327" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drugs_available_in_pharmacy" ADD CONSTRAINT "FK_b7f3c16c3f8484e033d5ba703ff" FOREIGN KEY ("drugId") REFERENCES "drugs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drugs_available_in_pharmacy" ADD CONSTRAINT "FK_53b4056ec4000bc268ad13f5a9a" FOREIGN KEY ("pharmacyId") REFERENCES "pharmacies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmacies" ADD CONSTRAINT "FK_e0f6386e3f0d9e243f630d5db8b" FOREIGN KEY ("pharmacyChainId") REFERENCES "pharmacy_chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacies" DROP CONSTRAINT "FK_e0f6386e3f0d9e243f630d5db8b"`);
        await queryRunner.query(`ALTER TABLE "drugs_available_in_pharmacy" DROP CONSTRAINT "FK_53b4056ec4000bc268ad13f5a9a"`);
        await queryRunner.query(`ALTER TABLE "drugs_available_in_pharmacy" DROP CONSTRAINT "FK_b7f3c16c3f8484e033d5ba703ff"`);
        await queryRunner.query(`ALTER TABLE "drugs" DROP CONSTRAINT "FK_0519eda58ae39987b05015ba327"`);
        await queryRunner.query(`ALTER TABLE "trade_names" DROP CONSTRAINT "FK_cf00b32eef405863777a412302c"`);
        await queryRunner.query(`ALTER TABLE "active_substances" DROP CONSTRAINT "FK_63ff6dca210fc3e725065a075b9"`);
        await queryRunner.query(`DROP TABLE "pharmacies"`);
        await queryRunner.query(`DROP TABLE "drugs_available_in_pharmacy"`);
        await queryRunner.query(`DROP TABLE "drugs"`);
        await queryRunner.query(`DROP TABLE "trade_names"`);
        await queryRunner.query(`DROP TABLE "active_substances"`);
        await queryRunner.query(`DROP TABLE "pharmacological_groups"`);
        await queryRunner.query(`DROP TABLE "pharmacy_chains"`);
    }

}
