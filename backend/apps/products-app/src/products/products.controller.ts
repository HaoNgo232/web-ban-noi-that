import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductDto,
  GetProductsQueryDto,
  GetProductsResponseDto,
} from '@app/dto/product.dto';

/**
 * Message patterns cho Product microservice
 */
export const PRODUCT_PATTERNS = {
  CREATE: 'product.create',
  FIND_ALL: 'product.findAll',
  FIND_ONE: 'product.findOne',
  UPDATE: 'product.update',
  REMOVE: 'product.remove',
  UPDATE_STOCK: 'product.updateStock',
} as const;

/**
 * Payload types cho các message patterns
 */
interface UpdateProductPayload {
  id: string;
  data: UpdateProductDto;
}

interface UpdateStockPayload {
  id: string;
  quantity: number;
}

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Tạo sản phẩm mới
   */
  @MessagePattern(PRODUCT_PATTERNS.CREATE)
  async create(
    @Payload() createProductDto: CreateProductDto,
  ): Promise<GetProductDto> {
    return this.productsService.create(createProductDto);
  }

  /**
   * Lấy danh sách sản phẩm với filter, sort, pagination
   */
  @MessagePattern(PRODUCT_PATTERNS.FIND_ALL)
  async findAll(
    @Payload() query: GetProductsQueryDto,
  ): Promise<GetProductsResponseDto> {
    return this.productsService.findAll(query);
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   */
  @MessagePattern(PRODUCT_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string): Promise<GetProductDto> {
    return this.productsService.findOne(id);
  }

  /**
   * Cập nhật sản phẩm
   */
  @MessagePattern(PRODUCT_PATTERNS.UPDATE)
  async update(
    @Payload() payload: UpdateProductPayload,
  ): Promise<GetProductDto> {
    return this.productsService.update(payload.id, payload.data);
  }

  /**
   * Xóa sản phẩm
   */
  @MessagePattern(PRODUCT_PATTERNS.REMOVE)
  async remove(
    @Payload() id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.productsService.remove(id);
  }

  /**
   * Cập nhật tồn kho
   */
  @MessagePattern(PRODUCT_PATTERNS.UPDATE_STOCK)
  async updateStock(
    @Payload() payload: UpdateStockPayload,
  ): Promise<GetProductDto> {
    return this.productsService.updateStock(payload.id, payload.quantity);
  }
}
