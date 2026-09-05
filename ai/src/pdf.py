import os

from pdf2image import convert_from_path

from .main import run_pipeline


def pdf_to_images(pdf_path, output_dir="ai/output/pdf_pages"):
    """
    Convert PDF pages into PNG images.
    """

    os.makedirs(
        output_dir,
        exist_ok=True
    )

    pages = convert_from_path(
        pdf_path,
        dpi=300
    )

    image_paths = []

    for index, page in enumerate(pages):

        image_path = os.path.join(
            output_dir,
            f"page_{index + 1}.png"
        )

        page.save(
            image_path,
            "PNG"
        )

        image_paths.append(
            image_path
        )

    return image_paths


def process_pdf(pdf_path):
    """
    Complete PDF pipeline:

    PDF
      ↓
    Pages → Images
      ↓
    OCR
      ↓
    Field Extraction
      ↓
    JSON
    """

    image_paths = pdf_to_images(
        pdf_path
    )

    results = []

    for image_path in image_paths:

        result = run_pipeline(
            image_path
        )

        results.append(
            result
        )

    return {
        "success": True,
        "source": pdf_path,
        "pages": results
    }


if __name__ == "__main__":

    pdf_path = "ai/samples/land_record.pdf"

    result = process_pdf(
        pdf_path
    )

    print("\n========== PDF RESULT ==========\n")

    import json

    print(
        json.dumps(
            result,
            ensure_ascii=False,
            indent=2
        )
    ) 
    