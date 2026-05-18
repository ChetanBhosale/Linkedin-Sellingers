# Requirements Document

## Introduction

This feature addresses a bug in the setup page where external links (specifically the SDK documentation link) should open in a new browser tab, but currently open in the same tab using Next.js router navigation. The setup page has an `openTab` property in the step configuration that is defined but not being used.

## Glossary

- **Setup Page**: The workspace setup checklist page located at `/dashboard/setup` that guides users through initial configuration steps
- **Setup Step**: An individual task in the setup checklist (team invitation, subdomain configuration, SDK integration, deeplinks)
- **External Link**: A URL that points to a resource outside the application domain (e.g., documentation site)
- **Internal Link**: A URL that points to a page within the application
- **Router Navigation**: Next.js client-side navigation using the `useRouter` hook

## Requirements

### Requirement 1

**User Story:** As a user completing the setup checklist, I want external documentation links to open in a new tab, so that I don't lose my place in the setup process.

#### Acceptance Criteria

1. WHEN a setup step has `openTab` set to `true`, THEN the system SHALL open the link in a new browser tab
2. WHEN a setup step has `openTab` set to `false`, THEN the system SHALL navigate using the Next.js router within the same tab
3. WHEN an external link opens in a new tab, THEN the system SHALL include `rel="noopener noreferrer"` for security
4. WHEN the SDK step is clicked, THEN the system SHALL open the documentation URL in a new tab
5. WHEN the team, subdomain, or deeplinks steps are clicked, THEN the system SHALL navigate to the internal settings page in the same tab

### Requirement 2

**User Story:** As a developer maintaining the setup page, I want the `SetupStepUI` interface to include the `openTab` property, so that the type system enforces correct usage.

#### Acceptance Criteria

1. WHEN the `SetupStepUI` interface is defined, THEN the system SHALL include an `openTab` boolean property
2. WHEN setup steps are mapped from the hook, THEN the system SHALL preserve the `openTab` property from the configuration
3. WHEN TypeScript compilation occurs, THEN the system SHALL enforce that all setup steps have the `openTab` property defined
