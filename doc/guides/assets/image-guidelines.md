# Image Guidelines

## Thumbnails

- Dimensions: 800x450px
- Aspect ratio: 16:9
- Format: WebP
- Quality: 80%
- Max file size: 70KB
- Color profile: sRGB

### Placeholder Generation

Use the following ImageMagick command to generate development placeholders:

```bash
convert -size 800x450 gradient:black \
  -font Helvetica -pointsize 40 -fill '#3b82f6' \
  -gravity center \
  -draw "text 0,0 'Portfolio App
Thumbnail Placeholder'" \
  -quality 80 \
  thumbnail.webp
```

## Full Screenshots

- Dimensions: 1920x1080px
- Other specifications remain the same as thumbnails
