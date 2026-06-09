---
<<<<<<< HEAD
name: invoice-organizer
description: Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information, renaming them consistently, and sorting them into logical folders. Turns hours of manual bookkeeping into minutes of automated organization.
=======
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0
# ═══════════════════════════════════════════════════════════════════════════════

# Basic Information
name: Invoice Organizer
description: "Organize, categorize, and track invoices and receipts"
version: "1.0"
author: claude-office-skills
license: MIT

# Categorization
category: finance
tags:
  - invoice
  - organization
  - tracking
department: Finance

# AI Model Compatibility
models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

# MCP Tools Integration
mcp:
  server: office-mcp
  tools:
    - extract_text_from_pdf
    - read_xlsx
    - create_xlsx

# Skill Capabilities
capabilities:
  - invoice_management
  - categorization
  - data_extraction

# Language Support
languages:
  - en
  - zh
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
---

# Invoice Organizer

<<<<<<< HEAD
This skill transforms chaotic folders of invoices, receipts, and financial documents into a clean, tax-ready filing system without manual effort.

## When to Use This Skill

- Preparing for tax season and need organized records
- Managing business expenses across multiple vendors
- Organizing receipts from a messy folder or email downloads
- Setting up automated invoice filing for ongoing bookkeeping
- Archiving financial records by year or category
- Reconciling expenses for reimbursement
- Preparing documentation for accountants

## What This Skill Does

1. **Reads Invoice Content**: Extracts information from PDFs, images, and documents:
   - Vendor/company name
   - Invoice number
   - Date
   - Amount
   - Product or service description
   - Payment method

2. **Renames Files Consistently**: Creates standardized filenames:
   - Format: `YYYY-MM-DD Vendor - Invoice - ProductOrService.pdf`
   - Examples: `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`

3. **Organizes by Category**: Sorts into logical folders:
   - By vendor
   - By expense category (software, office, travel, etc.)
   - By time period (year, quarter, month)
   - By tax category (deductible, personal, etc.)

4. **Handles Multiple Formats**: Works with:
   - PDF invoices
   - Scanned receipts (JPG, PNG)
   - Email attachments
   - Screenshots
   - Bank statements

5. **Maintains Originals**: Preserves original files while organizing copies

## How to Use

### Basic Usage

Navigate to your messy invoice folder:
```
cd ~/Desktop/receipts-to-sort
```

Then ask Claude Code:
```
Organize these invoices for taxes
```

Or more specifically:
```
Read all invoices in this folder, rename them to 
"YYYY-MM-DD Vendor - Invoice - Product.pdf" format, 
and organize them by vendor
```

### Advanced Organization

```
Organize these invoices:
1. Extract date, vendor, and description from each file
2. Rename to standard format
3. Sort into folders by expense category (Software, Office, Travel, etc.)
4. Create a CSV spreadsheet with all invoice details for my accountant
```

## Instructions

When a user requests invoice organization:

1. **Scan the Folder**
   
   Identify all invoice files:
   ```bash
   # Find all invoice-related files
   find . -type f \( -name "*.pdf" -o -name "*.jpg" -o -name "*.png" \) -print
   ```
   
   Report findings:
   - Total number of files
   - File types
   - Date range (if discernible from names)
   - Current organization (or lack thereof)

2. **Extract Information from Each File**
   
   For each invoice, extract:
   
   **From PDF invoices**:
   - Use text extraction to read invoice content
   - Look for common patterns:
     - "Invoice Date:", "Date:", "Issued:"
     - "Invoice #:", "Invoice Number:"
     - Company name (usually at top)
     - "Amount Due:", "Total:", "Amount:"
     - "Description:", "Service:", "Product:"
   
   **From image receipts**:
   - Read visible text from images
   - Identify vendor name (often at top)
   - Look for date (common formats)
   - Find total amount
   
   **Fallback for unclear files**:
   - Use filename clues
   - Check file creation/modification date
   - Flag for manual review if critical info missing

3. **Determine Organization Strategy**
   
   Ask user preference if not specified:
   
   ```markdown
   I found [X] invoices from [date range].
   
   How would you like them organized?
   
   1. **By Vendor** (Adobe/, Amazon/, Stripe/, etc.)
   2. **By Category** (Software/, Office Supplies/, Travel/, etc.)
   3. **By Date** (2024/Q1/, 2024/Q2/, etc.)
   4. **By Tax Category** (Deductible/, Personal/, etc.)
   5. **Custom** (describe your structure)
   
   Or I can use a default structure: Year/Category/Vendor
   ```

4. **Create Standardized Filename**
   
   For each invoice, create a filename following this pattern:
   
   ```
   YYYY-MM-DD Vendor - Invoice - Description.ext
   ```
   
   Examples:
   - `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`
   - `2024-01-10 Amazon - Receipt - Office Supplies.pdf`
   - `2023-12-01 Stripe - Invoice - Monthly Payment Processing.pdf`
   
   **Filename Best Practices**:
   - Remove special characters except hyphens
   - Capitalize vendor names properly
   - Keep descriptions concise but meaningful
   - Use consistent date format (YYYY-MM-DD) for sorting
   - Preserve original file extension

5. **Execute Organization**
   
   Before moving files, show the plan:
   
   ```markdown
   # Organization Plan
   
   ## Proposed Structure
   ```
   Invoices/
   ├── 2023/
   │   ├── Software/
   │   │   ├── Adobe/
   │   │   └── Microsoft/
   │   ├── Services/
   │   └── Office/
   └── 2024/
       ├── Software/
       ├── Services/
       └── Office/
   ```
   
   ## Sample Changes
   
   Before: `invoice_adobe_march.pdf`
   After: `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`
   Location: `Invoices/2024/Software/Adobe/`
   
   Before: `IMG_2847.jpg`
   After: `2024-02-10 Staples - Receipt - Office Supplies.jpg`
   Location: `Invoices/2024/Office/Staples/`
   
   Process [X] files? (yes/no)
   ```
   
   After approval:
   ```bash
   # Create folder structure
   mkdir -p "Invoices/2024/Software/Adobe"
   
   # Copy (don't move) to preserve originals
   cp "original.pdf" "Invoices/2024/Software/Adobe/2024-03-15 Adobe - Invoice - Creative Cloud.pdf"
   
   # Or move if user prefers
   mv "original.pdf" "new/path/standardized-name.pdf"
   ```

6. **Generate Summary Report**
   
   Create a CSV file with all invoice details:
   
   ```csv
   Date,Vendor,Invoice Number,Description,Amount,Category,File Path
   2024-03-15,Adobe,INV-12345,Creative Cloud,52.99,Software,Invoices/2024/Software/Adobe/2024-03-15 Adobe - Invoice - Creative Cloud.pdf
   2024-03-10,Amazon,123-4567890-1234567,Office Supplies,127.45,Office,Invoices/2024/Office/Amazon/2024-03-10 Amazon - Receipt - Office Supplies.pdf
   ...
   ```
   
   This CSV is useful for:
   - Importing into accounting software
   - Sharing with accountants
   - Expense tracking and reporting
   - Tax preparation

7. **Provide Completion Summary**
   
   ```markdown
   # Organization Complete! 📊
   
   ## Summary
   - **Processed**: [X] invoices
   - **Date range**: [earliest] to [latest]
   - **Total amount**: $[sum] (if amounts extracted)
   - **Vendors**: [Y] unique vendors
   
   ## New Structure
   ```
   Invoices/
   ├── 2024/ (45 files)
   │   ├── Software/ (23 files)
   │   ├── Services/ (12 files)
   │   └── Office/ (10 files)
   └── 2023/ (12 files)
   ```
   
   ## Files Created
   - `/Invoices/` - Organized invoices
   - `/Invoices/invoice-summary.csv` - Spreadsheet for accounting
   - `/Invoices/originals/` - Original files (if copied)
   
   ## Files Needing Review
   [List any files where information couldn't be extracted completely]
   
   ## Next Steps
   1. Review the `invoice-summary.csv` file
   2. Check files in "Needs Review" folder
   3. Import CSV into your accounting software
   4. Set up auto-organization for future invoices
   
   Ready for tax season! 🎉
   ```

## Examples

### Example 1: Tax Preparation (From Martin Merschroth)

**User**: "I have a messy folder of invoices for taxes. Sort them and rename properly."

**Process**:
1. Scans folder: finds 147 PDFs and images
2. Reads each invoice to extract:
   - Date
   - Vendor name
   - Invoice number
   - Product/service description
3. Renames all files: `YYYY-MM-DD Vendor - Invoice - Product.pdf`
4. Organizes into: `2024/Software/`, `2024/Travel/`, etc.
5. Creates `invoice-summary.csv` for accountant
6. Result: Tax-ready organized invoices in minutes

### Example 2: Monthly Expense Reconciliation

**User**: "Organize my business receipts from last month by category."

**Output**:
```markdown
# March 2024 Receipts Organized

## By Category
- Software & Tools: $847.32 (12 invoices)
- Office Supplies: $234.18 (8 receipts)
- Travel & Meals: $1,456.90 (15 receipts)
- Professional Services: $2,500.00 (3 invoices)

Total: $5,038.40

All receipts renamed and filed in:
`Business-Receipts/2024/03-March/[Category]/`

CSV export: `march-2024-expenses.csv`
```

### Example 3: Multi-Year Archive

**User**: "I have 3 years of random invoices. Organize them by year, then by vendor."

**Output**: Creates structure:
```
Invoices/
├── 2022/
│   ├── Adobe/
│   ├── Amazon/
│   └── ...
├── 2023/
│   ├── Adobe/
│   ├── Amazon/
│   └── ...
└── 2024/
    ├── Adobe/
    ├── Amazon/
    └── ...
```

Each file properly renamed with date and description.

### Example 4: Email Downloads Cleanup

**User**: "I download invoices from Gmail. They're all named 'invoice.pdf', 'invoice(1).pdf', etc. Fix this mess."

**Output**:
```markdown
Found 89 files all named "invoice*.pdf"

Reading each file to extract real information...

Renamed examples:
- invoice.pdf → 2024-03-15 Shopify - Invoice - Monthly Subscription.pdf
- invoice(1).pdf → 2024-03-14 Google - Invoice - Workspace.pdf
- invoice(2).pdf → 2024-03-10 Netlify - Invoice - Pro Plan.pdf

All files renamed and organized by vendor.
```

## Common Organization Patterns

### By Vendor (Simple)
```
Invoices/
├── Adobe/
├── Amazon/
├── Google/
└── Microsoft/
```

### By Year and Category (Tax-Friendly)
```
Invoices/
├── 2023/
│   ├── Software/
│   ├── Hardware/
│   ├── Services/
│   └── Travel/
└── 2024/
    └── ...
```

### By Quarter (Detailed Tracking)
```
Invoices/
├── 2024/
│   ├── Q1/
│   │   ├── Software/
│   │   ├── Office/
│   │   └── Travel/
│   └── Q2/
│       └── ...
```

### By Tax Category (Accountant-Ready)
```
Invoices/
├── Deductible/
│   ├── Software/
│   ├── Office/
│   └── Professional-Services/
├── Partially-Deductible/
│   └── Meals-Travel/
└── Personal/
```

## Automation Setup

For ongoing organization:

```
Create a script that watches my ~/Downloads/invoices folder 
and auto-organizes any new invoice files using our standard 
naming and folder structure.
```

This creates a persistent solution that organizes invoices as they arrive.

## Pro Tips

1. **Scan emails to PDF**: Use Preview or similar to save email invoices as PDFs first
2. **Consistent downloads**: Save all invoices to one folder for batch processing
3. **Monthly routine**: Organize invoices monthly, not annually
4. **Backup originals**: Keep original files before reorganizing
5. **Include amounts in CSV**: Useful for budget tracking
6. **Tag by deductibility**: Note which expenses are tax-deductible
7. **Keep receipts 7 years**: Standard audit period

## Handling Special Cases

### Missing Information
If date/vendor can't be extracted:
- Flag file for manual review
- Use file modification date as fallback
- Create "Needs-Review/" folder

### Duplicate Invoices
If same invoice appears multiple times:
- Compare file hashes
- Keep highest quality version
- Note duplicates in summary

### Multi-Page Invoices
For invoices split across files:
- Merge PDFs if needed
- Use consistent naming for parts
- Note in CSV if invoice is split

### Non-Standard Formats
For unusual receipt formats:
- Extract what's possible
- Standardize what you can
- Flag for review if critical info missing

## Related Use Cases

- Creating expense reports for reimbursement
- Organizing bank statements
- Managing vendor contracts
- Archiving old financial records
- Preparing for audits
- Tracking subscription costs over time

=======
Organize, categorize, and track invoices and receipts for better financial management.

## Overview

This skill helps you:
- Extract key data from invoices
- Categorize expenses automatically
- Track payment status
- Organize files consistently
- Prepare for tax/audit

## How to Use

### Process Invoice
```
"Extract data from this invoice"
"Categorize this receipt"
"Add this invoice to my tracking"
```

### Organize
```
"Organize my invoice folder"
"Create a filing system for receipts"
"Sort invoices by vendor and date"
```

### Report
```
"Summarize invoices by category"
"Show unpaid invoices"
"Generate expense report for Q1"
```

## Data Extraction

### Invoice Data Fields
```markdown
## Invoice Data Extraction

### Extracted Information
| Field | Value | Confidence |
|-------|-------|------------|
| **Vendor** | Acme Corp | 98% |
| **Invoice #** | INV-2026-0042 | 99% |
| **Invoice Date** | 2026-01-15 | 99% |
| **Due Date** | 2026-02-14 | 99% |
| **Subtotal** | $1,250.00 | 98% |
| **Tax** | $100.00 | 98% |
| **Total** | $1,350.00 | 99% |
| **Currency** | USD | 99% |

### Line Items
| Description | Qty | Unit Price | Total |
|-------------|-----|------------|-------|
| Consulting Services | 10 hrs | $100.00 | $1,000.00 |
| Software License | 1 | $250.00 | $250.00 |

### Vendor Details
- **Company**: Acme Corp
- **Address**: 123 Business St, NY 10001
- **Tax ID**: 12-3456789
- **Contact**: billing@acme.com

### Payment Information
- **Terms**: Net 30
- **Method**: Bank Transfer
- **Account**: XXXX-1234
```

## Categorization

### Expense Categories
```markdown
## Expense Category System

### Standard Categories
| Category | Subcategory | Examples |
|----------|-------------|----------|
| **Office** | Supplies | Paper, pens, toner |
| | Equipment | Computers, furniture |
| | Services | Cleaning, maintenance |
| **Travel** | Transportation | Flights, trains, taxis |
| | Accommodation | Hotels, Airbnb |
| | Meals | Client dinners, per diem |
| **Software** | Subscriptions | SaaS, cloud services |
| | Licenses | One-time purchases |
| **Professional** | Legal | Attorney fees |
| | Accounting | CPA, bookkeeping |
| | Consulting | Advisors, contractors |
| **Marketing** | Advertising | Ads, sponsorships |
| | Events | Conferences, booths |
| | Content | Design, copywriting |
| **Utilities** | Phone/Internet | Telecom services |
| | Cloud/Hosting | AWS, servers |

### Auto-Categorization Rules
| Vendor Contains | → Category |
|-----------------|------------|
| Amazon Web Services | Software > Cloud |
| Office Depot | Office > Supplies |
| United Airlines | Travel > Transportation |
| Marriott, Hilton | Travel > Accommodation |
| Adobe, Microsoft | Software > Subscriptions |
```

## Filing System

### Folder Structure
```markdown
## Invoice Filing System

### By Year and Category
```
📁 Invoices/
├── 📁 2026/
│   ├── 📁 Office/
│   │   └── 2026-01-15_Staples_125.50_INV001.pdf
│   ├── 📁 Software/
│   │   └── 2026-01-20_Adobe_54.99_INV002.pdf
│   ├── 📁 Travel/
│   │   └── 2026-01-22_United_450.00_INV003.pdf
│   ├── 📁 Professional/
│   └── 📁 Other/
├── 📁 2025/
│   └── ...
└── 📁 Archive/
```

### Naming Convention
```
YYYY-MM-DD_Vendor_Amount_InvoiceNumber.pdf
```

**Examples**:
- 2026-01-15_AcmeCorp_1350.00_INV-2026-0042.pdf
- 2026-01-20_Adobe_54.99_Monthly.pdf
- 2026-01-22_DeltaAirlines_425.00_CONF123456.pdf
```

## Tracking System

### Invoice Register
```markdown
## Invoice Tracking Register

### Open Invoices
| Invoice # | Vendor | Date | Due | Amount | Status | Days |
|-----------|--------|------|-----|--------|--------|------|
| INV-042 | Acme | 01/15 | 02/14 | $1,350 | ⏳ Pending | 14 |
| INV-045 | Beta | 01/18 | 02/17 | $890 | ⏳ Pending | 11 |
| INV-048 | Gamma | 01/22 | 01/29 | $500 | 🔴 Overdue | -1 |

### Recently Paid
| Invoice # | Vendor | Paid Date | Amount | Method |
|-----------|--------|-----------|--------|--------|
| INV-038 | Delta | 01/25 | $720 | ACH |
| INV-035 | Epsilon | 01/22 | $1,200 | Check |

### Summary
| Status | Count | Total |
|--------|-------|-------|
| Pending | 2 | $2,240 |
| Overdue | 1 | $500 |
| Paid (Jan) | 2 | $1,920 |
```

### Payment Tracking
```markdown
## Invoice Payment Tracker

### Invoice: INV-2026-0042 (Acme Corp)

| Date | Event | Notes |
|------|-------|-------|
| 01/15 | Received | Via email |
| 01/16 | Reviewed | Approved by Manager |
| 01/20 | Scheduled | Payment batch 01/25 |
| 01/25 | Paid | ACH Ref: 789456 |
| 01/25 | Filed | /2026/Professional/ |

### Payment Details
- **Method**: ACH Transfer
- **Reference**: 789456
- **Bank**: Chase Business
- **Confirmation**: Sent to vendor
```

## Reports

### Monthly Summary
```markdown
## Invoice Summary: January 2026

### Overview
| Metric | Value |
|--------|-------|
| Total Invoices | 28 |
| Total Amount | $12,450.00 |
| Avg per Invoice | $444.64 |
| Paid | 22 ($9,800) |
| Pending | 4 ($2,150) |
| Overdue | 2 ($500) |

### By Category
| Category | Count | Amount | % of Total |
|----------|-------|--------|------------|
| Software | 8 | $4,200 | 33.7% |
| Professional | 5 | $3,500 | 28.1% |
| Office | 6 | $2,100 | 16.9% |
| Travel | 4 | $1,650 | 13.3% |
| Utilities | 3 | $600 | 4.8% |
| Other | 2 | $400 | 3.2% |

### By Vendor
| Vendor | Invoices | Total |
|--------|----------|-------|
| Adobe | 2 | $1,200 |
| AWS | 1 | $2,800 |
| Acme Corp | 3 | $3,200 |
| ... | ... | ... |

### Trends
- Software expenses up 15% from December
- Travel expenses down 20% (seasonal)
- New vendor added: Gamma Inc.
```

### Tax Preparation
```markdown
## Tax-Ready Invoice Report: 2025

### Annual Summary
| Category | Total | Tax Deductible |
|----------|-------|----------------|
| Office Supplies | $4,500 | ✅ Yes |
| Software | $18,000 | ✅ Yes |
| Travel - Business | $8,200 | ✅ Yes |
| Travel - Meals (50%) | $1,200 | ⚠️ Partial |
| Professional Services | $12,000 | ✅ Yes |
| **Total Deductible** | **$43,900** | |

### Required Documentation
| Expense Over $75 | Count | Status |
|------------------|-------|--------|
| With receipt | 45 | ✅ |
| Missing receipt | 3 | ⚠️ |

### Missing Receipts
| Date | Vendor | Amount | Action |
|------|--------|--------|--------|
| 03/15 | Hotel ABC | $189 | Request from vendor |
| 07/22 | Uber | $85 | Download from app |
| 11/08 | Restaurant | $95 | Use bank statement |

### Vendor 1099 Review
| Vendor | Total Paid | 1099 Required |
|--------|------------|---------------|
| Consultant A | $8,500 | ✅ Yes (>$600) |
| Consultant B | $450 | ❌ No |
```

## Automation Rules

### Auto-Processing
```markdown
## Invoice Automation Rules

### Email Processing
| Trigger | Action |
|---------|--------|
| From: *@vendor1.com | Auto-categorize: Software |
| Subject: "Invoice" | Add to review queue |
| Attachment: PDF | Extract data |

### Auto-Categorization
| Condition | Category | Confidence |
|-----------|----------|------------|
| Vendor = Adobe | Software > Subscriptions | High |
| Contains "flight" | Travel > Transportation | High |
| Amount < $50 | Office > Supplies | Medium |

### Alerts
| Condition | Alert |
|-----------|-------|
| Due in 3 days | Email reminder |
| Overdue | Daily notification |
| Large invoice (>$1000) | Manager approval required |
```

## Limitations

- Cannot perform actual file operations
- OCR quality affects data extraction
- Categories may need manual adjustment
- Cannot integrate directly with accounting software
- Exchange rates need external verification
- Tax advice should come from professionals
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
