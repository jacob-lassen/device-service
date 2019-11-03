
exports.up = function(knex) {
    const raw = `CREATE schema device`;
    return knex.schema.raw(raw);
};

exports.down = function(knex) {
    const raw = `DROP schema \`device\``;
    return knex.schema.raw(raw);
};
