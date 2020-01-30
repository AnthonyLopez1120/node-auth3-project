exports.up = function(knex) {
    return knex.schema
        .createTable('users', user => {
            user.increments();
            user.string('username')
                .unique()
                .notNullable();
            user.string('password')
                .notNullable();
            user.string('department')
                .notNullable();
        })
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users');
  };