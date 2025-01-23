
## Jak to funguje

Projekt se skládá z několika hlavních skriptů:

1. **Hlavní řídicí skript (`main.py`):**
    - Slouží jako vstupní bod aplikace.
    - Inicializuje kameru a řídí zpracování obrazů.
    - Integruje funkce pro detekci tvarů a textu.
    - Zajišťuje interakci s uživatelem pomocí konzole.

2. **Extrahování obdelníků z obrazu (`GetRectanglePicture.py`):**
    - Identifikuje obdelníkové oblasti na obrázku.
    - Test pro vyhodnocení oblasti jako snímaný objekt:
		- Oblast byla detekována alespoň 10krát za sebou.
		- Středový bod oblasti se nezmění po dobu 0,5 sekundy.
    - Využívá techniky zpracování obrazu, jako je hledání kontur a filtrování podle tvaru.

3. **Detekce textu (`TextDetection.py`):**
    - Obsahuje funkce pro extrakci textu z obrázků pomocí OCR (Optical Character Recognition).
    - Používá knihovnu Tesseract pro rozpoznání textu v různých jazycích.



---

### Klíčové funkce a techniky

1. **Zpracování obrazu:**
    - Skript `GetRectanglePicture.py` používá OpenCV pro detekci kontur a identifikaci obdelníků.
    - Klíčové funkce:
        - `cv2.findContours()`: Pro hledání kontur v binárním obrazu.
        - `cv2.approxPolyDP()`: Pro aproximaci tvarů na základě kontur.
        - `cv2.drawContours()`: Pro vizualizaci detekovaných kontur.

2. **Extrakce textu:**
	- Skript TextDetection.py využívá knihovnu Tesseract pro OCR.
	- Podporuje rozpoznávání textu v mnoha jazycích.
	- Funguje na principu segmentace textu do jednotlivých znaků a jejich porovnávání s interní databází.
	- Schopnost rozpoznat více jazyků (v projektu se používá kombinace "eng+ces").
	- Výstup ve formátu prostého textu nebo strukturovaného souboru (např. PDF s textovou vrstvou).
	- Tesseract je open-source OCR nástroj vyvinutý původně společností HP a nyní spravovaný Googlem.

3. **Ukládání zpracovaných:**
    - Funkce `cv2.imwrite()` ukládá zpracované obrázky na disk.
    - text je uložen do .txt souboru k dalšímu zpracování

---

## Ukázka kódu 

### Detekce obdélníků
V následujícím úryvek kódu ze skriptu `GetRectanglePicture.py` je demonstrováno, jak se identifikují obdélníkové oblasti:

``` python
contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
for contour in contours:
    approx = cv2.approxPolyDP(contour, 0.02 * cv2.arcLength(contour, True), True)
    if len(approx) == 4:
        x, y, w, h = cv2.boundingRect(approx)
        rectangle = image[y:y+h, x:x+w]
        rectangles.append(rectangle)
```

**Co tento kód dělá:**
- Funkce `cv2.findContours()` najde všechny kontury v binárním obrazu.
- `cv2.approxPolyDP()` aproximuje tvar kontury podle zadané tolerance, aby zjistila, zda se jedná o čtyřúhelník.
- Pokud je počet vrcholů přibližně čtyři, oblast se extrahuje jako obdélník a uloží do seznamu.

---

### Rozpoznání textu pomocí Tesseract
Následující část ukazuje použití Tesseract OCR pro rozpoznání textu:
- `pytesseract.image_to_string()` převádí obraz na textový řetězec.


```python
import pytesseract

text = pytesseract.image_to_string('processed_frame.jpg', lang='eng+ces')
print("Rozpoznaný text:", text)
```



