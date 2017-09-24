/**
 * Created by yuhogyun on 2017. 5. 25..
 */

var Sequelize = require('sequelize');
import DbModel from './../model/dbModel';

export default class DbService {

  constructor(configObj) {
    this.configObj = configObj;
    this.sequelize = new Sequelize(configObj['dbName'] ,configObj['dbUsername'], configObj['dbPassword'],{
      host: 'localhost',
      dialect: 'postgresql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });
    this.model = new DbModel(this.sequelize);
  }

  createExampleInsert() {
    let newVerificationCode = this.model['user'].build({
      username: 'hogy',
      birthday: Date()
    });
    newVerificationCode.save().then(res => {
      console.log(res);
    }).catch((err) =>{
      console.log(err);
    });
  }

  sync() {
    return this.sequelize.sync();
  }
}