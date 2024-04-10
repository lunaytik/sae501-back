import { Test, TestingModule } from '@nestjs/testing';
import { VariantImagesService } from './variant-images.service';

describe('VariantImagesService', () => {
  let service: VariantImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantImagesService],
    }).compile();

    service = module.get<VariantImagesService>(VariantImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
