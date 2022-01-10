

// middleware that is specific to this router

module.exports = function timeLog(req, res, next)  {
    console.log('Time: ', Date.now());
    next();
  };