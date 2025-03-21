# MeasureDimension: Automated Object Measurement with OpenCV

## Introduction
**MeasureDimension** is a Python-based tool that utilizes **OpenCV** to detect, analyze, and measure objects in images or live camera feeds. The system identifies the largest contour in an image, extracts its dimensions, and converts the measurements from pixels to millimeters using predefined camera parameters.

## Key Features
### ✅ Edge Detection & Contour Analysis
- Uses **Canny edge detection** and **contour approximation** to detect objects.
- Filters out small contours based on a minimum area threshold.

### ✅ Automated Object Measurement
- Detects the largest quadrilateral shape in the image.
- Extracts dimensions (width, height) in pixels and converts them to millimeters.

### ✅ Real-Time or Static Image Processing
- Can process **single images** (e.g., PNG, JPG).
- Works with a **live camera feed** for real-time measurements.

### ✅ Visualization & Data Overlay
- Draws detected contours directly on the image.
- Displays size, center coordinates, and rotation angle.
- Outputs numerical measurement results to the console.

## How It Works
1. **Load the Image**
   - Either from a file (`cv2.imread`) or a camera feed.

2. **Preprocessing**
   - Converts the image to grayscale.
   - Applies **Gaussian blur** to reduce noise.
   - Uses **adaptive thresholding** and **Canny edge detection**.

3. **Contour Detection & Filtering**
   - Finds contours using `cv2.findContours()`.
   - Selects the **largest contour** that meets the area threshold.

4. **Measurement Extraction**
   - Computes a **bounding rectangle** around the detected shape.
   - Converts dimensions from **pixels to millimeters** using `calculate_pixel_size()`.

5. **Result Display**
   - Draws contours, center points, and measurement values on the image.
   - Displays the processed frame using `cv2.imshow()`.
   - Prints measurement data to the console.

## Core Functions
### `find_largest_contour(frame_gray, pixelsArea=200000)`
Finds the largest polygon in the image and returns its contour if valid.

### `calculate_pixel_size(D, W_sensor=5.76, f=8, W_res=2592)`
Calculates the physical size of a pixel based on camera distance and sensor specifications.

### `draw_contour_info(frame_bgr, largest_contour, focal_length=200)`
Draws contour details (dimensions, center, angle) directly on the image.

### `crop_image(frame, box)`
Extracts and rectifies a rotated rectangle from an image.

## Example Usage
```python
import cv2
import utils_image_processing as imPr

frame_gray = cv2.imread("sample_image.png", cv2.IMREAD_GRAYSCALE)
px_to_mm = imPr.calculate_pixel_size(D=290)

largest_contour = imPr.find_largest_contour(frame_gray)
if largest_contour is not None:
    frame_bgr = cv2.cvtColor(frame_gray, cv2.COLOR_GRAY2BGR)
    frame_bgr = imPr.draw_contour_info(frame_bgr, largest_contour, focal_length=290)
    cv2.imshow("Measurement Result", frame_bgr)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
```

## Conclusion
**MeasureDimension** provides a powerful framework for **automated object measurement** using computer vision. Whether for **quality control, packaging measurements, or industrial automation**, it offers precise **size estimation and visualization**. 🚀