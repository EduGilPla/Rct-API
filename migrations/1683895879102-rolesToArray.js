const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class RolesToArray1683895879102 {
    name = 'RolesToArray1683895879102'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "roles"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" text array NOT NULL DEFAULT '{user}'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roles" TO "role"`);
    }
}
