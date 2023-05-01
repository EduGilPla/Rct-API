import { Trim } from "class-sanitizer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {
  @Trim()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string

  @Trim()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @Trim()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string
}