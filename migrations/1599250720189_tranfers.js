/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('transfers', {
    id: { type: 'serial', primaryKey: 'true' },
    reference_id: { type: 'varchar' },
    source_id: { type: 'varchar' },
    target_id: { type: 'varchar' },
    pagarme_transfer_id: { type: 'varchar' },
    amount: { type: 'int' },
    funding_date: { type: 'timestamp', notNull: false },
    funding_estimated_date: { type: 'timestamp', notNull: false },
    date_created: { type: 'timestamp', notNull: false },
    date_updated: { type: 'timestamp', notNull: false },
    created_at: { type: 'timestamp' },
    updated_at: { type: 'timestamp' },
    reference_type: { type: 'varchar' },
    status: { type: 'varchar', default: 'waiting_payment' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transfers');
};
