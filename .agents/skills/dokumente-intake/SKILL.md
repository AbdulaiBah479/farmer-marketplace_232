---
name: dokumente-intake
description: "Dokumentenintake für Strafrechtliche Aktenaufbereitung: sortiert Ermittlungsakte, Anklageschrift, Hauptverhandlungsprotokoll, prüft Datum, Absender, Frist und Beweiswert (Zeugenaussagen, Tatortfotos); markiert Lücken; berücksichtigt Mandatsgeheimnis § 43a BRAO."
---

# Dokumentenintake

## Aktenstart statt Formularstart

Wenn zu **Dokumente Intake** bereits Unterlagen, ein Ordner, ein ZIP, ein PDF-Buendel, E-Mails, Screenshots, Tabellen oder Entwuerfe vorliegen, lies diese zuerst aus. Bilde fuer **Aktenaufbereiter Strafrecht** eine Arbeitshypothese zu Beteiligten, Rolle des Nutzers, Verfahrensstand, Fristen, Betrags-/Datumslogik, Belegen und naechstem sinnvollen Output. Frage nicht routinemaessig nach Angaben, die sich aus der Akte ergeben.

Starte dann mit einer knappen Rueckmeldung:

```text
Ich habe aus der Akte vorlaeufig erkannt: [...]
Unsicher sind noch: [...]
Als naechsten Schritt schlage ich vor: [...]
```

Stelle danach hoechstens drei Rueckfragen und nur zu echten Luecken oder Widerspruechen. Wenn keine Akte vorliegt, bitte zuerst um Upload der wichtigsten Unterlagen statt ein langes Interview zu beginnen.

## Einsatzlage

Dieser Dokumenten-Intake für **Aktenaufbereiter Strafrecht** ordnet Anlagen, Registerdaten, Korrespondenz, Bescheide, Fristen und Beleglücken zu einer belastbaren Arbeitsakte.

## Fachlandkarte dieses Plugins

- `aktenaufbereiter-erstpruefung-und-mandatsziel` — Aktenaufbereiter Erstpruefung und Mandatsziel
- `aktenaufbereiter-strafrecht` — Aktenaufbereiter Strafrecht
- `akteneinsicht-uebersicht-aktenvorblatt` — Akteneinsicht Uebersicht Aktenvorblatt
- `aktenlektuere-fristennotiz-und-naechster-schritt` — Aktenlektuere Fristennotiz und Naechster Schritt
- `aktenvorblatt-erstellen` — Aktenvorblatt Erstellen
- `aktenvorblatt-schriftsatz-brief-und-memo-bausteine` — Aktenvorblatt Schriftsatz Brief und Memo Bausteine
- `anklageschrift-zerlegen` — Anklageschrift Zerlegen
- `aussageanalyse-aussagepsychologie` — Aussageanalyse Aussagepsychologie
- `beweismittel-katalog-beweisverwertungsverbote` — Beweismittel Katalog Beweisverwertungsverbote
- `beweisverwertungsverbote-pruefen` — Beweisverwertungsverbote Pruefen
- `beziehungen-spezial-chronologie-ergaenzbar` — Beziehungen Spezial Chronologie Ergaenzbar
- `beziehungsmatrix-personen-taten` — Beziehungsmatrix Personen Taten
- `chronologie-compliance-dokumentation-und-akte` — Chronologie Compliance Dokumentation und Akte
- `anschluss-routing` — Anschluss Routing
- `einstieg-routing` — Einstieg Routing

## Arbeitsweg

- Eingangsdokumente nach Typ ordnen: Vertragsurkunden, Schriftsätze, Verwaltungsakte, Protokolle, Bescheide und externe Beweismittel des Fachgebiets.
- Pro Dokument prüfen: Datum, Absender, Empfänger, Zustellungsnachweis, Fristwirkung, Beweiswert für die Aktenaufbereiter Strafrecht-Frage.
- Lücken, Widersprüche, fehlende Anlagen und ungeklärte Zustellungen markieren; bei Original-Beweisbedarf auf Beweissicherung achten.
- Tragende Normen vorläufig zuordnen: die einschlägigen Normen des Fachgebiets live über gesetze-im-internet.de und dejure.org prüfen — Endfeststellung erst nach Live-Check.
- Sensible Daten nach Berufsrecht, DSGVO und Mandatsgeheimnis behandeln; Akteneinsichts- und Herausgabepflichten gegenüber Mandant, Gegner, zuständiges Gericht oder Behörde, etwaige Sachverständige oder beauftragte Stellen prüfen.

## Qualitätsanker

- Normen und Rechtsprechung nach `references/quellenhygiene.md` und `references/zitierweise.md` behandeln.
- Wenn eine Spezialfrage sichtbar wird, den passenden Skill nennen und kurz erklären, warum genau dieser Arbeitsgang passt.
- Bei Zeitdruck zuerst Frist, Zuständigkeit, Form und Beweislast sichern.
