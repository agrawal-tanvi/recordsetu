import os
import shutil
import sys
from pathlib import Path

from pdf2image import convert_from_path

# Ensure UTF-8 output streams especially in Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
if hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from .main import run_pipeline


def get_poppler_path():
    """
    Resolve Poppler binary path reliably across environments.

    Resolution order:
    1. Explicit environment variable: POPPLER_PATH
    2. System PATH (standard for Linux/Docker deployments with poppler-utils)
    3. Common Windows install locations
    4. User directory fallbacks if present
    """
    env_path = os.environ.get("POPPLER_PATH")
    if env_path and os.path.exists(env_path):
        return env_path

    # If pdftoppm is directly available in PATH, return None so pdf2image uses system PATH
    if shutil.which("pdftoppm"):
        return None

    # Common Windows directories
    search_dirs = [
        r"C:\Program Files\poppler\Library\bin",
        r"C:\Program Files\poppler\bin",
        r"C:\Program Files (x86)\poppler\Library\bin",
        r"C:\Program Files (x86)\poppler\bin",
        r"C:\poppler\Library\bin",
        r"C:\poppler\bin",
    ]

    # Optional local user directories for developer convenience
    user_home = Path.home()
    try:
        local_candidates = list(user_home.glob("Downloads/**/Library/bin")) + list(
            user_home.glob("Downloads/**/poppler*/bin")
        )
        for candidate in local_candidates:
            search_dirs.append(str(candidate))
    except Exception:
        pass

    for directory in search_dirs:
        if os.path.isdir(directory):
            if (
                os.path.exists(os.path.join(directory, "pdftoppm.exe"))
                or os.path.exists(os.path.join(directory, "pdftoppm"))
            ):
                return directory

    return None


def pdf_to_images(pdf_path, output_dir="ai/output/pdf_pages", poppler_path=None):
    """
    Convert PDF pages into PNG images.
    """

    os.makedirs(
        output_dir,
        exist_ok=True
    )

    if poppler_path is None:
        poppler_path = get_poppler_path()

    kwargs = {"dpi": 300}
    if poppler_path:
        kwargs["poppler_path"] = poppler_path

    try:
        pages = convert_from_path(
            pdf_path,
            **kwargs
        )
    except Exception as error:
        err_str = str(error)
        if "poppler" in err_str.lower() or "pdfinfo" in err_str.lower():
            raise RuntimeError(
                f"Poppler is required to process PDF documents but was not found or failed to execute. "
                f"Please ensure poppler is installed (e.g., 'apt-get install poppler-utils' in Linux/Docker) "
                f"or set the POPPLER_PATH environment variable. Underlying error: {error}"
            ) from error
        raise

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


def process_pdf(pdf_path, poppler_path=None):
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
        pdf_path,
        poppler_path=poppler_path
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

    pdf_path = (
        sys.argv[1]
        if len(sys.argv) > 1
        else (
            "ai/samples/land_record_test.pdf"
            if os.path.exists("ai/samples/land_record_test.pdf")
            else "ai/samples/land_record.pdf"
        )
    )

    result = process_pdf(
        pdf_path
    )

    print("\n========== PDF RESULT ==========\n")

    import json

    try:
        print(
            json.dumps(
                result,
                ensure_ascii=False,
                indent=2
            )
        )
    except UnicodeEncodeError:
        print(
            json.dumps(
                result,
                ensure_ascii=True,
                indent=2
            )
        )