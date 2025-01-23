
Tato ukázka demonstruje, jak využít knihovnu OpenCV k detekci a rozpoznání geometrických tvarů ve videu v reálném čase. OpenCV (Open Source Computer Vision Library).

---

## Popis Funkce


Skript obsahuje logiku pro:

1. **Zachycení Video Streamu**: Pomocí funkce `cv2.VideoCapture` je inicializováno snímání obrazu z připojené kamery.
2. **Předzpracování Snímků**:
   - **Převod každého snímku na odstíny šedi (`cv2.cvtColor`)**:
     Snímky z kamery jsou zachyceny ve formátu BGR (modrá-zelená-červená). Pro zjednodušení dalšího zpracování a zvýšení rychlosti výpočtů jsou převedeny na odstíny šedi. Tento krok eliminuje barevnou informaci a zachovává pouze jas jednotlivých pixelů, což je často dostatečné pro úlohy, jako je detekce hran.
   - **Aplikace Gaussova rozmazání pro redukci šumu (`cv2.GaussianBlur`)**:
     Před detekcí hran je důležité redukovat šum, který by mohl být mylně interpretován jako hrana. Gaussovo rozmazání hladí obrázek pomocí konvolučního filtru, což usnadňuje identifikaci skutečných tvarů.
   - **Detekce hran pomocí algoritmu Canny (`cv2.Canny`)**:
     Tento algoritmus hledá oblasti s prudkou změnou intenzity jasu, které obvykle odpovídají hranám objektů. Používá dvojí prahování (pro silné a slabé hrany) a následné sledování hrany, aby odstranil falešné detekce a zanechal pouze relevantní hrany.
   - **Práh binarizace pro zvýraznění objektů (`cv2.threshold`)**:
     Po aplikaci rozmazání a detekce hran je možné použít práh binarizace, který převádí obraz na černobílý. Tento krok zdůrazňuje objekty tím, že pixely nad určitou prahovou hodnotou nastaví na bílou a ostatní na černou. Použití metody Otsu navíc automaticky optimalizuje prahovou hodnotu pro daný obraz.
(funkčnost je zachycena na obrázku níže)
3. **Detekce Tvarů**:
   - Analýza obrysů získaných z hran (`cv2.findContours`).
   - Identifikace tvarů obdélníky, čtverce, kruhy, na základě jejich geometrických vlastností.
4. **Zobrazení Výsledků**:
   - Zobrazení detekovaných tvarů na původním snímku (`cv2.drawContours` a `cv2.putText`).
   - Vykreslení počtu detekovaných tvarů přímo na obrazovku.

<img
  src="python/shapeDetectPictureProcessed.png"
  alt="Processed Image"
  style="max-width: 70%; height: auto; display: block; margin: 1rem auto;"
/>

---

## Další použité Metody

- **`cv2.VideoCapture`**: Umožňuje získat video stream z kamery nebo jiného zdroje videa, což je vstup pro další zpracování.
- **`cv2.cvtColor`**: Převádí obraz mezi barevnými modely (např. z RGB na šedou), což zjednodušuje výpočty a eliminuje barevné informace.
- **`cv2.findContours`**: Vyhledává obrysy v binárním obrazu, které reprezentují hrany objektů a umožňují jejich analýzu.
- **`cv2.approxPolyDP`**: Zjednodušuje obrysy pomocí redukce bodů, aby se minimalizovala vzdálenost mezi původním a aproximovaným tvarem, což usnadňuje identifikaci.
- **`cv2.putText`**: Vykresluje text na obraz, což se často používá k označení detekovaných objektů nebo zobrazení informací.

---

Zdrojový kód je k vidění na mém githubu pod odkazem v zahlaví článku.