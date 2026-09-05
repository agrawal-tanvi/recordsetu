import json
import os
import sys

from .ocr import extract_text_with_confidence
from .extractor import extract_fields


def run_pipeline(image_path):
    """
    Complete AI pipeline:

    Image
       ↓
    Preprocessing
       ↓
    OCR
       ↓
    OCR Confidence
       ↓
    Field Extraction
       ↓
    Final Confidence
       ↓
    JSON
    """

    # Step 1: OCR + actual OCR confidence
    text, ocr_confidence = extract_text_with_confidence(
        image_path
    )

    # Step 2: Extract important fields
    fields = extract_fields(
        text,
        ocr_confidence
    )

    # Step 3: Prepare final result
    result = {
        "success": bool(text.strip()),
        "source": image_path,
        "ocr_text": text.strip(),
        "ocr_confidence": ocr_confidence,
        "fields": fields
    }

    return result


def save_result(result):
    """
    Save final JSON result inside ai/output.
    """

    output_dir = "ai/output"

    os.makedirs(
        output_dir,
        exist_ok=True
    )

    output_file = os.path.join(
        output_dir,
        "result.json"
    )

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            result,
            file,
            ensure_ascii=False,
            indent=2
        )

    return output_file


if __name__ == "__main__":

    if len(sys.argv) < 2:

        print(
            "Usage: python -m ai.src.main <image_path>"
        )

        sys.exit(1)

    image_path = sys.argv[1]

    try:

        result = run_pipeline(
            image_path
        )

        output_file = save_result(
            result
        )

        print(
            "\n========== FINAL JSON ==========\n"
        )

        print(
            json.dumps(
                result,
                ensure_ascii=False,
                indent=2
            )
        )

        print(
            "\n================================"
        )

        print(
            f"✅ JSON saved to: {output_file}"
        )

    except Exception as error:

        print(
            "\n❌ Error:",
            str(error)
        )

        sys.exit(1)