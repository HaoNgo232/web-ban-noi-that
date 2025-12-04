import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollectionsService } from './collections.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
  GetCollectionDto,
  GetCollectionsQueryDto,
  GetCollectionsResponseDto,
} from '@app/dto/collection.dto';

const COLLECTION_PATTERNS = {
  CREATE: 'collection.create',
  FIND_ALL: 'collection.findAll',
  FIND_ONE: 'collection.findOne',
  FIND_BY_SLUG: 'collection.findBySlug',
  UPDATE: 'collection.update',
  REMOVE: 'collection.remove',
} as const;

interface UpdateCollectionPayload {
  id: string;
  data: UpdateCollectionDto;
}

@Controller()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @MessagePattern(COLLECTION_PATTERNS.CREATE)
  async create(
    @Payload() createCollectionDto: CreateCollectionDto,
  ): Promise<GetCollectionDto> {
    return this.collectionsService.create(createCollectionDto);
  }

  @MessagePattern(COLLECTION_PATTERNS.FIND_ALL)
  async findAll(
    @Payload() query: GetCollectionsQueryDto,
  ): Promise<GetCollectionsResponseDto> {
    return this.collectionsService.findAll(query);
  }

  @MessagePattern(COLLECTION_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string): Promise<GetCollectionDto> {
    return this.collectionsService.findOne(id);
  }

  @MessagePattern(COLLECTION_PATTERNS.FIND_BY_SLUG)
  async findBySlug(@Payload() slug: string): Promise<GetCollectionDto> {
    return this.collectionsService.findBySlug(slug);
  }

  @MessagePattern(COLLECTION_PATTERNS.UPDATE)
  async update(
    @Payload() payload: UpdateCollectionPayload,
  ): Promise<GetCollectionDto> {
    return this.collectionsService.update(payload.id, payload.data);
  }

  @MessagePattern(COLLECTION_PATTERNS.REMOVE)
  async remove(
    @Payload() id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.collectionsService.remove(id);
  }
}
