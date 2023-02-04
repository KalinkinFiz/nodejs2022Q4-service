import { PartialType } from '@nestjs/swagger';

import { CreateFavoritesDto } from './create-favorites.dto';

export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {}
