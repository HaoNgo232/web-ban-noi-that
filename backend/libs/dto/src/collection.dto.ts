import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  image: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  productIds?: string[];
}

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}

export class GetCollectionDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
  products?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetCollectionsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetCollectionsResponseDto {
  data: GetCollectionDto[];
}

