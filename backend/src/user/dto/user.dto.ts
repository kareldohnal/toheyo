import { IsString } from 'class-validator';

export class NewUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}
