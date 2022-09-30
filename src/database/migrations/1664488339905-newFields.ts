import {MigrationInterface, QueryRunner} from "typeorm";

export class newFields1664488339905 implements MigrationInterface {
    name = 'newFields1664488339905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL DEFAULT ('76F9enNQK'), "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "dateOrder" datetime NOT NULL, CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b3508cdbdfd868a5a7909e3a7" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL, "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "dateOrder" datetime NOT NULL, CONSTRAINT "UQ_c0fddfa1dc4b70a19a051cf10c2" UNIQUE ("numOrder"), CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b3508cdbdfd868a5a7909e3a7" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at", "dateOrder") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at", "dateOrder" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL DEFAULT ('76F9enNQK'), "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "dateOrder" datetime NOT NULL, CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b3508cdbdfd868a5a7909e3a7" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "orders"("id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at", "dateOrder") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at", "dateOrder" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL DEFAULT ('76F9enNQK'), "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b3508cdbdfd868a5a7909e3a7" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "orders"("id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "created_at", "updated_at" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
    }

}
