import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransfers1599442040730
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transfers',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'pagarme_transfer_id',
                        type: 'varchar',
                    },
                    {
                        name: 'reference_id',
                        type: 'varchar',
                    },
                    {
                        name: 'source_id',
                        type: 'varchar',
                    },
                    {
                        name: 'target_id',
                        type: 'varchar',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'funding_date',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'funding_estimated_date',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'date_created',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'date_updated',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'reference_type',
                        type: 'varchar',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
