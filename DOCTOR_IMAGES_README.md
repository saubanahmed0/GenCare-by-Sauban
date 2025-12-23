# Adding Doctor Images

To add images for the doctors in the gallery, place JPG images in the following directory:

```
public/assets/doctors/
```

The images should be named as:
- `doctor-1.jpg`
- `doctor-2.jpg`
- `doctor-3.jpg`
- ... up to `doctor-50.jpg`

## Image Specifications:
- **Format**: JPG
- **Size**: 400x400 pixels recommended
- **Aspect Ratio**: Square (1:1)
- **Quality**: High quality for professional appearance

## Fallback:
If an image is missing, the system will automatically use a generated avatar based on the doctor's name.

## How to Add Images:
1. Find or create professional doctor photos
2. Resize them to 400x400 pixels
3. Save as JPG format
4. Name them according to the pattern above
5. Place them in `public/assets/doctors/` folder

The gallery will automatically display these images with proper fallbacks if any are missing.