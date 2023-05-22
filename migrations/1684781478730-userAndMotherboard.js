const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UserAndMotherboard1684781478730 {
    name = 'UserAndMotherboard1684781478730'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "roles" text array NOT NULL DEFAULT '{user}', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "motherboard" ("id" SERIAL NOT NULL, "format" character varying NOT NULL, "cpuSocket" character varying NOT NULL, "memoryType" character varying NOT NULL, "memorySockets" integer NOT NULL, "graphicsSocket" character varying NOT NULL, "traitsBrand" character varying NOT NULL, "traitsModel" character varying NOT NULL, "traitsPrice" numeric NOT NULL, CONSTRAINT "PK_fcdf924fca1f7396471bf4d9fd0" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "motherboard"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
