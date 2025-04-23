import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({
        description: 'شماره موبایل',
        example: '09123456789',
    }) 
    @IsString()
    @IsMobilePhone('fa-IR')
    mobile: string;
}

export class CheckOtpDto {
    @ApiProperty({
        description: 'شماره موبایل',
        example: '09123456789',
    }) 
    @IsString()
    @IsMobilePhone('fa-IR')
    mobile: string;

    @ApiProperty({
        description: 'کد تایید',
        example: '123456',
    })
    @IsString()
    code: string;
}

