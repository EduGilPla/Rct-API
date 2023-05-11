const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddRole1683845605250 {
    name = 'AddRole1683845605250'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
    }
}
