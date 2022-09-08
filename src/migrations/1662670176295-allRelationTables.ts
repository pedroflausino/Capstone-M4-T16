import { MigrationInterface, QueryRunner } from "typeorm";

export class allRelationTables1662670176295 implements MigrationInterface {
    name = 'allRelationTables1662670176295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "UQ_ace08cec3dc1ea6f85720b46fec" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "User" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_ed0b2f871e3f4a5a24db60c6644" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "deliveryId" uuid`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "FK_ace08cec3dc1ea6f85720b46fec" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_ed0b2f871e3f4a5a24db60c6644" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_dee8f3d6b05e95b9dc3d1c8ba33" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD CONSTRAINT "FK_db6e5de285236bca76d69c3c23b" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order_Products" ADD CONSTRAINT "FK_105a4218ea7e6a95acb01d92fb3" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_1dff7dcde01403b365c4e2706df" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_1dff7dcde01403b365c4e2706df"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP CONSTRAINT "FK_105a4218ea7e6a95acb01d92fb3"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP CONSTRAINT "FK_db6e5de285236bca76d69c3c23b"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_dee8f3d6b05e95b9dc3d1c8ba33"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_ed0b2f871e3f4a5a24db60c6644"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "FK_ace08cec3dc1ea6f85720b46fec"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "Order_Products" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "deliveryId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_ed0b2f871e3f4a5a24db60c6644"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "UQ_ace08cec3dc1ea6f85720b46fec"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "addressId"`);
    }

}
