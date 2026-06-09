---
name: gesamtnoten-aggregation
description: "Aggregiert Einzelbewertungen aus Leistungs- Verhaltens- und Schlussformel-Analyse zur Gesamtnote. Anwendungsfall alle Einzelsaetze sind analysiert und eine gewichtete Gesamtnote soll bestimmt werden. Normen § 109 GewO Gesamteindruck BAG-Linie zur Gewichtung Zeugnisbereiche. Prüfraster Gewichtung Leistungsteil Verhaltensteil Schlussformel Ausreisser-Saetze Bereichs-Drift. Output Begründete Gesamtnotenspanne mit Gewichtungsmatrix für Mandantenbericht und Klageantrag. Abgrenzung zu satzweise-notenmatrix (Einzelsatz-Bewertung) und bereichs-drift-detektor."
---

# Gesamtnoten-Aggregation

## Fachlicher Anker

- **Normen:** §§ 611a, §§ 1, §§ 14.
- **Entscheidungs-/Quellenanker:** Tragende Rechtsprechung nur mit Gericht, Datum, Aktenzeichen und frei prüfbarer Quelle einsetzen; keine Entscheidung aus Modellwissen erzwingen.
- **Quellenhygiene:** `references/quellenhygiene.md` und `references/zitierweise.md` beachten.

## Geheimcode-Regeln

| Teilbereich | Gewicht | Besonderheit |
|---|---|---|
| Leistungsbeurteilung gesamt | ca. 50% | Zufriedenheitsformel als Kernindikator |
| Verhaltensbeurteilung | ca. 30% | Reihenfolge und Auslassungen beachten |
| Schlussformel | Kontextsignal | Signalwirkung und Anspruch trennen |
| Rote Auslassung (Integrität/Loyalität) | Gesondert | Kann Gesamtnote um eine Note senken |
| Widersprechende Signale | Gesondert | Führen zu Unsicherheitsabschlag |
| Bereichs-Drift zwei Stufen | minus halbe Stufe | Schaufenster-Pattern |
| Konstante Note 3 in weichen Bereichen | minus halbe Stufe | Lernen, Innovation, Sozialverhalten |

## Beispiele

**Beispiel 1 – Klares Note-1-Zeugnis:** Leistungsbeurteilung grün (Note 1), Verhalten grün (Note 1), Schlussformel grün (Note 1) → Gesamtnote: Note 1. Keine Abweichungen.

**Beispiel 2 – Gemischtes Zeugnis Note 2-3:** Leistung grün (Note 2), Verhalten orange (Note 3), Schlussformel orange (Note 3) → Gewichteter Wert: ca. Note 2 bis 3. Empfehlung: Verhaltens- und Schlussformel nachverhandeln.

**Beispiel 3 – Rote Auslassung senkt Note:** Zeugnis insgesamt Note 2 aus Einzelwertungen, aber fehlende Loyalitätsaussage bei einer Führungskraft → Gesamtnote abgesenkt auf Note 2-3 mit Hinweis auf das Loyalitätssignal.

**Beispiel 4 – Widersprüchliches Zeugnis:** Leistung grün, Verhalten rot, Schlussformel grün → Note 2 bis 3 mit Unsicherheitsabschlag wegen Widerspruchs; Skill empfiehlt Verweis auf widerspruechliche-bewertungen.

**Beispiel 5 – Minimalistisches Zeugnis:** Alle Aussagen orange (Note 3), vollständige Schlussformel → Gesamtnote: Note 3. Verbesserungspotenzial in allen Bereichen.

**Beispiel 6 – Schaufenster-Zeugnis:** Spitzensätze grün (Note 1) bei Fachkenntnissen, Arbeitsweise, Arbeitsergebnis; daneben orange Sätze (Note 3) zu Lernbereitschaft, Innovation, Sozialverhalten; Schlussformel grün (Note 1). Rechnerischer Wert vor Penalty: Note 1 bis 2. Drift-Penalty Lernbereitschaft: minus halbe Stufe. Konstante Note 3 in weichen Bereichen: minus halbe Stufe. Gesamtnote: Note 2 bis Note 3, nicht Note 1 wie die Schaufenster-Sätze suggerieren.

## Rechtliche Einordnung und Normen

- **§ 109 GewO** — Anspruch auf qualifiziertes wohlwollendes Zeugnis; Grundlage aller Bewertungen
- **§§ 195, 199 BGB** — Verjährung drei Jahre ab Jahresende

## Aktuelle Rechtsprechung

- Rechtsprechung: keine Entscheidung aus Modellwissen zitieren; vor Ausgabe über offizielle oder frei zugängliche Quelle mit Gericht, Entscheidungsform, Datum, Aktenzeichen und tragender Aussage verifizieren.

