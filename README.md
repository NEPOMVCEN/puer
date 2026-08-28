# Puer Aeternus 3.0

Osobista aplikacja: zadania, nawyki, dziennik, wyzwania.
Działa w całości w przeglądarce. Dane zapisują się wyłącznie w pamięci Twojego
telefonu — na GitHubie leży sam program, bez żadnych wpisów.

## Pliki

| plik | do czego |
|---|---|
| `index.html` | cała aplikacja |
| `sw.js` | pamięć podręczna: start z pamięci telefonu, działanie bez internetu |
| `manifest.webmanifest` | nazwa, kolory i ikona po dodaniu na ekran główny |
| `icon-192.png`, `icon-512.png` | ikony |
| `INSTRUKCJA.html` | instrukcja wdrożenia krok po kroku |

## Uruchomienie

1. Wgraj wszystkie pliki do publicznego repozytorium (bez podfolderów).
2. `Settings` → `Pages` → Source: **Deploy from a branch** → gałąź `main`, katalog `/ (root)` → `Save`.
3. Po 1–3 minutach apka jest pod `https://NAZWA-UZYTKOWNIKA.github.io/puer/`.
4. Otwórz ten adres w Chrome na telefonie → menu (trzy kropki) → **Dodaj do ekranu głównego**.

Pełna instrukcja z przenoszeniem danych: otwórz `INSTRUKCJA.html`.

## Aktualizacja

Wgraj nowy `index.html` (i `sw.js`, jeśli go dostałeś — ma podbity numer wersji w stałej `CACHE`).
Na telefonie otwórz apkę dwa razy: pierwsze uruchomienie pobiera nową wersję w tle, drugie ją pokazuje.
