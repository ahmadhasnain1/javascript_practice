const printHelloWorld = (req, res, next) => {
    res.send('\n hello world')
};


module.exports = {
    printHelloWorld
};