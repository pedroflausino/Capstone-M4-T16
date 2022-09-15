import { MigrationInterface, QueryRunner } from "typeorm";

export class onDeleteOrder1663207267140 implements MigrationInterface {
    name = 'onDeleteOrder1663207267140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP CONSTRAINT "FK_db6e5de285236bca76d69c3c23b"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD CONSTRAINT "FK_db6e5de285236bca76d69c3c23b" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP CONSTRAINT "FK_db6e5de285236bca76d69c3c23b"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD CONSTRAINT "FK_db6e5de285236bca76d69c3c23b" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
