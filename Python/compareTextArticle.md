# ReadPackageInformation: Smart Label Extraction and Validation

## Overview
**ReadPackageInformation** is a smart and modular image-processing pipeline built with **OpenCV**, **Tesseract OCR**, and **Excel/JSON-based metadata**. It is designed for industrial use cases, where extracting, aligning, and verifying printed information from packaging is critical. This system supports camera/live frame capture or still image analysis.

---

## 🔍 What It Does
- **Detects the main label** area on a package
- **Finds the top-left pixel of the printed text**
- **Reads reference codes** (e.g. REF) via OCR
- **Looks up expected values in an Excel database**
- **Validates OCR results vs known product data**
- **Reports similarity %** and mismatches

---

## 🗂️ Structure

### main.py
Entry script that controls the application logic:
- Reads one frame from a file or camera
- Detects the largest polygon (label area)
- Locates the top-left printed character
- Reads REF code via OCR
- Fills correct values from Excel (via REF lookup)
- Verifies other text fields based on positional offset
- Logs comparison results with similarity score

### utils_image_processing.py
Provides helper functions for:
- Edge + contour detection
- Polygon cropping with perspective transform
- Pixel-to-mm size calibration
- Text OCR (with optional multi-language)
- Position-based black pixel detection (for alignment)
- Text similarity computation

### utils_files.py
Handles:
- Loading/saving JSON data
- Converting Excel (.xlsx) to Python dicts
- Auto-filling JSON data with correct text from Excel using the REF code

---

## 🔧 How It Works

1. **Setup Calibration**
```python
px_to_mm = calculate_pixel_size(D=290)  # Estimate size of one pixel
```

2. **Contour Detection & Cropping**
```python
frame_detect, crop_frame, center_x, center_y, angle = get_biggest_polygon(
    frame_gray, px_to_mm=px_to_mm, pixelsArea=(100*100 / px_to_mm)
)
```

3. **Locate First Character**
```python
first_pixel = detect_first_black_pixel(crop_frame, [50, 100, 200, 150])
```

4. **Read REF Code**
```python
position_px = tuple(int(v / px_to_mm) for v in product_json["REF"]["position_mm"])
ref_code = extract_text_from_frame(crop_frame, position_px=position_px)
```

5. **Load Correct Data from Excel**
```python
fill_json_from_excel(product_json, excel_dict, REF_code=ref_code)
```

6. **Iterate and Validate Fields**
```python
for key, value in product_references.items():
    # Calculate field's position based on offset
    position_px = tuple(int(val / px_to_mm) for val in position_rel)
    read_text = extract_text_from_frame(crop_frame, position_px=position_px)
    similarity = text_similarity(read_text, expected_text)
```

---

## 🖥️ Example Output (Command Line)
```text
origin text: 10226
read text : 10226
similarity 100.0

checking: LOT
origin text: 2208122/1H
read text : 2205132/1H
similarity 80.0

checking: EXP
origin text: 2026-08-01
read text : 2025-05-13
similarity 62.5

checking:
origin text: (EN) Sterile resorbable haemostatic reticulum (ES) Maua hemostätica estéciJ reabsorbible (DE) Sternes
resorbiecbaces hämostatisches Netz (GR) AnootEtpwgÉvn anoppo#iotgn atgooraruai vå<a (PL) Jalowa wchlanialna siatka
hemostatyczna (UA) P03cM0KTYi0H"i crepw16HHi remocraTHHHHi maTepian (TR) Steril tekrar emilebilir hemostatik retikulum (PT)
Penso hemostätico absorviveJ esterilizado

read text : cmroppoetoq ano yun YABe VE ee ee PoscmoxTyiouni CTEPMNICHW•IÄ Marepian (TR)
hemostatik retikulum (P T) Penso hemostatico
similarity 35.18
```

