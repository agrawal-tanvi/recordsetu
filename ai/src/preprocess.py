from PIL import Image, ImageEnhance, ImageFilter, ImageOps


def preprocess_image(image_path):
    # Open image
    image = Image.open(image_path)

    # Convert to grayscale
    image = image.convert("L")

    # Resize image
    image = image.resize(
        (image.width * 4, image.height * 4)
    )

    # Improve contrast
    image = ImageEnhance.Contrast(image).enhance(2.5)

    # Sharpen
    image = image.filter(ImageFilter.SHARPEN)

    # Convert to black and white
    image = ImageOps.autocontrast(image)

    image = image.point(
        lambda p: 0 if p < 180 else 255
    )

    return image