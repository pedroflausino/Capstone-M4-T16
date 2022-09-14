import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCompanyEntity1663165639769 implements MigrationInterface {
    name = 'fixCompanyEntity1663165639769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "updatedAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
