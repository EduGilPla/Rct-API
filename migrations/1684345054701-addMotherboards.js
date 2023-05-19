const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddMotherboards1684345054701 {
    name = 'AddMotherboards1684345054701'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "motherboard" ("id" SERIAL NOT NULL, "format" character varying NOT NULL, "cpuSocket" character varying NOT NULL, "memoryType" character varying NOT NULL, "memorySockets" integer NOT NULL, "graphicsSocket" character varying NOT NULL, "traitsBrand" character varying NOT NULL, "traitsModel" character varying NOT NULL, "traitsPrice" numeric NOT NULL, CONSTRAINT "PK_fcdf924fca1f7396471bf4d9fd0" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "motherboard"`);
    }
}
