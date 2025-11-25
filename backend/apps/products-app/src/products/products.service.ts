import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductDto,
  GetProductsQueryDto,
  GetProductsResponseDto,
} from '@app/dto/product.dto';
import {
  PrismaService,
  Product,
  ProductStatus,
  ProductCategory,
  Prisma,
} from '@app/prisma';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tạo sản phẩm mới
   * @param createProductDto - Dữ liệu sản phẩm cần tạo
   * @returns Sản phẩm đã được tạo
   */
  async create(createProductDto: CreateProductDto): Promise<GetProductDto> {
    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        category: createProductDto.category as ProductCategory,
        material: createProductDto.material,
        images: createProductDto.images ?? [],
        discountPercentage: createProductDto.discountPercentage ?? 0,
        status: ProductStatus.ACTIVE,
      },
    });

    return this.toDto(product);
  }

  /**
   * Lấy danh sách sản phẩm với pagination, filter và sort
   * @param query - Query parameters cho filter, sort, pagination
   * @returns Danh sách sản phẩm với thông tin phân trang
   */
  async findAll(query: GetProductsQueryDto): Promise<GetProductsResponseDto> {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    // Build where clause
    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = category as ProductCategory;
    }

    if (status) {
      where.status = status as ProductStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy
    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Get total count
    const total = await this.prisma.product.count({ where });

    // Get paginated data
    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: products.map((p) => this.toDto(p)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Tìm sản phẩm theo ID
   * @param id - ID của sản phẩm
   * @returns Sản phẩm tìm được
   * @throws RpcException nếu không tìm thấy
   */
  async findOne(id: string): Promise<GetProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new RpcException({
        statusCode: 404,
        message: `Sản phẩm với ID "${id}" không tồn tại`,
      });
    }

    return this.toDto(product);
  }

  /**
   * Cập nhật sản phẩm
   * @param id - ID của sản phẩm cần cập nhật
   * @param updateProductDto - Dữ liệu cập nhật
   * @returns Sản phẩm đã cập nhật
   * @throws RpcException nếu không tìm thấy
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<GetProductDto> {
    // Check if product exists
    const existing = await this.prisma.product.findUnique({ where: { id } });

    if (!existing) {
      throw new RpcException({
        statusCode: 404,
        message: `Sản phẩm với ID "${id}" không tồn tại`,
      });
    }

    // Build update data
    const updateData: Prisma.ProductUpdateInput = {};

    if (updateProductDto.name !== undefined) {
      updateData.name = updateProductDto.name;
    }
    if (updateProductDto.description !== undefined) {
      updateData.description = updateProductDto.description;
    }
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price;
    }
    if (updateProductDto.stock !== undefined) {
      updateData.stock = updateProductDto.stock;
    }
    if (updateProductDto.category !== undefined) {
      updateData.category = updateProductDto.category as ProductCategory;
    }
    if (updateProductDto.status !== undefined) {
      updateData.status = updateProductDto.status as ProductStatus;
    }
    if (updateProductDto.material !== undefined) {
      updateData.material = updateProductDto.material;
    }
    if (updateProductDto.images !== undefined) {
      updateData.images = updateProductDto.images;
    }
    if (updateProductDto.discountPercentage !== undefined) {
      updateData.discountPercentage = updateProductDto.discountPercentage;
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: updateData,
    });

    return this.toDto(product);
  }

  /**
   * Xóa sản phẩm
   * @param id - ID của sản phẩm cần xóa
   * @returns Thông báo xóa thành công
   * @throws RpcException nếu không tìm thấy
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new RpcException({
        statusCode: 404,
        message: `Sản phẩm với ID "${id}" không tồn tại`,
      });
    }

    await this.prisma.product.delete({ where: { id } });

    return {
      success: true,
      message: `Đã xóa sản phẩm "${product.name}" thành công`,
    };
  }

  /**
   * Cập nhật stock của sản phẩm (helper method)
   * @param id - ID sản phẩm
   * @param quantity - Số lượng thay đổi (có thể âm)
   * @returns Sản phẩm đã cập nhật
   */
  async updateStock(id: string, quantity: number): Promise<GetProductDto> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new RpcException({
        statusCode: 404,
        message: `Sản phẩm với ID "${id}" không tồn tại`,
      });
    }

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw new RpcException({
        statusCode: 400,
        message: `Số lượng tồn kho không đủ. Hiện có: ${product.stock}, yêu cầu: ${Math.abs(quantity)}`,
      });
    }

    const newStatus =
      newStock === 0 ? ProductStatus.OUT_OF_STOCK : ProductStatus.ACTIVE;

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        stock: newStock,
        status: newStatus,
      },
    });

    return this.toDto(updatedProduct);
  }

  /**
   * Convert Prisma Product entity sang DTO
   */
  private toDto(product: Product): GetProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
      stock: product.stock,
      status: product.status as GetProductDto['status'],
      category: product.category as GetProductDto['category'],
      material: product.material ?? undefined,
      images: product.images,
      discountPercentage: product.discountPercentage?.toNumber(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
