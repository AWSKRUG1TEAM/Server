/**
 * Created by yuhogyun on 2017. 5. 25..
 */

var Sequelize = require('sequelize');

export default class DbModel {
  constructor(sequelize) {
    this.models = {};
    this.models['user'] = sequelize.define('user', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    });

    return this.models;
  }
}