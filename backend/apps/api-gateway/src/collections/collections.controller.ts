import { Controller, Get, Param, Query, Inject } from '@nestjs/common';
import { BaseGatewayController } from '../base.controller';
import { ClientProxy } from '@nestjs/microservices';
import { GetCollectionsQueryDto } from '@app/dto/collection.dto';
import { Public } from '@app/jwt';

const COLLECTION_PATTERNS = {
  FIND_ALL: 'collection.findAll',
  FIND_ONE: 'collection.findOne',
  FIND_BY_SLUG: 'collection.findBySlug',
} as const;

@Controller('collections')
@Public()
export class CollectionsController extends BaseGatewayController {
  constructor(
    @Inject('PRODUCT_SERVICE') protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  /**
   * Lấy danh sách collections
   * GET /collections
   */
  @Get()
  findAll(@Query() query: GetCollectionsQueryDto) {
    return this.send(COLLECTION_PATTERNS.FIND_ALL, query);
  }

  /**
   * Lấy chi tiết collection theo slug
   * GET /collections/:slug
   */
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.send(COLLECTION_PATTERNS.FIND_BY_SLUG, slug);
  }
}

