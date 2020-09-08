exports.up = (knex) => {
  knex.createTable('compensations', {
    id: { 
      type: 'serial', 
      primaryKey: 'true' 
    },
    order_id: { 
      type: 'varchar' 
    },
    recipient_id: {
      type: 'varchar' 
    },
    amount: {
      type: 'int' 
    },
    expected_payment_date: { 
      type: 'timestamp' 
    },
    payment_date: { 
      type: 'timestamp', 
      notNull: false
    },
    status: { 
      type: 'varchar', 
      default: 'waiting_payment' 
    },
    created_at: { 
      type: 'timestamp', 
      notNull: false 
    },
    updated_at: { 
      type: 'timestamp', 
      notNull: false 
    },
  });
};

exports.down = (knex) => {
  knex.dropTable('compensations');
};
