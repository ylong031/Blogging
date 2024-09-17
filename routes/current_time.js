var moment = require('moment')

exports.myDateTime = function () {
  var formatter= 'YYYY-MM-DD / HH:mm:ss';
  var date = new Date();
  var time = moment(date).format(formatter);
    return time;
  };

  
  