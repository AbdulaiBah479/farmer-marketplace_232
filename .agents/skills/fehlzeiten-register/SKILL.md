---
name: fehlzeiten-register
description: "Überprüft offene Abwesenheiten und Fristen – Urlaubsanspruch (BUrlG), Entgeltfortzahlung (EFZG), Mutterschutz (MuSchG), Elternzeit (BEEG): Überprüft offene Abwesenheiten und Fristen – Urlaubsanspruch (BUrlG), Entgeltfortzahlung (EFZG), Mutterschutz (MuSchG)..."
---

# Überprüft offene Abwesenheiten und Fristen – Urlaubsanspruch (BUrlG), Entgeltfortzahlung (EFZG), Mutterschutz (MuSchG), Elternzeit (BEEG)


## Arbeitsweg

- Rolle, Ziel und gewünschtes Arbeitsprodukt klären: Wer handelt, welche Entscheidung steht an, welche Frist läuft und welcher Output wird gebraucht?
- Fristen und Eilrisiken zuerst markieren: die im Fachgebiet einschlägigen Verfahrens-, materiellen und Anmeldefristen vorab markieren und nicht aus Modellwissen finalisieren (insbesondere Widerspruch 1 Monat, Klage 1 Monat, Verjährung §§ 195, 199 BGB / spezialgesetzlich).
- Tragende Normen verifizieren: die im Plugin-Kontext einschlägigen Normen über gesetze-im-internet.de, dejure.org, eur-lex.europa.eu und die amtlichen Bundes-/Landesportale live prüfen — Fundstellen über gesetze-im-internet.de, dejure.org, openJur, BVerfG-/BGH-/EuGH-Datenbank live prüfen; keine Modellwissen-Zitate.
- Zuständige Stelle bestimmen und Adressaten richtig wählen: Mandant, Gegner, zuständige Behörde oder Gericht, Sachverständige, ggf. EU-/internationale Stelle (siehe Skill-Detail).
- Dokumente und Beweismittel sammeln und auf Lücken prüfen: Verwaltungsakte, Vertragsurkunden, Schriftsätze, Bescheide, Protokolle, Sachverständigengutachten und externe Beweismittel des Fachgebiets — fehlende Belege durch Akteneinsicht oder Rückfrage beim Mandanten beschaffen, Live-Check für tagesaktuelle Normänderungen und Verwaltungspraxis.

**Fokus:** Überprüft offene Abwesenheiten und Fristen – Urlaubsanspruch (BUrlG), Entgeltfortzahlung (EFZG), Mutterschutz (MuSchG), Elternzeit (BEEG). Zeigt nur Abwesenheiten, bei denen eine Entscheidung oder Handlung erforderlich ist – kein reines Statusboard.

### /arbeitsrecht:fehlzeiten-register

## Fachlicher Kern — Arbeitsrecht
- **Problemfokus dieses Skills:** Bleibe beim konkreten Titel `/arbeitsrecht:fehlzeiten-register` und löse die dort angelegte Fachfrage; arbeite mit konkreten Tatbestandsmerkmalen, Beweisfragen und dem unmittelbar benötigten Arbeitsprodukt. Routingfragen bleiben Hilfsmittel, wenn Frist, Zuständigkeit oder Verfahrensart offen sind.
- **Normenradar:** BGB §§ 611a, 613a, 615, 623; KSchG §§ 1, 4, 7; TzBfG §§ 14, 15, 16; AGG §§ 1, 3, 7, 15, 22; EntgTranspG §§ 3, 5, 7; BUrlG §§ 1, 3, 7; BetrVG §§ 87, 99, 102; ArbZG; NachwG; SGB IX §§ 164, 167, 168.
- **Verifizierte Anker:** BAG, Urteil vom 23.10.2025 - 8 AZR 300/24 (Entgeltgleichheit, Paarvergleich, Beweislast, bundesarbeitsgericht.de); BAG, Urteil vom 03.06.2025 - 9 AZR 104/24 (kein Verzicht auf gesetzlichen Mindesturlaub im bestehenden Arbeitsverhältnis); bei Kündigungszugang immer § 623 BGB, Zugang nach § 130 BGB, Dreiwochenfrist §§ 4, 7 KSchG und Beweis des konkreten Umschlags trennen.
- **Arbeitsmodus:** Zuerst Status, Zugang, Frist, Beteiligungsrechte, Sonderkündigungsschutz, Beweislast und prozessualen nächsten Schritt sichern; dann erst Materiellrecht vertiefen.
- **Outputpflicht:** Fristenblatt, Zugangsmatrix, Beweisangebot, Mandantenmail, Betriebsrats-/Gegnerbrief oder Klage-/Erwiderungsbaustein.
- **Fehlerbremse:** Tragende Normen/Entscheidungen live oder aus der Akte verifizieren; Rechtsprechung nur mit Gericht, Entscheidungsform, Datum, Aktenzeichen und frei prüfbarer Quelle. Keine BeckRS-, juris-, Kommentar- oder Aufsatz-Blindzitate aus Modellwissen.

## Eingaben

- HRIS-Zugang (falls konfiguriert) oder `~/.claude/plugins/config/claude-fuer-deutsches-recht/arbeitsrecht/urlaubsregister.yaml`
- `~/.claude/plugins/config/claude-fuer-deutsches-recht/arbeitsrecht/CLAUDE.md` → Standort, Tarifvertrag, Betriebsvereinbarungen

## Ablauf

### 1. Datenquelle ermitteln

Falls HRIS verbunden: Abwesenheitsdaten abrufen. Falls nicht: `urlaubsregister.yaml` lesen. Falls beides fehlt: "Kein Urlaubsregister gefunden. Bitte HRIS verknüpfen oder Abwesenheiten über `/arbeitsrecht:fehlzeit-erfassen` eintragen."

### 2. Fristen-Check für jede offene Abwesenheit

**A – Urlaub (BUrlG):**
- Gesetzlicher Mindesturlaub: 20 Werktage (§ 3 Abs. 1 BUrlG bei 5-Tage-Woche) bzw. 24 Werktage (§ 3 Abs. 1 BUrlG bei 6-Tage-Woche)
- Rechtsprechung: keine Entscheidung aus Modellwissen zitieren; vor Ausgabe über offizielle oder frei zugängliche Quelle mit Gericht, Entscheidungsform, Datum, Aktenzeichen und tragender Aussage verifizieren.
- **Wartefrist:** Voller Urlaubsanspruch erst nach 6-monatigem Bestehen (§ 4 BUrlG); vorher anteiliger Anspruch (§ 5 BUrlG)
- **Urlaubsabgeltung** bei Beendigung des Arbeitsverhältnisses (§ 7 Abs. 4 BUrlG); steuer- und sozialversicherungspflichtig

**B – Entgeltfortzahlung (EFZG):**
- 6-Wochen-Frist pro Erkrankung (§ 3 Abs. 1 EFZG)
- **Beginn neuer Anspruch bei gleicher Krankheit:** Erst nach 6-monatiger Unterbrechung oder 12-Monats-Zeitraum seit letzter AU (§ 3 Abs. 1 S. 2 EFZG)
- Rechtsprechung: keine Entscheidung aus Modellwissen zitieren; vor Ausgabe über offizielle oder frei zugängliche Quelle mit Gericht, Entscheidungsform, Datum, Aktenzeichen und tragender Aussage verifizieren.
- **Wiedereingliederung (stufenweise):** § 74 SGB V, § 28 SGB IX; Anspruch auf Zustimmung zur stufenweisen Wiedereingliederung

**C – Mutterschutz (MuSchG):**
- **Beschäftigungsverbote** (§§ 3–6 MuSchG): 6 Wochen vor dem errechneten Entbindungstermin (§ 3 MuSchG), 8 Wochen nach der Entbindung (§ 3 Abs. 2 MuSchG; bei Frühgeburten: 12 Wochen)
- **Kündigungsschutz** (§ 17 MuSchG): Während Schwangerschaft bis 4 Monate nach Entbindung; Ausnahme nur mit behördlicher Genehmigung
- **Mutterschaftsgeld:** Kassenleistung; Arbeitgeberanteil über Arbeitgeberzuschuss (§ 20 MuSchG)
- **Fristen im Tracker:** Errechneter Entbindungstermin → Fristberechnung Schutzfrist-Ende; Mitteilungspflicht Arbeitnehmer § 15 MuSchG

**D – Elternzeit (BEEG):**
- Anspruch bis 3 Jahre je Kind (§ 15 Abs. 2 BEEG); 24 Monate zwischen 3. und 8. Geburtstag
- **Anmeldefrist:** 7 Wochen vor Beginn (§ 16 Abs. 1 BEEG); bei Elternzeit ab Geburt: 7 Wochen vor Beginn; kann nicht rückwirkend genommen werden
- **Kündigungsschutz** (§ 18 BEEG): Ab Anmeldung der Elternzeit bis zum Ende; Ausnahme § 18 Abs. 1 S. 2 BEEG (besondere Fälle)
- **Teilzeit in Elternzeit** (§ 15 Abs. 6–7 BEEG): Bis 30 h/Woche; Arbeitgeber kann nur bei dringenden betrieblichen Gründen ablehnen
- **Elterngeld:** BEEG §§ 1–13 – keine arbeitsrechtliche Pflicht des Arbeitgebers, aber Informationspflicht

### 3. Alerts nur bei Handlungsbedarf

Darstellung:
- 🔴 **Sofortmaßnahme:** Frist in < 7 Tagen
- 🟠 **Zeitnah handeln:** Frist in 7–30 Tagen
- 🟡 **Auf dem Radar:** Frist in 30–90 Tagen
- 🟢 **Unauffällig** – kein Handlungsbedarf

Keine langen Statustabellen – nur Fälle mit Handlungsbedarf, jeweils mit einem Satz: Wer, was, bis wann.

## Quellen und Zitierweise

Zitierstandard: `../references/zitierweise.md`. Methodik: `../references/methodik-buergerliches-recht.md`.

Wesentliche Quellen:
- Quellenregel: Literatur nur mit Nutzerquelle oder lizenziertem Live-Zugriff; keine Kommentar-, Handbuch- oder Aufsatzfundstellen aus Modellwissen.
- Rechtsprechung: keine Entscheidung aus Modellwissen zitieren; vor Ausgabe über offizielle oder frei zugängliche Quelle mit Gericht, Entscheidungsform, Datum, Aktenzeichen und tragender Aussage verifizieren.
- Quellenregel: Literatur nur mit Nutzerquelle oder lizenziertem Live-Zugriff; keine Kommentar-, Handbuch- oder Aufsatzfundstellen aus Modellwissen.

## Beispiele

```
/arbeitsrecht:fehlzeiten-register
```

```
URLAUB- UND FEHLZEITEN-TRACKER – 15.01.2025

Aktive Abwesenheiten: 8 gesamt | Handlungsbedarf: 2

🟠 ZEITNAH HANDELN
 MA-0047 (Projektmanagerin) – Elternzeit-Anmeldung – Frist: 03.02.2025
 → Elternzeitanmeldung mit 7-Wochen-Frist (§ 16 Abs. 1 BEEG) liegt noch nicht vor.
 Bitte Mitarbeiterin erinnern und Antrag schriftlich bestätigen.

🟡 AUF DEM RADAR
 MA-0031 (Vertrieb) – EFZG-Erschöpfung (gleiche Erkrankung) – 05.03.2025
 → 6. Krankheitswoche bei derselben Erkrankung. BEM prüfen (§ 167 Abs. 2 SGB IX).
 EFZG-Anspruch erschöpft sich am 05.03.2025.

🟢 Unauffällig (6 Fälle) – keine Handlung erforderlich.
```

## Risiken / typische Fehler

- Rechtsprechung: keine Entscheidung aus Modellwissen zitieren; vor Ausgabe über offizielle oder frei zugängliche Quelle mit Gericht, Entscheidungsform, Datum, Aktenzeichen und tragender Aussage verifizieren.
- **BEEG-Anmeldefrist verpasst** – Elternzeit kann nicht rückwirkend genommen werden; späteste Anmeldung 7 Wochen vor Beginn.
- **BEM-Pflicht vor Kündigung** – ohne BEM erhöhte Darlegungslast des Arbeitgebers bei krankheitsbedingter Kündigung.
- **Mutterschutzfristen falsch berechnet** – bei Mehrlingsbirth oder Frühgeburt gelten abweichende Schutzfristen (§ 3 Abs. 2 S. 2 MuSchG: 12 Wochen statt 8 Wochen).
