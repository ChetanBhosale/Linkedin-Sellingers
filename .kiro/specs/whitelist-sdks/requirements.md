# Requirements Document

## Introduction

This feature implements a "Whitelist SDKs" settings page that allows users to configure whitelisted domains for their Web SDK integration. Only requests from these whitelisted domains will be accepted by the Linkrunner SDK. The page includes functionality to view existing whitelisted domains, create new whitelisted domains, copy Web SDK tokens, and manage domain whitelisting.

## Glossary

- **Web SDK**: Linkrunner's JavaScript SDK for web applications that enables tracking and attribution
- **Whitelisted Domain**: A domain that is authorized to make requests to the Linkrunner SDK
- **Web SDK Token**: A unique token used to authenticate and authorize Web SDK requests from whitelisted domains
- **Settings Page**: A page within the dashboard settings section for configuring project-specific options
- **System**: The Linkrunner dashboard application

## Requirements

### Requirement 1

**User Story:** As a developer, I want to navigate to the Whitelist SDKs settings page, so that I can manage my Web SDK domain whitelisting configuration.

#### Acceptance Criteria

1. WHEN a user navigates to `/dashboard/settings/whitelist-sdks` THEN the System SHALL display the Whitelist SDKs page with header, description, action buttons, and table
2. WHEN the Whitelist SDKs page loads THEN the System SHALL display the page title "Whitelist Subdomains for Web SDK"
3. WHEN the Whitelist SDKs page loads THEN the System SHALL display the description "Configure whitelisted domains for your Web SDK integration. Only requests from these domains will be accepted."
4. WHEN the sidebar is visible THEN the System SHALL show "Whitelist SDKs" as a navigation item under "Privacy & Security" section with a GlobeStand icon

### Requirement 2

**User Story:** As a developer, I want to view all my whitelisted domains in a table, so that I can see which domains are currently authorized.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL fetch and display whitelisted domains from the API using the `getWebSDKWhitelistedHosts` endpoint
2. WHEN whitelisted domains exist THEN the System SHALL display them in a table with columns: "Whitelisted Domain(s)" and "Created At"
3. WHEN displaying the Created At column THEN the System SHALL format the date as "DD MMM YYYY, HH:mm:ss hrs"
4. WHEN no whitelisted domains exist THEN the System SHALL display an empty state with a GlobeStand icon and message "Whitelisted domains are authorized by a Web SDK token. Create a web SDK token to start whitelisting domains." with a "Create Web SDK Token" button
5. WHILE data is loading THEN the System SHALL display skeleton loading states for the table rows

### Requirement 3

**User Story:** As a developer, I want to whitelist a new domain, so that I can authorize new domains for my Web SDK.

#### Acceptance Criteria

1. WHEN whitelisted domains exist THEN the System SHALL display a "Whitelist New Domain" button in the header
2. WHEN no whitelisted domains exist THEN the System SHALL display a "Create Web SDK Token" button in both the header and empty state
3. WHEN a user clicks "Whitelist New Domain" or "Create Web SDK Token" button THEN the System SHALL open a modal dialog
4. WHEN the modal opens THEN the System SHALL display a form with a domain input field and validation
5. WHEN a user enters a valid domain and submits THEN the System SHALL create the whitelisted domain via the `createWebSDKWhitelistedHost` API
6. WHEN domain creation succeeds THEN the System SHALL close the modal, refresh the domains list, and show a success toast
7. WHEN domain creation fails THEN the System SHALL display an error toast notification
8. WHEN a user enters an invalid domain format THEN the System SHALL display inline validation error and prevent submission

### Requirement 4

**User Story:** As a developer, I want to copy my Web SDK token, so that I can use it in my application configuration.

#### Acceptance Criteria

1. WHEN whitelisted domains exist THEN the System SHALL display a "Copy Web SDK Token" button with masked token preview (e.g., "**** Copy Web SDK Token ****")
2. WHEN a user clicks "Copy Web SDK Token" THEN the System SHALL copy the token value to clipboard
3. WHEN token is copied successfully THEN the System SHALL display a success toast notification with message "Copied to clipboard!"

### Requirement 5

**User Story:** As a developer, I want to delete a whitelisted domain, so that I can revoke access for domains I no longer want to authorize.

#### Acceptance Criteria

1. WHEN viewing a whitelisted domain row THEN the System SHALL display a delete action (trash icon)
2. WHEN a user clicks delete THEN the System SHALL remove the domain via the `removeWebSDKWhitelistedHost` API
3. WHEN deletion succeeds THEN the System SHALL refresh the domains list and show success toast with message "Removed {domain} from whitelist"
4. WHEN deletion fails THEN the System SHALL display an error toast notification
