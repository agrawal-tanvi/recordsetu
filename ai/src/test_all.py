import os
import json

from .main import run_pipeline


SAMPLES_DIR = "ai/samples"
OUTPUT_DIR = "ai/output/batch_results"


def test_all_samples():
    """
    Run the complete AI pipeline on all sample images.
    """

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    image_files = [
        file
        for file in os.listdir(SAMPLES_DIR)
        if file.lower().endswith(
            (".png", ".jpg", ".jpeg")
        )
    ]

    image_files.sort()

    print("\n========================================")
    print("           BATCH OCR TEST")
    print("========================================")

    print(
        f"Total images found: {len(image_files)}"
    )

    successful = 0
    failed = 0

    for filename in image_files:

        image_path = os.path.join(
            SAMPLES_DIR,
            filename
        )

        print("\n----------------------------------------")
        print(f"Processing: {filename}")
        print("----------------------------------------")

        try:

            result = run_pipeline(
                image_path
            )

            # Save individual JSON result
            output_file = os.path.join(
                OUTPUT_DIR,
                os.path.splitext(filename)[0] + ".json"
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

            # Check pipeline success
            if result["success"]:

                successful += 1
                print("✅ Pipeline completed")

            else:

                failed += 1
                print("❌ OCR failed")

            fields = result["fields"]

            print(
                f"   Khasra      : "
                f"{fields['khasra_no']}"
            )

            print(
                f"   Owner       : "
                f"{fields['owner_name']}"
            )

            print(
                f"   Village     : "
                f"{fields['village']}"
            )

            print(
                f"   District    : "
                f"{fields['district']}"
            )

            print(
                f"   Area        : "
                f"{fields['area']} "
                f"{fields['area_unit'] or ''}"
            )

            print(
                f"   OCR Conf.   : "
                f"{result['ocr_confidence']}"
            )

            print(
                f"   Final Conf. : "
                f"{fields['confidence']}"
            )

            # Show fields which could not be extracted
            missing_fields = []

            for field in [
                "khasra_no",
                "owner_name",
                "village",
                "district",
                "area",
                "area_unit"
            ]:

                value = fields.get(field)

                if value is None or str(value).strip() == "":
                    missing_fields.append(field)

            if missing_fields:

                print(
                    "   Missing     : "
                    + ", ".join(missing_fields)
                )

            else:

                print(
                    "   Missing     : None"
                )

        except Exception as error:

            failed += 1

            print(
                f"❌ Error: {error}"
            )

    # -------------------------------------------------
    # Summary
    # -------------------------------------------------

    print("\n========================================")
    print("                SUMMARY")
    print("========================================")

    print(
        f"Total images : {len(image_files)}"
    )

    print(
        f"Successful   : {successful}"
    )

    print(
        f"Failed       : {failed}"
    )

    print("\nResults saved in:")
    print(
        "ai/output/batch_results/"
    )


if __name__ == "__main__":
    test_all_samples()