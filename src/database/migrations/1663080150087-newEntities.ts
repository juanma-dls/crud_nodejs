import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntities1663080150087 implements MigrationInterface {
    name = 'newEntities1663080150087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medics" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "specialty" varchar NOT NULL, "tuition" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "dni" integer NOT NULL, "sexo" varchar NOT NULL, "obraSocial" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "turnos" ("patientsId" varchar NOT NULL, "medicsId" varchar NOT NULL, PRIMARY KEY ("patientsId", "medicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_878a95899f24a21d8fdade9dda" ON "turnos" ("patientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b99ae67f548ecab297dd70316d" ON "turnos" ("medicsId") `);
        await queryRunner.query(`DROP INDEX "IDX_878a95899f24a21d8fdade9dda"`);
        await queryRunner.query(`DROP INDEX "IDX_b99ae67f548ecab297dd70316d"`);
        await queryRunner.query(`CREATE TABLE "temporary_turnos" ("patientsId" varchar NOT NULL, "medicsId" varchar NOT NULL, CONSTRAINT "FK_878a95899f24a21d8fdade9dda0" FOREIGN KEY ("patientsId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b99ae67f548ecab297dd70316dc" FOREIGN KEY ("medicsId") REFERENCES "medics" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("patientsId", "medicsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_turnos"("patientsId", "medicsId") SELECT "patientsId", "medicsId" FROM "turnos"`);
        await queryRunner.query(`DROP TABLE "turnos"`);
        await queryRunner.query(`ALTER TABLE "temporary_turnos" RENAME TO "turnos"`);
        await queryRunner.query(`CREATE INDEX "IDX_878a95899f24a21d8fdade9dda" ON "turnos" ("patientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b99ae67f548ecab297dd70316d" ON "turnos" ("medicsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b99ae67f548ecab297dd70316d"`);
        await queryRunner.query(`DROP INDEX "IDX_878a95899f24a21d8fdade9dda"`);
        await queryRunner.query(`ALTER TABLE "turnos" RENAME TO "temporary_turnos"`);
        await queryRunner.query(`CREATE TABLE "turnos" ("patientsId" varchar NOT NULL, "medicsId" varchar NOT NULL, PRIMARY KEY ("patientsId", "medicsId"))`);
        await queryRunner.query(`INSERT INTO "turnos"("patientsId", "medicsId") SELECT "patientsId", "medicsId" FROM "temporary_turnos"`);
        await queryRunner.query(`DROP TABLE "temporary_turnos"`);
        await queryRunner.query(`CREATE INDEX "IDX_b99ae67f548ecab297dd70316d" ON "turnos" ("medicsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_878a95899f24a21d8fdade9dda" ON "turnos" ("patientsId") `);
        await queryRunner.query(`DROP INDEX "IDX_b99ae67f548ecab297dd70316d"`);
        await queryRunner.query(`DROP INDEX "IDX_878a95899f24a21d8fdade9dda"`);
        await queryRunner.query(`DROP TABLE "turnos"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TABLE "medics"`);
    }

}
