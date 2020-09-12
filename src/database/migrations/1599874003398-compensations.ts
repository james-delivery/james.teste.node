import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class compensations1599874003398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'compensations',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'recipient_id',
                        type: 'varchar',
                    },{
                        name: 'amount',
                        type: 'numeric(15,2)',
                    },{
                        name: 'expected_payment_date',
                        type: 'date',
                    },{
                        name: 'payment_date',
                        type: 'date',
                    },{
                        name: 'status',
                        type: 'varchar',
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compensations');
    }

}
