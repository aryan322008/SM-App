import jwt from "jsonwebtoken"

const jwt_secret = "i am a billionaire"

export default async (req, res, next) => {
    const token = req.headers.authorization
    const isCustomAuth = token.length<500

    try {
        if(token && isCustomAuth){
            const data = jwt.verify(token, jwt_secret)

            req.user = data?.id
        }else{
            const data = jwt.decode(token)
            req.user = data?.sub
        }

        next()

    } catch (error) {
        return res.status(400).json(error);
    }



}

