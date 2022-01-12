var fs = require('fs'); 

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     // (B) READ CSV INTO STRING
    var data = fs.readFileSync("/Users/ahmadhasnain/Downloads/customers.csv", "utf8");
    let record_to_insert = [];
    // (C) STRING TO ARRAY
    data = data.split("\n"); // SPLIT ROWS
    for (let i in data) { // SPLIT COLUMNS
      data[i] = data[i].split(",");
      record_to_insert.push({firstName:data[i][0], lastName:data[i][1], email:data[i][2], password:data[i][3], createdAt : new Date(), updatedAt : new Date()})
    }

     await queryInterface.bulkInsert('Users', record_to_insert, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {
       where: {
         id: {
          [Op.between]: [18, 22]                   // BETWEEN 18 AND 22
         }
       }
     });
  }
};
