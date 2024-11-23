import sharp from 'sharp';
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';

interface ImageConfig {
  width: number;
  quality: number;
  format: 'webp' | 'avif' | 'jpg';
}

const imageConfigs: Record<string, ImageConfig[]> = {
  thumbnail: [
    { width: 400, quality: 80, format: 'webp' },
    { width: 400, quality: 80, format: 'avif' },
    { width: 400, quality: 85, format: 'jpg' }
  ],
  hero: [
    { width: 1920, quality: 85, format: 'webp' },
    { width: 1920, quality: 85, format: 'avif' },
    { width: 1920, quality: 90, format: 'jpg' }
  ],
  project: [
    { width: 800, quality: 85, format: 'webp' },
    { width: 800, quality: 85, format: 'avif' },
    { width: 800, quality: 90, format: 'jpg' }
  ]
};

class ImageOptimizer {
  private readonly inputDir = 'src/assets/images';
  private readonly outputDir = 'src/assets/images/optimized';
  
  async optimize() {
    try {
      await fs.ensureDir(this.outputDir);
      const images = glob.sync(`${this.inputDir}/**/*.{jpg,jpeg,png}`);
      
      console.log(`Found ${images.length} images to optimize`);
      
      for (const image of images) {
        await this.processImage(image);
      }
      
      console.log('Image optimization completed successfully');
    } catch (error) {
      console.error('Error optimizing images:', error);
      process.exit(1);
    }
  }
  
  private async processImage(imagePath: string) {
    const filename = path.basename(imagePath, path.extname(imagePath));
    const imageType = this.getImageType(imagePath);
    const configs = imageConfigs[imageType] || imageConfigs.thumbnail;
    
    const sharpImage = sharp(imagePath)
      .rotate() // Auto-rotate based on EXIF data
      .withMetadata(); // Preserve metadata
      
    for (const config of configs) {
      const outputPath = this.getOutputPath(filename, config);
      
      await sharpImage
        .resize(config.width)
        .toFormat(config.format, { quality: config.quality })
        .toFile(outputPath);
        
      console.log(`Generated ${outputPath}`);
    }
  }
  
  private getImageType(imagePath: string): string {
    if (imagePath.includes('hero')) return 'hero';
    if (imagePath.includes('project')) return 'project';
    return 'thumbnail';
  }
  
  private getOutputPath(filename: string, config: ImageConfig): string {
    return path.join(
      this.outputDir,
      `${filename}-${config.width}w.${config.format}`
    );
  }
}

new ImageOptimizer().optimize();
