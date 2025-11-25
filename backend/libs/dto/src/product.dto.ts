import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum ProductCategory {
  SOFA = 'SOFA',
  TABLE = 'TABLE',
  CHAIR = 'CHAIR',
  BED = 'BED',
  CABINET = 'CABINET',
  SHELF = 'SHELF',
  LIGHTING = 'LIGHTING',
  DECORATION = 'DECORATION',
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @IsString()
  @IsOptional()
  material?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPercentage?: number;
}

/**
 * DTO để cập nhật sản phẩm - tất cả fields optional
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}

// Hoặc nếu muốn loại bỏ một vài field:
// export class UpdateProductDto extends OmitType(
//   PartialType(CreateProductDto),
//   ['createdAt']
// ) {}

// Hoặc chỉ chọn một số field:
// export class UpdateProductStockOnlyDto extends PickType(
//   PartialType(CreateProductDto),
//   ['stock']
// ) {}

export class GetProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: ProductCategory;
  material?: string;
  images?: string[];
  discountPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GetProductsQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'createdAt' | 'name';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}

export class GetProductsResponseDto {
  data: GetProductDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
