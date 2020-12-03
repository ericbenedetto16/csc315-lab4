'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "weather", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initdb",
    "created": "2020-12-03T05:50:53.169Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "weather",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "allowNull": false,
                "autoIncrement": true,
                "primaryKey": true
            },
            "city": {
                "type": Sequelize.TEXT,
                "field": "city",
                "unique": "city_state",
                "allowNull": false
            },
            "zip": {
                "type": Sequelize.INTEGER,
                "field": "zip",
                "allowNull": false
            },
            "temperature_f": {
                "type": Sequelize.FLOAT,
                "field": "temperature_f",
                "allowNull": false
            },
            "pressure": {
                "type": Sequelize.FLOAT,
                "field": "pressure",
                "allowNull": false
            },
            "humidity": {
                "type": Sequelize.FLOAT,
                "field": "humidity",
                "allowNull": false
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
