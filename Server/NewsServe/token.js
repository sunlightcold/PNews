const jwt = require('jsonwebtoken')

const secret = 'token'  //密钥

module.exports = {
    //签发token
    signToken: (userinfo) => {
        const token = jwt.sign({
            id: userinfo.id,
            username: userinfo.username,
        }, secret, { expiresIn: '24h' })

        return token
    },

    //解密token
    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}