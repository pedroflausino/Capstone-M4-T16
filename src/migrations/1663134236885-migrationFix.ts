import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationFix1663134236885 implements MigrationInterface {
    name = 'migrationFix1663134236885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "UQ_1e86f3b42774f804f0adc6d78d9"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "isAdm" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "FK_588758d1d2ae16fe80ba3a7777f" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "FK_588758d1d2ae16fe80ba3a7777f"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "updatedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "UQ_1e86f3b42774f804f0adc6d78d9" UNIQUE ("email")`);
    }

}
