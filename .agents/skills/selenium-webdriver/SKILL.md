---
<<<<<<< HEAD
name: selenium-webdriver
description: "Browser automation with Selenium: WebDriver, Grid, and Page Object Model pattern."
category: testing
---

# Selenium WebDriver

Browser automation with Selenium: WebDriver, Grid, and Page Object Model pattern.

## When to Use
Use this skill when working on tasks related to selenium webdriver.

## Key Capabilities
- Expert guidance on selenium webdriver workflows and best practices
- Step-by-step assistance for common selenium webdriver tasks

## Limitations
- Use this skill only when the task clearly matches the scope described above.
=======
name: Selenium WebDriver
description: Selenium WebDriver expertise for cross-browser automation and legacy system testing
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Selenium WebDriver Skill

## Overview

This skill provides expert-level capabilities for Selenium WebDriver-based automation, enabling cross-browser testing, grid configuration, and integration with mobile testing through Appium.

## Capabilities

### WebDriver Management
- WebDriver initialization and configuration
- Browser driver management (ChromeDriver, GeckoDriver, etc.)
- Session handling and cleanup

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge support
- Handle browser-specific quirks and capabilities
- Configure browser options and preferences

### Grid Configuration
- Selenium Grid setup for parallel execution
- Node registration and management
- Docker-based grid configuration

### Element Interaction
- Handle dynamic waits and element location strategies
- Implement robust element locators
- Handle iframes, windows, and alerts

### Page Object Model
- Generate Page Object Model patterns
- Implement reusable page components
- Create fluent APIs for test readability

### Mobile Integration
- Mobile browser testing configuration
- Appium integration for native apps

## Target Processes

- `e2e-test-suite.js` - Full E2E test suite implementation
- `cross-browser-testing.js` - Cross-browser compatibility testing
- `mobile-testing.js` - Mobile web testing

## Dependencies

- `selenium-webdriver` - WebDriver client
- Browser-specific drivers (chromedriver, geckodriver)
- Java (for Selenium Grid)

## Usage Example

```javascript
{
  kind: 'skill',
  skill: {
    name: 'selenium-webdriver',
    context: {
      action: 'execute-tests',
      browsers: ['chrome', 'firefox', 'edge'],
      gridUrl: 'http://localhost:4444/wd/hub',
      parallel: true
    }
  }
}
```

## Configuration

The skill supports both local WebDriver execution and remote Selenium Grid connections.
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
