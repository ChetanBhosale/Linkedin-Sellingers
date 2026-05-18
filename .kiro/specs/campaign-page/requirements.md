# Requirements Document

## Introduction

This document defines the requirements for the "All Campaigns" page in the LinkRunner dashboard. The page displays a comprehensive list of marketing campaigns with filtering, sorting, search capabilities, and hierarchical data visualization (campaigns → ad sets → ad creatives). The implementation uses mock data without API integration, following the existing Prism design system.

## Glossary

- **Campaign**: A marketing campaign entity containing metrics like clicks, installs, sign-ups, revenue, and conversion rates
- **Ad Set**: A grouping of ad creatives within a campaign (for Meta, Google, TikTok campaigns)
- **Ad Creative**: Individual advertisement content within an ad set
- **Channel**: The advertising platform (Meta, Google, TikTok, LinkedIn, Organic, etc.)
- **Status Dot**: A visual indicator showing campaign active/inactive state
- **Hierarchical Table**: A table structure supporting expandable rows for campaigns → ad sets → ad creatives
- **Toggle Group**: A segmented control for switching between view modes (list/card/chart)
- **Search Control**: An input field for filtering campaigns by name
- **Channel Switcher**: A dropdown for filtering campaigns by advertising channel

## Requirements

### Requirement 1

**User Story:** As a marketer, I want to view all my campaigns in a table format, so that I can quickly assess campaign performance at a glance.

#### Acceptance Criteria

1. WHEN the campaigns page loads THEN the System SHALL display a table with columns: Channel, Campaign Name, Content, Platform, Clicks, Installs, Sign-ups, Conversion, Last Updated, and Actions
2. WHEN campaigns exist in the data THEN the System SHALL render each campaign as a row with appropriate data in each column
3. WHEN a campaign has an ad network code THEN the System SHALL display the corresponding channel icon (Meta, Google, TikTok, LinkedIn, Jio, or Users icon for organic)
4. WHEN a campaign is active THEN the System SHALL display a green status dot next to the campaign name
5. WHEN a campaign is inactive THEN the System SHALL display a gray status dot next to the campaign name

### Requirement 2

**User Story:** As a marketer, I want to expand campaigns to see ad sets and ad creatives, so that I can analyze performance at different levels of the campaign hierarchy.

#### Acceptance Criteria

1. WHEN a campaign has ad sets THEN the System SHALL display an expandable caret icon in the first column
2. WHEN a user clicks the expand caret on a campaign row THEN the System SHALL reveal nested ad set rows with indentation
3. WHEN an ad set has ad creatives THEN the System SHALL display an expandable caret icon for the ad set row
4. WHEN a user clicks the expand caret on an ad set row THEN the System SHALL reveal nested ad creative rows with additional indentation
5. WHEN a user clicks an expanded caret THEN the System SHALL collapse the nested rows and rotate the caret icon back

### Requirement 3

**User Story:** As a marketer, I want to search for campaigns by name, so that I can quickly find specific campaigns.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display a search input control in the toolbar
2. WHEN a user types in the search input THEN the System SHALL filter campaigns to show only those whose names contain the search term (case-insensitive)
3. WHEN the search term matches zero campaigns THEN the System SHALL display an empty state message
4. WHEN a user clears the search input THEN the System SHALL display all campaigns

### Requirement 4

**User Story:** As a marketer, I want to filter campaigns by channel, so that I can focus on specific advertising platforms.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display a channel filter dropdown with options: All, Meta, Google, TikTok, and Organic
2. WHEN a user selects a channel filter THEN the System SHALL display only campaigns matching that channel
3. WHEN "All" is selected THEN the System SHALL display campaigns from all channels
4. WHEN a channel filter is combined with search THEN the System SHALL apply both filters simultaneously

### Requirement 5

**User Story:** As a marketer, I want to filter campaigns by status, so that I can view only active or inactive campaigns.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display a status toggle with options: All, Active, Inactive
2. WHEN a user selects "Active" THEN the System SHALL display only campaigns where active equals true
3. WHEN a user selects "Inactive" THEN the System SHALL display only campaigns where active equals false
4. WHEN "All" is selected THEN the System SHALL display campaigns regardless of status

### Requirement 6

**User Story:** As a marketer, I want to sort campaigns by different metrics, so that I can identify top or bottom performers.

#### Acceptance Criteria

1. WHEN a user clicks a sortable column header icon button THEN the System SHALL sort the table by that column in descending order
2. WHEN a user clicks the same column header icon button again THEN the System SHALL reverse the sort order to ascending
3. WHEN sorting is applied THEN the System SHALL display a sort indicator icon (CaretUp for ascending, CaretDown for descending) on the active column header
4. WHEN the page loads THEN the System SHALL sort campaigns by created_at date in descending order (newest first)
5. WHEN a sortable column is not currently sorted THEN the System SHALL display a neutral sort icon (CaretUpDown) as an icon button next to the column label
6. WHEN sorting is changed THEN the System SHALL persist the sort preference to the dashboard preferences API
7. WHEN sorting is changed THEN the System SHALL update the URL query parameters with sort_field and sort_order

### Requirement 7

**User Story:** As a marketer, I want to create a new campaign, so that I can start tracking a new marketing initiative.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display a "New Campaign" button in the header area
2. WHEN a user clicks the "New Campaign" button THEN the System SHALL open the create campaign modal
3. WHEN the create campaign modal is open THEN the System SHALL allow the user to close it without creating a campaign

### Requirement 8

**User Story:** As a marketer, I want to export campaign data, so that I can analyze it in external tools.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display an "Export" button in the header area
2. WHEN a user clicks the "Export" button THEN the System SHALL trigger a CSV export action (mock implementation)

### Requirement 9

**User Story:** As a marketer, I want to access campaign actions, so that I can manage individual campaigns.

#### Acceptance Criteria

1. WHEN viewing a campaign row THEN the System SHALL display a three-dot menu icon button in the actions column
2. WHEN a user clicks the actions menu THEN the System SHALL display a dropdown with options: View Details, Edit, Copy Link, Delete
3. WHEN a user selects an action THEN the System SHALL close the dropdown menu

### Requirement 10

**User Story:** As a marketer, I want to see campaign tags, so that I can quickly identify campaign characteristics.

#### Acceptance Criteria

1. WHEN a campaign has iOS support THEN the System SHALL display an "iOS" chip in the tags column
2. WHEN a campaign has Android support THEN the System SHALL display an "Android" chip in the tags column
3. WHEN a campaign has both iOS and Android support THEN the System SHALL display both chips
4. WHEN a campaign has a network account with a name THEN the System SHALL display the account name as text with a copy icon button

### Requirement 14

**User Story:** As a marketer, I want to access shareable campaign content, so that I can quickly copy and share campaign links.

#### Acceptance Criteria

1. WHEN viewing a campaign row THEN the System SHALL display a Content column positioned to the left of the Platform column
2. WHEN the Content column is displayed for a Meta campaign with ad sets THEN the System SHALL show the count of ad sets and creatives (e.g., "1 ad set • 9 creatives")
3. WHEN the Content column is displayed for a non-Meta campaign (Google, TikTok, etc.) THEN the System SHALL show a link icon button for accessing the shareable campaign link
4. WHEN a user clicks the link icon in the Content column THEN the System SHALL copy the campaign link to the clipboard
5. WHEN a campaign link is copied THEN the System SHALL display a success toast notification

### Requirement 15

**User Story:** As a marketer, I want to view detailed campaign analytics in a drawer, so that I can analyze campaign performance without leaving the campaigns list.

#### Acceptance Criteria

1. WHEN a user clicks on a campaign row (not expand caret or actions menu) THEN the System SHALL open a drawer from the right side displaying campaign details
2. WHEN the campaign drawer opens THEN the System SHALL display a header with channel icon, campaign name, and action buttons (QR code, share, download, edit)
3. WHEN the campaign drawer opens THEN the System SHALL display a date range picker showing the selected date filter
4. WHEN the campaign drawer opens THEN the System SHALL display summary metrics (Clicks, Installs, Sign Ups, Spend, Revenue, Paying Customers) in a horizontal row
5. WHEN the campaign drawer opens THEN the System SHALL display a line chart showing Clicks, Installs, and Sign Ups over time with a legend
6. WHEN the campaign drawer opens THEN the System SHALL display a user data table with columns: User ID, Name, Email, Phone, Created At
7. WHEN the campaign drawer is loading data THEN the System SHALL display skeleton loaders for metrics, chart, and table
8. WHEN a user clicks outside the drawer or the close button THEN the System SHALL close the drawer
9. WHEN the drawer displays user data THEN the System SHALL allow copying User ID to clipboard with a copy icon button

### Requirement 11

**User Story:** As a marketer, I want to see pagination controls, so that I can navigate through large campaign lists.

#### Acceptance Criteria

1. WHEN more than 10 campaigns exist THEN the System SHALL display pagination controls at the bottom of the table
2. WHEN viewing pagination THEN the System SHALL display the current page range and total count (e.g., "1 - 10 of 50 results")
3. WHEN a user clicks the next page button THEN the System SHALL display the next set of campaigns
4. WHEN on the first page THEN the System SHALL disable the previous page button
5. WHEN on the last page THEN the System SHALL disable the next page button

### Requirement 12

**User Story:** As a marketer, I want to customize visible columns, so that I can focus on the metrics most relevant to me.

#### Acceptance Criteria

1. WHEN the page loads THEN the System SHALL display a column settings icon button in the toolbar
2. WHEN a user clicks the column settings button THEN the System SHALL display a dropdown with checkboxes for each column
3. WHEN a user unchecks a column THEN the System SHALL hide that column from the table
4. WHEN a user checks a column THEN the System SHALL show that column in the table

### Requirement 13

**User Story:** As a marketer, I want the page to follow the design system, so that the UI is consistent with the rest of the application.

#### Acceptance Criteria

1. WHEN rendering the page THEN the System SHALL use the Prism design system color tokens from globals.css
2. WHEN rendering buttons THEN the System SHALL use the Button component with appropriate variants (primary, secondary, outlined)
3. WHEN rendering chips THEN the System SHALL use the Chip component with the "filled" variant and "sm" size
4. WHEN rendering icons THEN the System SHALL use Phosphor icons from @phosphor-icons/react
5. WHEN rendering the table THEN the System SHALL use the Table components (Table, TableHeader, TableBody, TableRow, TableHead, TableCell)
