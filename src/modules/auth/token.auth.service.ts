import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { cookiePayload } from "./types/payload";
import { AuthMessages } from "src/common/messages/auth.messages";

@Injectable()
export class TokenAuthService {
    constructor(
        private jwtService: JwtService
    ) {}
    async createOtpToken(payload: cookiePayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.OTP_TOKEN_SECRET,
            // 2 minuts
            expiresIn: 60 * 2
        })
    }
    async verifyAccessToken(token: string): Promise<cookiePayload> {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_SECRET
            })
        } catch (error) {
            throw new UnauthorizedException(AuthMessages.TryAgain)
        }
    }
    async createAccessToken(payload: cookiePayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            // 1 day
            expiresIn: "1d"
        })
    }
}


