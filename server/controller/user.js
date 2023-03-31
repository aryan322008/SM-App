import authModal from "../models/authModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const saltRounds = 10;
const jwt_secret = "i am a billionaire"

const register = async (req, res) => {
    const formData = req.body

    const user = await authModal.findOne({ email: formData.email })

    try {
        if (user) {
            return res.status(404).json({ message: "user already exists" })
        }

        if (!formData.userFromGoogle) {
            if (formData.confirmPassword !== formData.password) {
                return res.status(404).json({ message: "password doesn't match" })
            }

            const salt = bcrypt.genSaltSync(saltRounds);

            const cryptedPass = bcrypt.hashSync(formData.password, salt);

            const newUser = await authModal.create({ email:formData.email, name: `${formData.firstName} ${formData.lastName}`, password: cryptedPass });

            const userObj = { id: newUser.id }

            const token = jwt.sign(userObj, jwt_secret);

            const {email,name,id:_id} = newUser

            res.status(200).send({ token, newUser:{email,name,id:_id} } )

        } else {

            const newUser = await authModal.create({ email:formData.email, name:formData.name,password:"userFromGoogle" });

            const userObj = { id: newUser.id }

            const token = jwt.sign(userObj, jwt_secret);

            const {email,name,id:_id} = newUser

            res.status(200).send({ token, newUser:{email,name,id:_id}  })
        }


    } catch (error) {
        res.status(404).json({ message: error })
    }

}

const login = async (req, res) => {
    const { userFromGoogle, email, password } = req.body

    try {

        const user = await authModal.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "user doesn't exists" })
        }

        if (!userFromGoogle) {
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(404).json({ message: "Wrong Credentials" })
            }

        }

        const userObj = { id: user.id }

        const token = jwt.sign(userObj, jwt_secret);

        res.status(201).send({
            token, newUser:
            {
                email: user.email,
                id: user.id,
                name: user.name
            }
        })

    } catch (error) {
        res.status(404).send(error)
    }

}



export { register, login }