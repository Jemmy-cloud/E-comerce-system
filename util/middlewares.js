const jwt = require('jsonwebtoken');

exports.checkUserAuth = (request , response , next) => {
    
    const token = request.body.token

    if (!token) {
        return response.status(401).json({
            status:"error",
            msg:"401 not Auth"
        })
    }else{
        jwt.verify(token, '123456', (error, data) => {
            if (error) {
                return response.status(401).json({
                    status:"error",
                    msg:"401 not Auth"
                })
            } else {
                next()
            }
        })
        
    }
}


exports.checkAdminAuth = (request, response, next) => {

    const headerData = request.headers.authorization.split(" ")
    const token = headerData[1]


    if (!token) {
        return response.status(401).json({
            status:"error",
            msg:"401 not Auth"
        })
    }else{
        jwt.verify(token, '12345', (error, data) => {
            if (error) {
                return response.status(401).json({
                    status:"error",
                    msg:"401 not Auth"
                })
            } else {
                next()
            }
        })        
    }
    
}