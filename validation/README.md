# AbhilekhSetu – Validation Dataset & Test Cases

## Purpose

This folder contains synthetic test data and validation rule definitions for the AbhilekhSetu prototype.

## Important Disclaimer

> ⚠️ **All data in this folder is synthetic / fictional.**  
> It is created **only for prototype development, testing, and demonstration purposes.**  
> It does **not** contain real citizen data or actual government land records.

## Files

| File | Description |
|------|-------------|
| `land_records.csv` | 30 synthetic land records with expected validation outcomes |
| `validation_rules.md` | Documentation of all validation rules |
| `validation_test_cases.md` | Test cases covering positive and negative scenarios |
| `expected_validation_results.json` | Expected validation output for selected records |

## Dataset Summary

| Metric | Count |
|--------|-------|
| Total Records | 30 |
| Valid Records | 12 |
| INVALID (Missing Khasra) | 4 |
| INVALID (Missing Owner) | 4 |
| INVALID (Missing Village) | 3 |
| INVALID (Missing District) | 3 |
| INVALID (Invalid Area) | 3 |
| REVIEW_REQUIRED (Low Confidence) | 3 |

## How to Use

1. Load `land_records.csv` as input to the validation test harness.
2. Run the validation module against each record.
3. Compare output against the expected status in the CSV or JSON.
4. Verify that validation flags match the rules in `validation_rules.md`.

## Validation Rules Covered

| Rule | Coverage |
|------|----------|
| Khasra Number Required | ✅ |
| Owner Name Required | ✅ |
| Village Required | ✅ |
| District Required | ✅ |
| Area Must Be Positive | ✅ |
| Area Unit Required | ✅ |
| Low Confidence → Review | ✅ |
| Duplicate Detection | 🟡 (Conceptual – to be implemented) |
| Area/Unit Consistency | 🟡 (Conceptual – TBD with backend) |

## Limitations

- This dataset is synthetic and does not reflect real-world distribution.
- Some rules (e.g., duplicate detection) are documented conceptually but require backend integration to test fully.

## Integrity Check

This dataset is under version control. Do not modify without team discussion.