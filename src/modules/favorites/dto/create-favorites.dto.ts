import { IsOptional } from 'class-validator';

export class CreateFavoritesDto {
  @IsOptional()
  artists: string[];

  @IsOptional()
  albums: string[];

  @IsOptional()
  tracks: string[];
}
