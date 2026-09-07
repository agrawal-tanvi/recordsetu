# AbhilekhSetu – Validation Test Cases

> **Purpose:** Test cases to verify each validation rule against the synthetic dataset.

---

## TC-001 – Valid Record

| Field | Value |
|-------|-------|
| khasra_no | 125 |
| owner_name | Ram Kumar |
| village | Sikandra |
| district | Agra |
| area | 2.5 |
| area_unit | hectare |
| Confidence | All > 0.85 |

**Expected:** `VALID`  
**Reason:** All fields present and valid.

---

## TC-002 – Missing Khasra Number

| Field | Value |
|-------|-------|
| khasra_no | (empty) |
| owner_name | Rajesh Kumar |
| village | Sikandra |
| district | Agra |

**Expected:** `INVALID` (KHASRA_NUMBER_MISSING)  
**Reason:** Khasra number is mandatory.

---

## TC-003 – Missing Owner Name

| Field | Value |
|-------|-------|
| khasra_no | 135 |
| owner_name | (empty) |
| village | Sikandra |
| district | Agra |

**Expected:** `INVALID` (OWNER_NAME_MISSING)  
**Reason:** Owner name is mandatory.

---

## TC-004 – Missing Village

| Field | Value |
|-------|-------|
| khasra_no | 139 |
| owner_name | Ram Kumar |
| village | (empty) |
| district | Agra |

**Expected:** `INVALID` (VILLAGE_MISSING)  
**Reason:** Village is mandatory.

---

## TC-005 – Missing District

| Field | Value |
|-------|-------|
| khasra_no | 142 |
| owner_name | Sita Patel |
| village | Sikandra |
| district | (empty) |

**Expected:** `INVALID` (DISTRICT_MISSING)  
**Reason:** District is mandatory.

---

## TC-006 – Area Zero

| Field | Value |
|-------|-------|
| area | 0 |
| area_unit | hectare |

**Expected:** `INVALID` (AREA_INVALID_ZERO)  
**Reason:** Area must be greater than 0.

---

## TC-007 – Area Negative

| Field | Value |
|-------|-------|
| area | -2 |
| area_unit | hectare |

**Expected:** `INVALID` (AREA_INVALID_NEGATIVE)  
**Reason:** Area cannot be negative.

---

## TC-008 – Excessive Area (>1000)

| Field | Value |
|-------|-------|
| area | 9999 |
| area_unit | hectare |

**Expected:** `INVALID` (AREA_INVALID_EXCESSIVE)  
**Reason:** Plausibility check – area too large for a single plot.

---

## TC-009 – Low Owner Confidence

| Field | Value |
|-------|-------|
| owner_name | Ram Kumar |
| owner_confidence | 0.70 |

**Expected:** `REVIEW_REQUIRED` (LOW_CONFIDENCE_OWNER)  
**Reason:** Confidence below threshold (0.75) triggers human review.

---

## TC-010 – Low Area Confidence

| Field | Value |
|-------|-------|
| area | 1.8 |
| area_confidence | 0.65 |

**Expected:** `REVIEW_REQUIRED` (LOW_CONFIDENCE_AREA)  
**Reason:** Confidence below threshold triggers human review.

---

## TC-011 – Missing Area Unit

| Field | Value |
|-------|-------|
| area | 2.5 |
| area_unit | (empty) |

**Expected:** `REVIEW_REQUIRED` or `INVALID` (UNIT_MISSING)  
**Reason:** Area unit is needed for interpretation.

---

## TC-012 – Invalid Area Unit

| Field | Value |
|-------|-------|
| area_unit | "unknown" |

**Expected:** `REVIEW_REQUIRED` or `INVALID` (UNIT_INVALID)  
**Reason:** Must be `hectare`, `acre`, or `square_meter`.

---

## TC-013 – All Fields Valid (Positive)

| Field | Value |
|-------|-------|
| khasra_no | 145 |
| owner_name | Arjun Singh |
| village | Sikandra |
| district | Agra |
| area | 2.0 |
| area_unit | hectare |
| Confidence | All > 0.85 |

**Expected:** `VALID`  
**Reason:** Complete and clean record.

---

## TC-014 – Multiple Warnings (Low Confidence + Missing Unit)

| Field | Value |
|-------|-------|
| owner_confidence | 0.72 |
| area_unit | (empty) |

**Expected:** `REVIEW_REQUIRED`  
**Reason:** Multiple issues, but none are hard structural failures.

---

## TC-015 – Duplicate Khasra (Conceptual)

| Field | Value |
|-------|-------|
| khasra_no | 125 |
| (existing DB) | khasra_no 125 already exists |

**Expected:** `REVIEW_REQUIRED` or `FLAGGED`  
**Reason:** Duplicate detection prevents double entry.