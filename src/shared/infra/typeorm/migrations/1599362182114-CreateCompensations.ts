import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompensations1599362182114
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'compensations',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'recipient_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'expected_payment_date',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'payment_date',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compensations');
    }
}
