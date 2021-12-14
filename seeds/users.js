exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
  .then(() => {
    return knex('users').del()

    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'martin' , password: '123321'},
        {username:'peter' , password: '123321'},
        {username:'mary' , password: '123321'},
        {username:'tom' , password: '123321'},
      ])
      .then(() => {
        return knex('notes').insert([
          {content:'jjj', user_id:'1'},
          {content:'abcd', user_id:'2'},
          {content:'onetwothree', user_id:'3'},
          {content:'321', user_id:'4'}
        ])
      })
    });
  });
};
