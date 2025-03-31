import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743371465259 implements MigrationInterface {
    name = 'Migration1743371465259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "sku" character varying(100) NOT NULL, "photoFileName" character varying(255), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacological_groups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_42902bb6dfb4034509e7b538aa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "active_substances" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "pharmacologicalGroupId" integer, CONSTRAINT "PK_4580464e4cc1128ce013322ac19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade_names" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "originCountry" character varying(255) NOT NULL, "isOriginal" boolean, "activeSubstanceId" integer, CONSTRAINT "PK_7de675f92796ac97cee30b49cb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drugs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "dosage" character varying(120) NOT NULL, "tradeNameId" integer, CONSTRAINT "UQ_DRUG_TRADENAME_DOSAGE" UNIQUE ("tradeNameId", "dosage"), CONSTRAINT "PK_a3788abdeb2ec977862b17351ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "active_substances" ADD CONSTRAINT "FK_63ff6dca210fc3e725065a075b9" FOREIGN KEY ("pharmacologicalGroupId") REFERENCES "pharmacological_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_names" ADD CONSTRAINT "FK_cf00b32eef405863777a412302c" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drugs" ADD CONSTRAINT "FK_0519eda58ae39987b05015ba327" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drugs" DROP CONSTRAINT "FK_0519eda58ae39987b05015ba327"`);
        await queryRunner.query(`ALTER TABLE "trade_names" DROP CONSTRAINT "FK_cf00b32eef405863777a412302c"`);
        await queryRunner.query(`ALTER TABLE "active_substances" DROP CONSTRAINT "FK_63ff6dca210fc3e725065a075b9"`);
        await queryRunner.query(`DROP TABLE "drugs"`);
        await queryRunner.query(`DROP TABLE "trade_names"`);
        await queryRunner.query(`DROP TABLE "active_substances"`);
        await queryRunner.query(`DROP TABLE "pharmacological_groups"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
