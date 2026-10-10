# Neven Productions — boekingssite

Eén HTML-bestand, geen build, geen server. Dubbelklik `index.html` en hij werkt, ook offline (op het
lettertype na, dat valt dan terug op het systeemfont). Bedoeld om te delen op Instagram, TikTok en in
WhatsApp-groepen.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | de hele site: opmaak, inhoud en script |
| `favicon.svg` | tabbladicoon in de vier gelkleuren |
| `og.png` | deelafbeelding van 1200×630 voor WhatsApp/Instagram-voorbeelden (bevat "Vanaf € 45" en "30 tot 250 personen": opnieuw maken als dat verandert) |
| `img/` | eigen foto's (JPG, max. 1600 px) en de hero-loop `hero.mp4`/`hero.webm` (8 s, zonder geluid, ca. 0,4 MB) |

## Wat nog ingevuld moet worden

Alles tussen vierkante haken: zoek in `index.html` op `[`.

| Waar | Wat |
|---|---|
| `TELEFOON` bovenin het script | WhatsApp-nummer, landcode zonder + en zonder 0, bijv. `31612345678` |
| `MAIL` bovenin het script | e-mailadres |
| `og:url` en `og:image` | volledige URL zodra er een domein is |
| `[regio]` | hero en de kleine tekst bij de prijzen |
| footer | naam, KvK-nummer, mail, Instagram |

## Pakketten (bron: gedeelde notitie van Sem, 10 oktober 2026)

| Pakket | Inhoud | Prijs |
|---|---|---|
| tot 30 pers. | JBL PartyBox 310, 2× LED-par op T-bar | € 45 |
| tot 50 pers. | JBL PartyBox 310, 4× LED-par op T-bar, rookmachine 900 W | € 85 |
| tot 150 pers. | geluidsset tot 150 pers., 2 m truss met 2 LED-pars en 2× moving head 150 W, LED football moving head, rookmachine 900 W | € 200 |
| tot 250 pers. (binnen) | geluidsset tot 250 pers., 2 m truss met 4× moving head 150 W, LED football moving head, T-bar met 4× LED-par 200 W, rookmachine 900 W | € 300 |

**Nog nalopen (aanname, niet van Sem):** de korte pitch per pakket, de label "per feest", de stappen
"Van aanvraag tot afbouw" en de antwoorden bij de veelgestelde vragen (stroom, opbouwtijd, buiten).

## Hoe het formulier werkt

Geen backend, geen formulierdienst. De browser van de bezoeker stelt het bericht zelf samen en opent
WhatsApp of de mailapp met alles ingevuld. Geen kosten, geen verwerkersovereenkomst, en het werkt in de
in-app browser van Instagram. De bezoeker drukt zelf op verzenden.

## Online zetten

Cloudflare Pages → Workers & Pages → Pages → Connect to Git → deze repo kiezen.
Geen build command, output directory `/`. Daarna is elke push een deploy. Eigen domein koppelen kan
later; SSL gaat automatisch.

## Herkomst

Gebouwd met Claude (augustus 2026), in oktober 2026 teruggehaald uit de chatgeschiedenis.
Getest op 390×844 en 1440×900: geen JS-fouten, geen horizontale overloop, geen tapdoel onder 44 px
(meting uit de oorspronkelijke sessie).
