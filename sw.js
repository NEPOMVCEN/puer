/* Puer Aeternus 3.0 — pamięć podręczna.
   Zadanie: apka ma otwierać się natychmiast i działać bez internetu.

   Strategia: najpierw pamięć, potem sieć w tle (cache-first + stale-while-revalidate).
   Czyli: pokazujemy zapisaną kopię OD RAZU, a równolegle po cichu sprawdzamy, czy na
   serwerze jest nowsza wersja, i chowamy ją na następne otwarcie. Dlatego po wgraniu
   nowej wersji zobaczysz ją przy DRUGIM uruchomieniu — pierwsze pokazuje jeszcze starą.
   To świadomy wybór: szybkość ponad natychmiastowość aktualizacji.

   UWAGA przy aktualizacji apki: podnieś numer w CACHE poniżej (np. na 'puer-3-1').
   Zmiana nazwy powoduje pobranie plików od nowa i skasowanie starej kopii. */
var CACHE = 'puer-3-6-8';
var PLIKI = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(PLIKI);
    }).then(function () {
      return self.skipWaiting();   // nowa wersja przejmuje ster bez czekania
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (klucze) {
      return Promise.all(klucze.map(function (k) {
        if (k !== CACHE) return caches.delete(k);   // sprzątamy poprzednie wersje
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  /* Tylko własne pliki. Cokolwiek apka pobiera z zewnątrz (np. zapytania do modelu SI
     albo synchronizacja) idzie prosto do sieci i nigdy nie ląduje w pamięci podręcznej. */
  var url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (zCache) {
      var zSieci = fetch(req).then(function (resp) {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          var kopia = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(req, kopia); });
        }
        return resp;
      }).catch(function () {
        return zCache;   // brak internetu — zostajemy przy kopii
      });
      return zCache || zSieci;
    })
  );
});
