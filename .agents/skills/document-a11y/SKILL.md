---
name: document-a11y
description: >
  Document accessibility audit skill for Word (.docx), Excel (.xlsx),
  PowerPoint (.pptx), and PDF files. Use this skill whenever the user asks
  to review, scan, audit, or fix a document for accessibility, or when
  creating accessible documents from scratch. Also trigger when the user
  mentions document accessibility, PDF/UA, Matterhorn Protocol, accessible
  PDFs, alt text in documents, heading structure in Word, table headers in
  Excel, slide reading order, or VPAT/ACR generation. Covers WCAG 2.2 AA
  mapped to document-specific rules. Works alongside the docx, xlsx, pptx,
  and pdf file-creation skills — this skill adds the accessibility audit
  layer on top.
---

# Document Accessibility

Documents are the most common format for business communication. An
inaccessible Word file, Excel spreadsheet, PowerPoint presentation, or PDF
locks out every screen reader user — and that includes employees, customers,
students, and government constituents who rely on JAWS, NVDA, VoiceOver, or
other assistive technology.

This skill ensures documents meet WCAG 2.2 AA standards mapped to each
format's specific structure.

> **AI and automated review are not perfect.** Always verify document
> accessibility using the built-in accessibility checker in Microsoft Office
> or Adobe Acrobat Pro, and test with actual screen readers.

## How This Skill Works

Detect the document format and load the corresponding reference file:

| Format | Reference File | Rule Count |
|--------|---------------|------------|
| Word (.docx) | `references/word-rules.md` | 16 rules (9 errors, 6 warnings, 3 tips) |
| Excel (.xlsx) | `references/excel-rules.md` | 14 rules (6 errors, 5 warnings, 3 tips) |
| PowerPoint (.pptx) | `references/powerpoint-rules.md` | 16 rules (6 errors, 6 warnings, 4 tips) |
| PDF (.pdf) | `references/pdf-rules.md` | 56 rules across 3 layers |
| Cross-format WCAG map | `references/wcag-mapping.md` | All rules mapped to WCAG SC |

Load the appropriate reference before reviewing. For cross-format audits
(e.g., "audit all documents in this folder"), load all relevant references.

## Native-Tool-First Guidance

When explaining findings or generating reports, always lead with the fix
path in the native application:

- **Word:** Start with Word UI steps (Review → Check Accessibility)
- **Excel:** Start with Excel UI steps
- **PowerPoint:** Start with PowerPoint UI steps
- **PDF:** Start with Adobe Acrobat Pro tools and menu paths

Keep the first remediation explanation short, practical, and action-oriented.
Put Open XML, PDF object model, or automation details under an "Advanced /
Technical Follow-Up" section. Assume many readers are document authors, not
developers.

## Universal Document Accessibility Requirements

Regardless of format, every accessible document must have:

1. **Document title** in properties (not just the filename)
2. **Language** set in document properties
3. **Heading structure** that doesn't skip levels
4. **Alt text** on all informative images, charts, and shapes
5. **Table headers** designated for data tables
6. **Descriptive hyperlink text** (never "click here" or raw URLs)
7. **No reliance on color alone** to convey information
8. **Logical reading order** that a screen reader can follow
9. **No content in headers/footers** that isn't repeated in the body
   (screen readers handle headers/footers inconsistently)

## Severity Classification

| Severity | Label | Meaning |
|----------|-------|---------|
| Error | E-rules | Blocking accessibility — screen reader users cannot access this content |
| Warning | W-rules | Significant barrier — degraded or confusing experience |
| Tip | T-rules | Best practice — improves quality but not a WCAG violation |

## Report Format

```
## Document Accessibility Audit: [filename]

**Format:** [DOCX / XLSX / PPTX / PDF]
**Rules checked:** [count]
**Errors:** [count] | **Warnings:** [count] | **Tips:** [count]

### Errors (Must Fix)
- [Rule ID] [Rule Name]: [What's wrong] → **Start Here:** [Native app fix]

### Warnings (Should Fix)
- [Rule ID] [Rule Name]: [What's wrong] → **Start Here:** [Native app fix]

### Tips (Nice to Have)
- [Rule ID] [Rule Name]: [What's wrong] → **Start Here:** [Native app fix]

### What's Done Well
- [Note positive patterns]
```
