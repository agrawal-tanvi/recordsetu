# AbhilekhSetu – Validation Rules

> **Purpose:** Define what the validation module checks before a land record is accepted or flagged for human review.

---

## Rule 1 – Khasra Number Required

| Field | Condition |
|-------|-----------|
| `khasra_no` | Must not be empty / null |

**Pass Example:** `khasra_no = "125"`  
**Fail Example:** `khasra_no = ""` or `null`

---

## Rule 2 – Owner Name Required

| Field | Condition |
|-------|-----------|
| `owner_name` | Must not be empty / null |

**Pass Example:** `owner_name = "Ram Kumar"`  
**Fail Example:** `owner_name = ""` or `null`

---

## Rule 3 – Village Required

| Field | Condition |
|-------|-----------|
| `village` | Must not be empty / null |

**Pass Example:** `village = "Sikandra"`  
**Fail Example:** `village = ""` or `null`

---

## Rule 4 – District Required

| Field | Condition |
|-------|-----------|
| `district` | Must not be empty / null |

**Pass Example:** `district = "Agra"`  
**Fail Example:** `district = ""` or `null`

---

## Rule 5 – Area Must Be Positive

| Field | Condition |
|-------|-----------|
| `area` | Must be a number > 0 |

**Pass Example:** `area = 2.5`  
**Fail Examples:** `area = 0`, `area = -2`, `area = "abc"`

---

## Rule 6 – Area Unit Required

| Field | Condition |
|-------|-----------|
| `area_unit` | Must not be empty / null |
| | Must be one of: `hectare`, `acre`, `square_meter` (as per backend) |

**Pass Example:** `area_unit = "hectare"`  
**Fail Example:** `area_unit = ""` or `null` or `"unknown"`

---

## Rule 7 – Low Confidence Triggers Human Review

| Condition | Action |
|-----------|--------|
| Any field confidence < 0.75 | `REVIEW_REQUIRED` instead of auto-`VALID` |

**Pass (auto-valid):** `owner_confidence = 0.93` → VALID  
**Fail (needs review):** `owner_confidence = 0.70` → REVIEW_REQUIRED

---

## Rule 8 – Area and Unit Consistency (Conceptual)

If `area` is present but `area_unit` is empty/unrecognized, the record is flagged for review.

Similarly, if area is numeric but unit is missing, record should not be auto-verified.

> ⚠️ **Note to backend team:** This rule is documented here. Exact implementation in backend to be confirmed before final integration. For the prototype/demo, we will show this as a review scenario.

---

## Summary Table

| Rule | Type | Auto-validate | Requires Review |
|------|------|---------------|-----------------|
| Khasra Required | Required Field | ✅ (Fail/Pass) | ❌ |
| Owner Required | Required Field | ✅ (Fail/Pass) | ❌ |
| Village Required | Required Field | ✅ (Fail/Pass) | ❌ |
| District Required | Required Field | ✅ (Fail/Pass) | ❌ |
| Area Positive | Data Quality | ✅ (Fail/Pass) | ❌ |
| Area Unit Required | Data Quality | ✅ (Fail/Pass) | ❌ |
| Low Confidence | Quality Signal | ❌ | ✅ (REVIEW) |
| Area/Unit Consistency | Conceptual | ⚠️ (TBD) | ⚠️ (TBD) |