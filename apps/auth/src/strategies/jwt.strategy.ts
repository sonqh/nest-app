import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configSevice: ConfigService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.Authentication;
                }
            ]),
            secretOrKey: configSevice.get('JWT_SECRET'),
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.getUser({ _id: payload.userId });
    }
}