import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class compensations1599874003398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transfers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'pagarme_transfer_id',
                        type: 'varchar',
                    },
                    {
                        name: 'amount',
                        type: 'numeric(15,2)',
                    },
                    {
                        name: 'reference_id',
                        type: 'date',
                    },
                    {
                        name: 'source_id',
                        type: 'date',
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
                        type: 'varchar',
                    },
                    {
                        name: 'funding_estimated_date',
                        type: 'varchar',
                    },
                    {
                        name: 'date_created',
                        type: 'varchar',
                    },
                    {
                        name: 'date_updated',
                        type: 'varchar',
                    },
                    {
                        name: 'reference_type',
                        type: 'varchar',
                    },
                    
                
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transfers');
    }

}
