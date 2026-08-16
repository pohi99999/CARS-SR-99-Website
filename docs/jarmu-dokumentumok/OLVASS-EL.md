# Jármű-dokumentumok — NEM publikus

Ezek a fájlok korábban a `public/` mappában voltak, ezért a Next.js statikusan
kiszolgálta őket: bárki letölthette őket az éles weboldalról, aki ismerte vagy
kitalálta az URL-t. A weboldal kódja **soha nem hivatkozott rájuk** — munkafájlok
voltak, amelyek véletlenül kerültek a nyilvános mappába.

Mit tartalmaztak (2026-08-16-i állapot):

- **forgalmi/** — forgalmi engedélyek szkennjei (PDF/fotó). Tulajdonosnév,
  lakcím, alvázszám, rendszám.
- **adatlap.md** — járművenkénti belső adatlap rendszámmal, alvázszámmal és
  olyan árakkal, amelyek eltérnek a weboldalon hirdetett ártól
  (pl. Ford Kuga: adatlap 1 549 000 Ft vs. hirdetett 2 549 000 Ft).
- **Használtautó.hu admin felület.pdf** — képernyőkép egy admin felületről.
- **osszesito*.csv / .md, szoveg.txt / .pdf** — belső összesítők és
  szövegvázlatok.

## Szabály

Ide, a `docs/` alá kerül minden munkafájl. A `public/` mappába **kizárólag**
olyasmi kerülhet, amit szándékosan bárki elérhet: képek, ikonok, og-image.

Ha egy jármű dokumentumára a weboldalnak tényleg szüksége lenne, azt ne innen
linkeljük — előbb el kell dönteni, mi az, ami jogszerűen nyilvánosságra hozható,
és abból kitakart (nevet, lakcímet nem tartalmazó) változatot kell készíteni.

## Fontos, még nyitott pont

A fájlok a git-előzményekben továbbra is megtalálhatók a korábbi commitokban.
A publikus GitHub-tárolóból ezek visszanyerhetők. Ha ez kockázatot jelent, a
git-előzményt is tisztítani kell (`git filter-repo`), ami erőltetett push-t
igényel — ezt külön egyeztetni kell.
