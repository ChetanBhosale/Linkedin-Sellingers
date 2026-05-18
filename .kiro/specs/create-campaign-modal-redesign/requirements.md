# Requirements Document

## Introduction

This document specifies the requirements for redesigning the Create Campaign modal in the Linkrunner dashboard. The new design features a cleaner, more organized layout with improved visual hierarchy, collapsible Advanced Options section, and updated footer actions (Back, Skip, Next buttons). The redesign maintains all existing API functionality while updating the UI to match the new Figma designs.

## Glossary

- **Campaign**: A marketing link configuration that tracks user interactions and redirects users to app stores or specific destinations
- **Deferred Deep Linking**: A feature that directs users to a specific page in the app after installation from the store
- **Display ID**: A custom identifier for the campaign URL
- **Ad Channel**: The advertising platform used for the campaign (Meta, Google Ads, TikTok, etc.)
- **Domain**: The base URL domain used for campaign links
- **Store Listing**: Custom app store listing configuration for redirects
- **Shortlink**: A shortened version of the campaign URL
- **Open in App**: Feature that shows an intermediary page before redirecting to app stores

## Requirements

### Requirement 1

**User Story:** As a marketer, I want to create a new campaign with basic information, so that I can start tracking user interactions.

#### Acceptance Criteria

1. WHEN the user opens the Create Campaign modal THEN the Modal_System SHALL display a form with Campaign Name as a required field with placeholder text "Insta profile link..."
2. WHEN the user enters a campaign name THEN the Modal_System SHALL validate that the field is not empty before allowing submission
3. WHEN the modal opens THEN the Modal_System SHALL display a header with title "Create Campaign" and a close button
4. WHEN the user clicks the close button THEN the Modal_System SHALL close the modal and reset the form state

### Requirement 2

**User Story:** As a marketer, I want to configure website redirection for desktop users, so that desktop visitors are directed to an appropriate destination.

#### Acceptance Criteria

1. WHEN the modal displays THEN the Modal_System SHALL show a "Website redirection for desktop users" input field as optional
2. WHEN the user enters a website URL THEN the Modal_System SHALL accept valid URL formats
3. WHEN the user leaves the website field empty THEN the Modal_System SHALL allow form submission without validation errors

### Requirement 3

**User Story:** As a marketer, I want to set a custom display ID for my campaign, so that I can have memorable and branded campaign URLs.

#### Acceptance Criteria

1. WHEN the modal displays THEN the Modal_System SHALL show a "Display ID" input field as optional with placeholder "Insta-profile-link"
2. WHEN the user enters a display ID THEN the Modal_System SHALL sanitize input to allow only alphanumeric characters, hyphens, underscores, and periods
3. WHEN a custom display ID is entered THEN the Modal_System SHALL display a preview of the resulting campaign URL

### Requirement 4

**User Story:** As a marketer, I want to enable deferred deep linking, so that users are directed to specific content after app installation.

#### Acceptance Criteria

1. WHEN the modal displays THEN the Modal_System SHALL show a toggle switch for "Enable Deferred deeplinking?" with description text
2. WHEN the user enables deferred deep linking THEN the Modal_System SHALL display a "Deeplink destination" required input field
3. WHEN deferred deep linking is disabled THEN the Modal_System SHALL hide the deeplink destination field
4. WHEN deferred deep linking is enabled THEN the Modal_System SHALL show the deeplink URL with the domain prefix highlighted

### Requirement 5

**User Story:** As a marketer, I want to access advanced campaign options, so that I can configure additional settings when needed.

#### Acceptance Criteria

1. WHEN the modal displays THEN the Modal_System SHALL show a collapsible "Advanced Options" section with a chevron icon
2. WHEN the Advanced Options section is collapsed THEN the Modal_System SHALL display only the section header with a right-pointing chevron
3. WHEN the user clicks the Advanced Options header THEN the Modal_System SHALL expand the section and show a down-pointing chevron
4. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display Ad Channel selector, Shorten link checkbox, Open in App checkbox, Domain selector, and Store listing selector
5. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL apply a secondary background color (#f9f9fb) to the section container

### Requirement 6

**User Story:** As a marketer, I want to select an ad channel for my campaign, so that I can track attribution from specific advertising platforms.

#### Acceptance Criteria

1. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display an "Ad Channel" dropdown with tooltip icon
2. WHEN the user clicks the Ad Channel dropdown THEN the Modal_System SHALL show available ad channel options (Meta, Google Ads, TikTok, etc.)
3. WHEN the user selects an ad channel THEN the Modal_System SHALL update the form state and show relevant integration fields

### Requirement 7

**User Story:** As a marketer, I want to configure link options, so that I can customize how the campaign link behaves.

#### Acceptance Criteria

1. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display a "Shorten link" checkbox
2. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display an "Open in App" checkbox
3. WHEN the user checks "Shorten link" THEN the Modal_System SHALL set the is_shortlink form value to true
4. WHEN the user checks "Open in App" THEN the Modal_System SHALL set the open_in_app form value to true

### Requirement 8

**User Story:** As a marketer, I want to select a domain for my campaign, so that I can use custom branded domains.

#### Acceptance Criteria

1. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display a "Domain" dropdown with tooltip icon
2. WHEN the user clicks the Domain dropdown THEN the Modal_System SHALL show available project domains
3. WHEN domains are loaded THEN the Modal_System SHALL select the primary domain by default
4. WHEN the Domain dropdown is displayed THEN the Modal_System SHALL show a "Manage Domains" helper text link

### Requirement 9

**User Story:** As a marketer, I want to select a custom store listing, so that I can redirect users to specific app store pages.

#### Acceptance Criteria

1. WHEN the Advanced Options section is expanded THEN the Modal_System SHALL display a "Redirect to Custom store listing" dropdown with tooltip icon
2. WHEN the user clicks the store listing dropdown THEN the Modal_System SHALL show available store listings with "None" as default
3. WHEN the Store listing dropdown is displayed THEN the Modal_System SHALL show a "Manage Domains" helper text link

### Requirement 10

**User Story:** As a marketer, I want clear action buttons in the modal footer, so that I can navigate and submit the form easily.

#### Acceptance Criteria

1. WHEN the modal displays THEN the Modal_System SHALL show a footer with "Back", "Skip", and "Next" buttons
2. WHEN the user clicks "Back" THEN the Modal_System SHALL navigate to the previous step or close the modal
3. WHEN the user clicks "Skip" THEN the Modal_System SHALL skip the current step without saving
4. WHEN the user clicks "Next" THEN the Modal_System SHALL validate the form and submit if valid
5. WHEN form submission is in progress THEN the Modal_System SHALL disable all footer buttons and show loading state on "Next"

### Requirement 11

**User Story:** As a marketer, I want the modal to maintain existing API functionality, so that campaigns are created correctly in the backend.

#### Acceptance Criteria

1. WHEN the user submits the form THEN the Modal_System SHALL call the existing campaign creation API with all form values
2. WHEN the API returns success THEN the Modal_System SHALL display the success screen with campaign details
3. WHEN the API returns an error THEN the Modal_System SHALL display appropriate error messages via toast notifications
4. WHEN the modal closes THEN the Modal_System SHALL reset all form state and clear any cached data
