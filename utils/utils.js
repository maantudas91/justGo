// Getting validation messsages in array
exports.handleValidationError = function (err, res, consoleLog = false){
  const messages = [];
  for (let field in err.errors) {
    const obj = {}
    obj[field] = err.errors[field].message;
    messages.push(obj);
    consoleLog && console.log(err.errors[field].message);
  }
  res.status(422).jsonp({ messages })
}