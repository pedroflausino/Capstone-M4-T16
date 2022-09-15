import { MigrationInterface, QueryRunner } from "typeorm";

export class att1663205422749 implements MigrationInterface {
    name = 'att1663205422749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD "hour" character varying NOT NULL`);
    }

}
