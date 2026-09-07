import cv2
import numpy as np
import pytesseract

from PIL import Image
from pytesseract import Output


def create_variants(image_path):
    """
    Create multiple image variants for better OCR.
    """

    # Original image
    original = cv2.imread(image_path)

    if original is None:
        raise FileNotFoundError(
            f"Could not open image: {image_path}"
        )

    # Grayscale
    gray = cv2.cvtColor(
        original,
        cv2.COLOR_BGR2GRAY
    )

    # Resize 3x
    resized = cv2.resize(
        gray,
        None,
        fx=3,
        fy=3,
        interpolation=cv2.INTER_CUBIC
    )

    # Contrast enhancement
    enhanced = cv2.normalize(
        resized,
        None,
        0,
        255,
        cv2.NORM_MINMAX
    )

    # Otsu threshold
    _, otsu = cv2.threshold(
        enhanced,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )

    # Adaptive threshold
    adaptive = cv2.adaptiveThreshold(
        enhanced,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        11
    )

    # Mild denoising
    denoised = cv2.medianBlur(
        enhanced,
        3
    )

    return [
        ("gray", resized),
        ("enhanced", enhanced),
        ("otsu", otsu),
        ("adaptive", adaptive),
        ("denoised", denoised)
    ]


def get_ocr_result(image, psm):
    """
    Run Tesseract and calculate average word confidence.
    """

    text = pytesseract.image_to_string(
        image,
        lang="hin",
        config=f"--psm {psm}"
    ).strip()

    if not text:
        return "", 0.0

    data = pytesseract.image_to_data(
        image,
        lang="hin",
        config=f"--psm {psm}",
        output_type=Output.DICT
    )

    confidences = []

    for conf in data["conf"]:

        try:
            value = float(conf)

            if value >= 0:
                confidences.append(value)

        except (ValueError, TypeError):
            continue

    if confidences:
        average_confidence = (
            sum(confidences) / len(confidences)
        )
    else:
        average_confidence = 0.0

    return (
        text,
        average_confidence / 100
    )


def calculate_text_score(
    text,
    confidence
):
    """
    Select OCR output using confidence,
    land-record keywords and useful text.
    """

    if not text:
        return -1

    keywords = [
        "खसरा",
        "संख्या",
        "क्षेत्रफल",
        "स्वामी",
        "ग्राम",
        "जनपद",
        "जिला",
        "भूमि"
    ]

    keyword_count = 0

    for keyword in keywords:

        if keyword in text:
            keyword_count += 1

    devanagari_chars = sum(
        1
        for char in text
        if "\u0900" <= char <= "\u097F"
    )

    digits = sum(
        1
        for char in text
        if char.isdigit()
    )

    useful_text_score = min(
        (devanagari_chars + digits) / 120,
        1.0
    )

    keyword_score = (
        keyword_count / len(keywords)
    )

    score = (
        confidence * 0.55
        + keyword_score * 0.30
        + useful_text_score * 0.15
    )

    return score


def run_ocr(image_variants):
    """
    Try multiple preprocessing variants
    and multiple Tesseract modes.
    """

    best_text = ""
    best_confidence = 0.0
    best_score = -1
    best_variant = None
    best_psm = None

    psm_modes = [6, 11]

    for variant_name, image in image_variants:

        for psm in psm_modes:

            text, confidence = get_ocr_result(
                image,
                psm
            )

            score = calculate_text_score(
                text,
                confidence
            )

            if score > best_score:

                best_score = score
                best_text = text
                best_confidence = confidence
                best_variant = variant_name
                best_psm = psm

    return (
        best_text,
        round(best_confidence, 2),
        best_variant,
        best_psm
    )


def extract_text(image_path):
    """
    Backward-compatible function.
    """

    variants = create_variants(
        image_path
    )

    text, _, _, _ = run_ocr(
        variants
    )

    return text


def extract_text_with_confidence(image_path):
    """
    Return OCR text and OCR confidence.
    """

    variants = create_variants(
        image_path
    )

    text, confidence, _, _ = run_ocr(
        variants
    )

    return text, confidence


if __name__ == "__main__":

    image_path = (
        "ai/samples/land_record_15.png"
    )

    variants = create_variants(
        image_path
    )

    text, confidence, variant, psm = run_ocr(
        variants
    )

    print("------ OCR TEXT ------")
    print(text)

    print("\n------ OCR CONFIDENCE ------")
    print(confidence)

    print("\n------ BEST VARIANT ------")
    print(variant)

    print("\n------ BEST PSM ------")
    print(psm)