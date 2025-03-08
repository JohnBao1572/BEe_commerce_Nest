import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategorisTable1741426307704 implements MigrationInterface {
    name = 'UpdateCategorisTable1741426307704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD PRIMARY KEY (\`id\`)`);
    }

}
