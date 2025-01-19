# .h - Význam zkratek

### Includes
- **Popis:** Zahrnutí hlavičkových souborů.
- **Použití:** Pro `#include` hlavičkových souborů.

### ET (Enumerated Types)
- **Popis:** Výčtové typy.
- **Použití:** Definice vlastních `enum`.

### EC (External Constants)
- **Popis:** Externí konstanty.
- **Použití:** Deklarace `extern const` hodnot pro použití mezi moduly.

### EM (External Macros)
- **Popis:** Externí makra.
- **Použití:** Definice sdílených maker.

### EFP (External Function Prototypes)
- **Popis:** Externí prototypy funkcí.
- **Použití:** Deklarace funkcí, které budou volány z jiných `.c` souborů.

### Private Defines
- **Popis:** Soukromé definice.
- **Použití:** Definice `#define` hodnot, které se používají pouze v aktuálním souboru.

---

# .c - Význam zkratek

### Header
- **Popis:** Komentáře k souboru, informace o projektu nebo autorovi.
- **Použití:** Přidání metadat k souboru.

### Includes
- **Popis:** Vkládání uživatelských hlavičkových souborů (`#include`).
- **Použití:** Import funkcionalit z jiných modulů.

### PTD (Private Typedefs)
- **Popis:** Definice privátních typů, například `typedef`.
- **Použití:** Interní datové struktury nebo aliasy.

### PD (Private Defines)
- **Popis:** Definice privátních konstant a maker (`#define`).
- **Použití:** Konfigurace konstant a interní definice.

### PM (Private Macros)
- **Popis:** Uživatelské makra.
- **Použití:** Definice jednoduchých opakovatelných operací.

### PV (Private Variables)
- **Popis:** Deklarace uživatelských globálních proměnných.
- **Použití:** Proměnné viditelné pouze v aktuálním souboru.

### PFP (Private Function Prototypes)
- **Popis:** Deklarace uživatelských funkcí (function prototypes).
- **Použití:** Připravení funkcí pro použití v souboru.

### User begin 0
- **Popis:** Libovolný uživatelský kód na začátku souboru.
- **Použití:** Například inicializace vlastních knihoven nebo proměnných.

### User begin 1
- **Popis:** Uživatelský kód pro další inicializace a přípravu.
- **Použití:** Například nastavení hodnot před inicializací periferie.

### Init
- **Popis:** Uživatelské inicializační kódy (proměnné, periferie).
- **Použití:** Například přizpůsobení inicializace hardwaru.

### SysInit
- **Popis:** Uživatelské úpravy systémové inicializace, např. hodiny, priority přerušení.
- **Použití:** Změna systémových parametrů.

### User begin 2
- **Popis:** Uživatelský kód po inicializaci hardwaru, ale před hlavní smyčkou.
- **Použití:** Nastavení logiky nebo dalších parametrů.

### WHILE
- **Popis:** Kód uvnitř hlavní smyčky (`while(1)`).
- **Použití:** Hlavní logika programu.

### User begin 3
- **Popis:** Kód, který se vykonává uvnitř nebo na konci hlavní smyčky.
- **Použití:** Zajištění plynulého běhu smyčky.

### User begin 4
- **Popis:** Uživatelské funkce mimo hlavní smyčku nebo inicializaci.
- **Použití:** Podpůrné funkce nebo obsluha přerušení.

### Error_Handler_Debug
- **Popis:** Ladicí kód pro funkci `Error_Handler`.
- **Použití:** Debugování chyb při běhu programu.

### User begin 6
- **Popis:** Uživatelské funkce nebo přerušení, které nemají výchozí sekci.
- **Použití:** Dodatečné funkce nebo ladění programu.
