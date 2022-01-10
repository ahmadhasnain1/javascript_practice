

// middleware that is specific to this router

const timeLog = (req, res, next) => {
  console.log('before timelog');   //pre
  console.log('Time: ', Date.now());
  next();
  console.log('after timelog');   //post
  return;
};

module.exports = {
  timeLog
}