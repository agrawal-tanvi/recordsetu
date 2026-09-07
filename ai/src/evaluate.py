import json
import os

from .main import run_pipeline


SAMPLES_DIR = "ai/samples"
GROUND_TRUTH_FILE = os.path.join(
    SAMPLES_DIR,
    "ground_truth.json"
)

FIELDS = [
    "khasra_no",
    "owner_name",
    "village",
    "district",
    "area",
    "area_unit"
]


def normalize_text(value):
    if value is None:
        return ""

    value = str(value).strip().lower()
    value = " ".join(value.split())

    return value


def normalize_area(value):
    if value is None:
        return ""

    value = str(value).strip().replace(",", ".")

    return value


def normalize_area_unit(value):
    if value is None:
        return ""

    value = str(value).strip().lower()

    replacements = {
        "हे0": "हे०",
        "हेo": "हे०",
        "हे॰": "हे०",
        "हे.": "हे०",
        "he": "हे०",
        "ha": "हे०",
        "hectare": "हे०"
    }

    return replacements.get(value, value)


def normalize_field(field, value):

    if field == "area":
        return normalize_area(value)

    if field == "area_unit":
        return normalize_area_unit(value)

    return normalize_text(value)


def evaluate():

    with open(
        GROUND_TRUTH_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        ground_truth = json.load(file)

    # Store statistics for every field
    field_stats = {
        field: {
            "correct": 0,
            "total": 0
        }
        for field in FIELDS
    }

    total_correct = 0
    total_fields = 0

    print("\n========================================")
    print("          AI FIELD EVALUATION")
    print("========================================")

    for record in ground_truth:

        filename = record.get("filename")

        if not filename:
            print("⚠️ Filename missing")
            continue

        image_path = os.path.join(
            SAMPLES_DIR,
            filename
        )

        if not os.path.exists(image_path):

            print(
                f"⚠️ Missing image: {filename}"
            )

            continue

        result = run_pipeline(image_path)
        predicted = result["fields"]

        record_correct = 0

        for field in FIELDS:

            expected = normalize_field(
                field,
                record.get(field)
            )

            actual = normalize_field(
                field,
                predicted.get(field)
            )

            field_stats[field]["total"] += 1
            total_fields += 1

            if expected == actual:

                field_stats[field]["correct"] += 1
                total_correct += 1
                record_correct += 1

        record_accuracy = (
            record_correct / len(FIELDS)
        )

        print(
            f"{filename:22} "
            f"Accuracy: {record_accuracy:.0%}"
        )

    # -------------------------------------------------
    # Final report
    # -------------------------------------------------

    print("\n========================================")
    print("         FIELD-WISE ACCURACY")
    print("========================================")

    for field in FIELDS:

        correct = field_stats[field]["correct"]
        total = field_stats[field]["total"]

        accuracy = (
            correct / total
            if total
            else 0
        )

        print(
            f"{field:15} "
            f"{correct}/{total} "
            f"({accuracy:.2%})"
        )

    overall_accuracy = (
        total_correct / total_fields
        if total_fields
        else 0
    )

    print("\n========================================")
    print("               SUMMARY")
    print("========================================")

    print(
        f"Total fields checked : "
        f"{total_fields}"
    )

    print(
        f"Correct fields       : "
        f"{total_correct}"
    )

    print(
        f"Overall accuracy     : "
        f"{overall_accuracy:.2%}"
    )


if __name__ == "__main__":
    evaluate()