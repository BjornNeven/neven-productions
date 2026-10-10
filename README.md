# Neven Productions — boekingssite

Eén HTML-bestand, geen build, geen server. Dubbelklik `index.html` en hij werkt, ook offline (op het
lettertype na, dat valt dan terug op het systeemfont). Bedoeld om te delen op Instagram, TikTok en in
WhatsApp-groepen.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | de hele site: opmaak, inhoud en script |
| `favicon.svg` | tabbladicoon in de vier gelkleuren |
| `og.png` | deelafbeelding van 1200×630 voor WhatsApp/Instagram-voorbeelden (bevat "Vanaf € 195": opnieuw maken als de prijs verandert) |

## Wat nog ingevuld moet worden

Alles tussen vierkante haken: zoek in `index.html` op `[`.

| Waar | Wat |
|---|---|
| `TELEFOON` bovenin het script | WhatsApp-nummer, landcode zonder + en zonder 0, bijv. `31612345678` |
| `MAIL` bovenin het script | e-mailadres |
| `og:url` en `og:image` | volledige URL zodra er een domein is |
| `[regio]` | hero en de kleine tekst bij de prijzen |
| `[24]` en `[48]` | de cijferstrook |
| `data-yt=""` | YouTube-video-id per film (het stuk na `v=`) |
| `[school]`, `[vereniging]`, `[locatie]` | labels onder de films |
| footer | naam, KvK-nummer, mail, Instagram |

**Niet tussen haken maar wel nalopen:** de prijzen (€ 195 / € 395 / € 595) en de inhoud van de drie
pakketten zijn aannames uit de eerste opzet, geen echte tarieven.

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
