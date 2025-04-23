import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { isJWT } from "class-validator";
import { AuthService } from '../auth.service';
import { Reflector } from "@nestjs/core";
import { skip_auth } from "src/common/decorators/skipAuth.decorator";
import { AuthMessages } from "src/common/messages/auth.messages";

@Injectable()
export class authGuard implements CanActivate {
    constructor(private authService: AuthService, private reflector:Reflector) { }
    async canActivate(context: ExecutionContext) {
        const isSkippedAuthorization = this.reflector.get<boolean>(skip_auth,context.getHandler())
        if(isSkippedAuthorization) return true
        const httpContext = context.switchToHttp();
        const request: Request = httpContext.getRequest<Request>();
        const token = this.extractUser(request);
        request.user = await this.authService.getUserFromAccessToken(token);
        return true;
    }
    protected extractUser(request:Request){
        const { authorization } = request.headers
        if (!authorization || authorization.trim() === "") throw new UnauthorizedException(AuthMessages.LoginIsRequired)
        const [bearer, token] = authorization.split(" ")
        if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) throw new UnauthorizedException(AuthMessages.LoginIsRequired)
        return token
    }
}