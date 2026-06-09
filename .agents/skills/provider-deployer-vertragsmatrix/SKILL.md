---
name: provider-deployer-vertragsmatrix
description: "Vertragsmatrix Anbieter/Betreiber: Pflichtenverschiebung vermeiden, Art. 25-Re-Provisioning, Art. 26-Betreiberpflichten, Art. 13-Informationen, GPAI-Downstream, Audit, Incident, Haftung und Change Control."
---

# Anbieter-Betreiber-Vertragsmatrix

## Problem

KI-Verträge scheitern oft daran, dass technische und regulatorische Verantwortung unklar verteilt ist. Dieser Skill baut eine Matrix, die KI-VO-Rollen und Vertragsklauseln zusammenführt.

## Matrixfelder

| Thema | Anbieter | Betreiber | Vertrag |
|---|---|---|---|
| Zweckbestimmung | definiert und dokumentiert | hält Einsatz daran | Use Case Schedule |
| Hochrisiko | Konformität, Dokumentation | Betreiberpflichten | AI Act Annex |
| Human Oversight | Funktionen bereitstellen | Menschen schulen | RACI |
| Logs | technische Aufzeichnung | Auswertung/Retention | Logging Annex |
| Incident | Mitteilung, Abhilfe | Meldung/Koordination | Incident Clause |
| Modelländerung | Change Notice | Re-Evaluation | Change Control |
| GPAI | Downstream-Infos | Weitergabe in Systemakte | Model Info Annex |

## Red Flags

- Anbieter lehnt jede KI-VO-Aussage ab.
- Betreiber darf Zweck massiv ändern.
- Kein Zugriff auf Modell- oder Versionsinformationen.
- Keine Incident-Fristen.
- Unklare Haftung bei Outputfehlern.
