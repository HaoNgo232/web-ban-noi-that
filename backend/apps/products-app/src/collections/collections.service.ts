import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
  GetCollectionDto,
  GetCollectionsQueryDto,
  GetCollectionsResponseDto,
} from '@app/dto/collection.dto';
import { PrismaService, Prisma } from '@app/prisma';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tạo collection mới
   */
  async create(
    createCollectionDto: CreateCollectionDto,
  ): Promise<GetCollectionDto> {
    const { productIds, ...collectionData } = createCollectionDto;

    const collection = await this.prisma.collection.create({
      data: {
        ...collectionData,
        products: productIds
          ? {
              create: productIds.map((productId) => ({
                productId,
              })),
            }
          : undefined,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return this.toDto(collection);
  }

  /**
   * Lấy danh sách collections
   */
  async findAll(
    query: GetCollectionsQueryDto,
  ): Promise<GetCollectionsResponseDto> {
    const where: Prisma.CollectionWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const collections = await this.prisma.collection.findMany({
      where,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: collections.map((c) => this.toDto(c)),
    };
  }

  /**
   * Tìm collection theo slug
   */
  async findBySlug(slug: string): Promise<GetCollectionDto> {
    const collection = await this.prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!collection) {
      throw new RpcException({
        statusCode: 404,
        message: 'Collection not found',
      });
    }

    return this.toDto(collection);
  }

  /**
   * Tìm collection theo ID
   */
  async findOne(id: string): Promise<GetCollectionDto> {
    const collection = await this.prisma.collection.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!collection) {
      throw new RpcException({
        statusCode: 404,
        message: 'Collection not found',
      });
    }

    return this.toDto(collection);
  }

  /**
   * Cập nhật collection
   */
  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<GetCollectionDto> {
    const { productIds, ...updateData } = updateCollectionDto;

    // Nếu có productIds, cập nhật quan hệ
    if (productIds) {
      // Xóa tất cả quan hệ cũ
      await this.prisma.collectionProduct.deleteMany({
        where: { collectionId: id },
      });

      // Tạo quan hệ mới
      await this.prisma.collectionProduct.createMany({
        data: productIds.map((productId) => ({
          collectionId: id,
          productId,
        })),
      });
    }

    const collection = await this.prisma.collection.update({
      where: { id },
      data: updateData,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return this.toDto(collection);
  }

  /**
   * Xóa collection
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    await this.prisma.collection.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Collection deleted successfully',
    };
  }

  /**
   * Convert Prisma model to DTO
   */
  private toDto(collection: any): GetCollectionDto {
    const products = collection.products?.map((cp: any) => {
      const product = cp.product;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        status: product.status,
        material: product.material,
        images: product.images ? JSON.parse(product.images) : [],
        discountPercentage: product.discountPercentage
          ? Number(product.discountPercentage)
          : undefined,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });

    return {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      image: collection.image,
      productCount: collection.products?.length || 0,
      products: products || [],
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }
}

