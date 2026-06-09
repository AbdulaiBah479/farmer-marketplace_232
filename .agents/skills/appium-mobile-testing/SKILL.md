---
<<<<<<< HEAD
name: appium-mobile-testing
description: "Mobile app automation testing with Appium: iOS/Android, driver setup, and parallel execution."
category: testing
---

# Appium Mobile Testing

Mobile app automation testing with Appium: iOS/Android, driver setup, and parallel execution.

## When to Use
Use this skill when working on tasks related to appium mobile testing.

## Key Capabilities
- Expert guidance on appium mobile testing workflows and best practices
- Step-by-step assistance for common appium mobile testing tasks

## Limitations
- Use this skill only when the task clearly matches the scope described above.
=======
name: Appium Mobile Testing
description: Appium mobile testing framework for iOS and Android automation
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Appium Mobile Testing Skill

## Overview

This skill provides expert-level capabilities for Appium-based mobile testing, enabling iOS and Android automation for native, hybrid, and web applications.

## Capabilities

### Server Configuration
- Configure Appium server
- Set up desired capabilities
- Handle driver initialization

### iOS Testing
- iOS simulator setup
- XCUITest driver configuration
- iOS-specific gestures and interactions

### Android Testing
- Android emulator setup
- UiAutomator2 driver configuration
- Android-specific capabilities

### Application Types
- Native app testing
- Hybrid app testing (WebView)
- Mobile web testing

### Gesture Handling
- Swipe, pinch, and long-press gestures
- Multi-touch interactions
- Custom gesture sequences

### Element Interaction
- Mobile-specific locator strategies
- Accessibility ID locators
- UI Automator selectors (Android)
- iOS predicates and class chains

### Device Farm Integration
- BrowserStack integration
- Sauce Labs integration
- AWS Device Farm

### Mobile Assertions
- Mobile-specific test assertions
- Screen orientation validation
- App state verification

## Target Processes

- `mobile-testing.js` - Mobile test implementation
- `cross-browser-testing.js` - Mobile browser testing
- `e2e-test-suite.js` - Mobile E2E scenarios

## Dependencies

- `appium` - Appium server
- `webdriverio` - WebDriver client
- Mobile SDKs (Xcode, Android SDK)

## Usage Example

```javascript
{
  kind: 'skill',
  skill: {
    name: 'appium-mobile',
    context: {
      action: 'execute-tests',
      platform: 'iOS',
      deviceName: 'iPhone 14',
      app: './app/MyApp.ipa',
      automationName: 'XCUITest'
    }
  }
}
```

## Configuration

The skill supports local emulators/simulators and cloud device farms for testing across multiple devices.
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
