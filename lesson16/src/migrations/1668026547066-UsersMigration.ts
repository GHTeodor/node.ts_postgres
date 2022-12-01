import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMigration1668026547066 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users(
                id SERIAL PRIMARY KEY,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL,
                age INT CHECK (age > 0),
                phone VARCHAR(250) NOT NULL UNIQUE,
                email VARCHAR(250) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL,
                createdAt TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
                deletedAt TIMESTAMP 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS Users');
    }
}
