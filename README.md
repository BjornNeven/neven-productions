# Neven Productions — boekingssite

Eén HTML-bestand, geen build, geen server. Dubbelklik `index.html` en hij werkt, ook offline (op het
lettertype na, dat valt dan terug op het systeemfont). Bedoeld om te delen op Instagram, TikTok en in
WhatsApp-groepen.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | de hele site: opmaak, inhoud en script |
| `favicon.svg` | tabbladicoon in de vier gelkleuren |
| `og.png` | deelafbeelding van 1200×630 voor WhatsApp/Instagram-voorbeelden (bevat "Vanaf € 45", "tot 250 personen" en "DJ als optie" en "Licht · Geluid · DJ": opnieuw maken als dat verandert) |
| `img/` | eigen foto's (JPG, max. 1600 px) en de hero-loop `hero.mp4`/`hero.webm` (8 s, zonder geluid, ca. 0,4 MB) |

## Wat nog ingevuld moet worden

Alles tussen vierkante haken: zoek in `index.html` op `[`.

| Waar | Wat |
|---|---|
| `TELEFOON` bovenin het script | WhatsApp-nummer, landcode zonder + en zonder 0, bijv. `31612345678` |
| `[regio]` | hero en de kleine tekst bij de prijzen |
| footer | naam, KvK-nummer, mail, Instagram |

## Pakketten (bron: gedeelde notitie van Beau, 10 oktober 2026)

| Pakket | Inhoud | Prijs |
|---|---|---|
| tot 30 pers. | JBL PartyBox 310, 2× LED-par op T-bar | € 45 |
| tot 50 pers. | JBL PartyBox 310, 4× LED-par op T-bar, rookmachine 900 W | € 85 |
| tot 150 pers. | geluidsset tot 150 pers., 2 m truss met 2 LED-pars en 2× moving head 150 W, LED football moving head, rookmachine 900 W | € 200 |
| tot 250 pers. (binnen) | geluidsset tot 250 pers., 2 m truss met 4× moving head 150 W, LED football moving head, T-bar met 4× LED-par 200 W, rookmachine 900 W | € 300 |

Alle prijzen zijn exclusief DJ; met DJ komt er € 300 bij (opgegeven 10 oktober 2026).

**Nog nalopen (aanname, niet van Beau):** de korte pitch per pakket, de label "per feest", de stappen
"Van aanvraag tot afbouw" en de antwoorden bij de veelgestelde vragen (stroom, opbouwtijd, buiten).

## Intro

Bij het openen speelt een intro van ongeveer 3,5 seconden (canvas, geen bibliotheken):
1. vier moving heads in de gelkleuren gaan aan en zwaaien door de rook naar een draaiende vloer-gobo;
2. een laserwaaier (groen, met enkele rode lijnen) opent vanaf de vloer, scant en sluit;
3. de koppen draaien naar de achterwand en zoomen open; daar wordt een logo-gobo scherp gesteld;
4. een strobe-flits gaat over in de site.

De intro speelt één keer per sessie (sessionStorage) en nooit als "beweging verminderen" aan staat.
Hij stopt bij klik, Esc, Enter of spatie, met een vangnet na 6,5 s. Met `?intro=uit` achter de URL
sla je hem over tijdens het bouwen.

Timing aanpassen: het object `T` bovenin het intro-script.

## Editmodus

Zet `?edit` achter de URL (bijv. `index.html?edit`). Klik een element aan en typ een opmerking.
Opmerkingen blijven in de browser bewaard (localStorage `np-edit`) en zijn uit te lezen via
`window.__opmerkingen` of met "Kopieer" in de balk. De intro speelt niet in deze modus.
Zonder `?edit` laadt `edit.js` niet en merkt een bezoeker er niets van.

## Hoe het formulier werkt

Geen backend, geen formulierdienst. De browser van de bezoeker stelt het bericht zelf samen en opent
WhatsApp of de mailapp met alles ingevuld. Geen kosten, geen verwerkersovereenkomst, en het werkt in de
in-app browser van Instagram. De bezoeker drukt zelf op verzenden.

## Online zetten

De site draait op **GitHub Pages** vanaf de branch `main` (map `/`), op **https://neven-productions.com**.
Elke push naar `main` staat binnen een paar minuten online.

- Het domein en de e-mail staan bij Hostinger. Het bestand `CNAME` in de repo vertelt GitHub welk domein erbij hoort.
- DNS bij Hostinger: vier A-records voor `@` naar GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153)
  en `www` als CNAME naar `bjornneven.github.io`. De MX-, SPF-, DKIM- en DMARC-records voor de mail blijven ongewijzigd.
- HTTPS regelt GitHub zelf (Let's Encrypt).

## Herkomst

Gebouwd met Claude (augustus 2026), in oktober 2026 teruggehaald uit de chatgeschiedenis.
Getest op 390×844 en 1440×900: geen JS-fouten, geen horizontale overloop, geen tapdoel onder 44 px
(meting uit de oorspronkelijke sessie).
