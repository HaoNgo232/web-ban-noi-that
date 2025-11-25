import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { BaseGatewayController } from '../base.controller';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductsQueryDto,
} from '@app/dto/product.dto';

/**
 * Message patterns - phải match với microservice
 */
const PRODUCT_PATTERNS = {
  CREATE: 'product.create',
  FIND_ALL: 'product.findAll',
  FIND_ONE: 'product.findOne',
  UPDATE: 'product.update',
  REMOVE: 'product.remove',
  UPDATE_STOCK: 'product.updateStock',
} as const;

@Controller('products')
export class ProductsController extends BaseGatewayController {
  constructor(
    @Inject('PRODUCT_SERVICE') protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  /**
   * Tạo sản phẩm mới
   * POST /products
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.send(PRODUCT_PATTERNS.CREATE, createProductDto);
  }

  /**
   * Lấy danh sách sản phẩm với filter, pagination
   * GET /products?page=1&limit=20&category=SOFA&search=...
   */
  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    return this.send(PRODUCT_PATTERNS.FIND_ALL, query);
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   * GET /products/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.send(PRODUCT_PATTERNS.FIND_ONE, id);
  }

  /**
   * Cập nhật sản phẩm
   * PATCH /products/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.send(PRODUCT_PATTERNS.UPDATE, { id, data: updateProductDto });
  }

  /**
   * Xóa sản phẩm
   * DELETE /products/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.send(PRODUCT_PATTERNS.REMOVE, id);
  }

  /**
   * Cập nhật số lượng tồn kho
   * PATCH /products/:id/stock
   */
  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.send(PRODUCT_PATTERNS.UPDATE_STOCK, { id, quantity });
  }
}
