

namespace NodeJS {
    interface ProcessEnv {
        //applicationn
        PORT: number
        //dataBase
        MONGODB_URI: string
        BASE_URL: string
        //cookie
        JWT_SECRET: string
        OTP_TOKEN_SECRET: string
        // accessToken
        ACCESS_TOKEN_SECRET: string
        EMAIL_TOKEN_SECRET: string
        PHONE_TOKEN_SECRET: string
    }

}