import { IsNotEmpty } from 'class-validator';

export class userDto {
  @IsNotEmpty({ message: 'Логин не может быть пустым' })
  user: string;

  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Почта не может быть пустым' })
  email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
