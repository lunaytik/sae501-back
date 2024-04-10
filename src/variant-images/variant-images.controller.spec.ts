import { Test, TestingModule } from '@nestjs/testing';
import { VariantImagesController } from './variant-images.controller';
import { VariantImagesService } from './variant-images.service';

describe('VariantImagesController', () => {
  let controller: VariantImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantImagesController],
      providers: [VariantImagesService],
    }).compile();

    controller = module.get<VariantImagesController>(VariantImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
