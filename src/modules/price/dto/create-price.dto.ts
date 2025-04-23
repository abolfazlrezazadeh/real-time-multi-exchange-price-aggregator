import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePriceDto {
    @IsString()
    exchangeName: string;
    @IsString()
    currencyPair: string;
    @IsNumber()
    price: number;
    @IsBoolean()
    isUpdated: boolean;

}
