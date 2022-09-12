import {MigrationInterface, QueryRunner} from "typeorm";

export class removingColumnRolUser1662999522700 implements MigrationInterface {
    name = 'removingColumnRolUser1662999522700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" integer NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "rol" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
