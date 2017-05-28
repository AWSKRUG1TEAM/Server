/**
 * Created by yuhogyun on 2017. 5. 25..
 */

var Sequelize = require('sequelize');
const DbModel = require('./../model/dbModel');

function DbService (configObj) {

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

  this.model = DbModel(this.sequelize);

}

DbService.prototype.createTest = function () {
  //this.model['user'].create({ username: 'fnord', job: 'omnomnom' });

  var newVerificationCode = this.model['user'].build({
    username: 'hogy',
    birthday: Date()
  });
  newVerificationCode.save().then(res => {
    console.log(res);
  }).catch((err) =>{
    console.log(err);
  });

};

DbService.prototype.sync = function (){
  return this.sequelize.sync();

};

module.exports = DbService;