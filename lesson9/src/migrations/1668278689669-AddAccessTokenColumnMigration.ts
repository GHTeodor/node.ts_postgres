import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccessTokenColumnMigration1668278689669 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN IF NOT EXISTS accessToken VARCHAR(250) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens DROP COLUMN IF EXISTS accessToken');
    }
}
