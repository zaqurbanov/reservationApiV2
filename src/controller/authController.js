const Result = require("../enums/resultGenerate");
const refreshTokenModel = require("../model/refreshTokenModel");
const userModel = require("../model/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require('../nodeemailer/mailer');
const { JWT_KEY, PORT } = require("../env/env");
const { validationResult } = require("express-validator");
const createAuditLog = require("../utils/createAuditLog");


const login = async (req, res, next) => {

    const { email, password } = req.body
    try {

        //userin emailine gore sorgu edirik.
        const user = await userModel.findOne({ email })

        // bele bir email yoxdursa ozaman bu emailin qeydiyyatinin olmdigini bildiririk.
        if (!user) {
            const error = new Error("Email not found")
            error.statusCode = 404
            return next(error)
        }

        // user tapilirsa  o zaman sifreni eynilesdiririk.
        const compareHash = await bcrypt.compare(password, user.password);

        // sifre eynilesdirilen zaman false netice verirse . istifadeciye error qaytaririq
        if (!compareHash) {
            const error = new Error("incorrect Password")
            error.statusCode = 404
            return next(error)
        }

        // eger email varsa ve parol eynilesibse o zaman token yaradiriq.
        const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: '15m' });
        // sessiyani qorumaq ucun elave olaraq refreshtoken yaradiriq.
        const refreshToken = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: '7d' })

        // refresh tokeni uzunmudetli saxlamaq ucun ve tehlukesiz saxlamaq ucun onu modelde saxlayiriq. ve birbasa cookiye gonderirik. 
        const newRefreshToken = new refreshTokenModel({ token: refreshToken, userId: user._id })
        await newRefreshToken.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        await createAuditLog({
            action:"LOGIN",
            userId:user._id,
            resource:"User",
            resourceId:user._id
        })
        return Result.success(res, { accessToken: token }, 200)



    } catch (error) {

        next(error)
    }

}

const register = async (req, res, next) => {
// express validatordan istifade edilib. req parametrini gonderirik ki gelen melumatlara uygun olaraq validasiya errorlarinin olub omadigini yoxlasin
    const errors = validationResult(req)

    // eger errors objecti bos deyilse o zaman validasiyadan kecmediyini gosterir. ve expressin error handling (merkezlesdirilmis error funksiyasi ile yeni bir error yaradiriq ona mesaj parametri oturub. next ile gonderirik.)
    if (!errors.isEmpty()) {
        const error = new Error("Validation Error")
        error.errors = errors.array()
        return next(error)

    }
    const { name, email, password } = req.body;

    try {
        // istifadecinin daxil etdiyi emailin database de olub olmadigini  yaxlayiriq. ve ona uygun olaraq xeta qaytaririq.
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const error = new Error("user already exists")
            error.statusCode = 400
            return next(error)
        }
        // email movcud deyilse yeni istifadeci yaradiriq. 
        const newUser = new userModel({ name, email, password })
        await newUser.save();
        return Result.success(res, { name, email }, 200)
    } catch (error) {
        next(error)
    }
}
const refreshToken = async (req, res,next) => {
    //cookie parse ile cookieden tokeni aliriq. ve refresh token yoxdursa istifadecini melumatlandiririq
    const token = req.cookies.refreshToken
    try {
        const isExsistingToken = await refreshTokenModel.findOne({ token }).populate("userId");
        if (!isExsistingToken) {
            const error = new Error("token not found");
            error.statusCode = 401
            return next(error);

        }

        const verifyToken = jwt.verify(token, JWT_KEY)


        const accessToken = jwt.sign({ id: verifyToken.id }, JWT_KEY, { expiresIn: '15m' })
        return Result.success(res, { token: accessToken }, 200)
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res,next) => {
    const refreshToken = req.cookies.refreshToken

    try {
        const deleteToken = await refreshTokenModel.findOneAndDelete({ token: refreshToken });
        if (!deleteToken) {
            const error = new Error("Token Not found")
            error.statusCode = 401
            return next(error)

        }

        res.clearCookie('refreshToken')
        await createAuditLog({
            action:"LOGIN",
            userId:user._id,
            resource:"User",
            resourceId:user._id
        })
        return Result.success(res, null)
    } catch (error) {
        next(error)
    }
}

const forgetPassword = async (req, res,next) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            const error = new Error("user Not found")
            error.statusCode = 401;
            return next(error)
        }
        const resetToken = jwt.sign({ email }, JWT_KEY, { expiresIn: '10m' })
        const resetUrl = `http://localhost:${PORT}/reset-password/${resetToken}`
        const mailOptions = {
            from: "Reset passwword  ",
            to: email,
            subject: "reset password token",
            html: `
            <p>Parolu sıfırlamaq üçün aşağıdakı linkə klikləyin:</p>
            <a  href="${resetUrl}">Parolu sıfırla</a>
          `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                const errors = new Error("message unsuccessfully")
                errors.statusCode = 404;
                errors.errors = error;
                return next(errors)
            } else {
                return Result.success(res, resetUrl, 200)
            }
        })

    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res,next) => {
    const { resetToken } = req.params
    const { password } = req.body
    try {
        const decoded = jwt.verify(resetToken, JWT_KEY)
        const email = decoded.email
        const user = await userModel.findOne({ email });

        user.password = password;
        await user.save();
        return Result.success(res, "paswword already changed")
    } catch (error) {
   next(error)
    }


}
module.exports = {
    login,
    register,
    refreshToken,
    logout,
    forgetPassword,
    resetPassword

}