exports.seed = function(knex) {
  return knex('users').insert([
      {
          username: 'admin',
          password: "admin_pw",
          department: "Corporate"
      },
      {
          username: 'user',
          password: "user_pw",
          department: "Back Office"
      },
      {
          username: 'me',
          password: "me_pw",
          department: "Front Office"
      }
  ]);
};