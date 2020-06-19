const router = require('express').Router();
const { exec } = require("child_process");
const fs = require('fs');

module.exports = {
    product: router.use('/product', require('./product.routes')),
    user: router.use('/user', require('./user.routes')),
    // aslok: router.get('/aslok', (req,res) => {
    //     const {value1, value2} = req.body;
    //     fs.writeFile('parameter.json', JSON.stringify(), () => {
    //             exec('python norg.py', (err, result) => {
    //                 console.log(result);
    //                 res.json({
    //                     msg: 'Saya Dari Python',
    //                     hasil: +result.replace(/\r\n/, '')
    //                 })

    //             })
    //     })
    // })
}