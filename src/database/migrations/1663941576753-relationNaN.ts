import {MigrationInterface, QueryRunner} from "typeorm";

export class relationNaN1663941576753 implements MigrationInterface {
    name = 'relationNaN1663941576753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL, "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "applicants" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "dni" varchar NOT NULL, "province" varchar NOT NULL, "city" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL, "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b3508cdbdfd868a5a7909e3a7" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "numOrder", "description", "product_id", "applicant_id", "user_id", "created_at", "updated_at") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "user_id", "created_at", "updated_at" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "numOrder" varchar NOT NULL, "description" varchar(200) NOT NULL, "product_id" varchar NOT NULL, "applicant_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "orders"("id", "numOrder", "description", "product_id", "applicant_id", "user_id", "created_at", "updated_at") SELECT "id", "numOrder", "description", "product_id", "applicant_id", "user_id", "created_at", "updated_at" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "applicants"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
