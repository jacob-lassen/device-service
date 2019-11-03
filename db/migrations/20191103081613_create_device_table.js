
exports.up = function(knex) {
    return knex.schema.withSchema('device').createTable('devices', function(table) {
        table.uuid('uuid');
        table.string('name').notNullable();
        table.string('mac').notNullable();
        table.string('ip').notNullable();
        table.timestamp('lastSeen').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.withSchema('device').dropTable('devices');
};
