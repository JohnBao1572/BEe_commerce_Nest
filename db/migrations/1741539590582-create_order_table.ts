import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1741539590582 implements MigrationInterface {
    name = 'CreateOrderTable1741539590582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shippingAddress\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL DEFAULT '', \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`postCode\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`addedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orderProducts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_unit_price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`product_quantity\` int NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('processing', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'processing', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`shippedAt\` datetime NULL, \`deliveredAt\` datetime NULL, \`addedById\` int NULL, \`shippingId\` int NULL, UNIQUE INDEX \`REL_fa7fbee142ce934fec2862889a\` (\`shippingId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shippingAddress\` ADD CONSTRAINT \`FK_2291c2ac9c57589d62b92b878eb\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderProducts\` ADD CONSTRAINT \`FK_93e963c47272eb995d0b9ac533f\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderProducts\` ADD CONSTRAINT \`FK_7d42ce111ef9b507cc28b098fce\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_b256f3b505b5737caab81410b94\` FOREIGN KEY (\`addedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_fa7fbee142ce934fec2862889ac\` FOREIGN KEY (\`shippingId\`) REFERENCES \`shippingAddress\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_fa7fbee142ce934fec2862889ac\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_b256f3b505b5737caab81410b94\``);
        await queryRunner.query(`ALTER TABLE \`orderProducts\` DROP FOREIGN KEY \`FK_7d42ce111ef9b507cc28b098fce\``);
        await queryRunner.query(`ALTER TABLE \`orderProducts\` DROP FOREIGN KEY \`FK_93e963c47272eb995d0b9ac533f\``);
        await queryRunner.query(`ALTER TABLE \`shippingAddress\` DROP FOREIGN KEY \`FK_2291c2ac9c57589d62b92b878eb\``);
        await queryRunner.query(`DROP INDEX \`REL_fa7fbee142ce934fec2862889a\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`orderProducts\``);
        await queryRunner.query(`DROP TABLE \`shippingAddress\``);
    }

}
