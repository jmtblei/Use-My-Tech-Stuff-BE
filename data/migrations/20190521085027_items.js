
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable("items", item => {
      item.increments();
      item
        .integer("owner")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      item
        .string("title")
        .notNullable();
      item
        .string("type")
        .notNullable();
      item
        .text("description", 'longtext')
        .notNullable();
      item
        .integer("price")
        .notNullable();
      item
        .boolean("availability")
        .notNullable();
      item
        .string("brand");
      item
        .string("model");
      item
        .text("imgURL", 'longtext');
      item
        .integer("renter")
        .unsigned()
        .references("id")
        .inTable("users");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists("items")
};
