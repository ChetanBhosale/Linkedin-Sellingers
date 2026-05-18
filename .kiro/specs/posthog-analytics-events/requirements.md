# Requirements Document

## Introduction

This document specifies the requirements for integrating PostHog analytics events throughout the Linkrunner dashboard. The integration will track user interactions across all major dashboard components including the top bar, sidebar, campaigns page, integrations page, and settings page. All events will include common properties such as project name, username, and user email for comprehensive analytics.

## Glossary

- **PostHog**: An open-source product analytics platform used for tracking user behavior and events
- **Event**: A user interaction or action that is captured and sent to PostHog for analytics
- **Event_Properties**: Additional data attached to each event providing context (e.g., project_name, user_email)
- **Analytics_Service**: A centralized service module that handles all PostHog event tracking with consistent properties
- **Session_Duration**: The time a user spends on a specific page or section of the dashboard
- **Campaign**: A marketing link created in Linkrunner for tracking user acquisition
- **Integration**: A third-party service connection (e.g., Google Ads, Meta Ads, analytics tools)

## Requirements

### Requirement 1: Analytics Service Foundation

**User Story:** As a developer, I want a centralized analytics service, so that all PostHog events are tracked consistently with common properties.

#### Acceptance Criteria

1. THE Analytics_Service SHALL include project_name, project_id, user_id, user_email, and username as default properties on all events
2. THE Analytics_Service SHALL provide a trackEvent function that accepts event_name and optional additional properties
3. THE Analytics_Service SHALL gracefully handle cases where user or project context is unavailable
4. THE Analytics_Service SHALL use the existing PostHog client initialized in _app.tsx

### Requirement 2: Top Bar Events

**User Story:** As a product manager, I want to track top bar interactions, so that I can understand how users navigate and use primary actions.

#### Acceptance Criteria

1. WHEN a user toggles light/dark mode, THE Analytics_Service SHALL capture a "theme_toggled" event with the new theme value
2. WHEN a user clicks the "Create Link" button in the top bar, THE Analytics_Service SHALL capture a "create_link_button_clicked" event with source "topbar"
3. WHEN a user clicks the logo to navigate to campaigns, THE Analytics_Service SHALL capture a "logo_clicked" event

### Requirement 3: Sidebar Navigation Events

**User Story:** As a product manager, I want to track sidebar navigation, so that I can understand user navigation patterns.

#### Acceptance Criteria

1. WHEN a user clicks "All Campaigns" in the sidebar, THE Analytics_Service SHALL capture a "sidebar_nav_clicked" event with tab_name "all_campaigns"
2. WHEN a user clicks "Integrations" in the sidebar, THE Analytics_Service SHALL capture a "sidebar_nav_clicked" event with tab_name "integrations"
3. WHEN a user clicks "Settings" in the sidebar, THE Analytics_Service SHALL capture a "sidebar_nav_clicked" event with tab_name "settings"
4. WHEN a user clicks "Usage & Billing" in the sidebar, THE Analytics_Service SHALL capture a "sidebar_nav_clicked" event with tab_name "usage_billing"
5. WHEN a user clicks the "Docs" button in the sidebar, THE Analytics_Service SHALL capture a "docs_button_clicked" event
6. WHEN a user collapses or expands the sidebar (via button or keyboard shortcut), THE Analytics_Service SHALL capture a "sidebar_toggled" event with new_state ("collapsed" or "expanded") and trigger_method ("button" or "keyboard")

### Requirement 4: Campaigns Page - Search and Filter Events

**User Story:** As a product manager, I want to track campaign search and filter usage, so that I can understand how users find campaigns.

#### Acceptance Criteria

1. WHEN a user searches for a campaign, THE Analytics_Service SHALL capture a "campaign_search" event with the search_query value (debounced)
2. WHEN a user selects a channel filter, THE Analytics_Service SHALL capture a "campaign_filter_channel" event with the selected channel_value
3. WHEN a user selects a status filter (active/inactive/all), THE Analytics_Service SHALL capture a "campaign_filter_status" event with the selected status_value
4. WHEN a user toggles the platform filter (All/iOS/Android), THE Analytics_Service SHALL capture a "campaign_filter_platform" event with the selected platform_value
5. WHEN a user selects a date range filter, THE Analytics_Service SHALL capture a "campaign_filter_date" event with date_preset (e.g., "today", "yesterday", "last_7_days", "custom") and from_date/to_date values
6. WHEN a user clicks the sort dropdown, THE Analytics_Service SHALL capture a "campaign_sort_clicked" event
7. WHEN a user selects a sort option, THE Analytics_Service SHALL capture a "campaign_sorted" event with sort_column and sort_direction ("asc" or "desc")
8. WHEN a user clicks the custom columns button, THE Analytics_Service SHALL capture a "columns_drawer_opened" event

### Requirement 5: Campaigns Page - Campaign Row Events

**User Story:** As a product manager, I want to track individual campaign interactions, so that I can understand how users manage campaigns.

#### Acceptance Criteria

1. WHEN a user toggles a campaign's active status, THE Analytics_Service SHALL capture a "campaign_active_toggled" event with campaign_name, campaign_id, and new_status (true/false)
2. WHEN a user clicks to expand a campaign row, THE Analytics_Service SHALL capture a "campaign_expanded" event with campaign_name and campaign_id
3. WHEN a user clicks to collapse a campaign row, THE Analytics_Service SHALL capture a "campaign_collapsed" event with campaign_name and campaign_id
4. WHEN a user clicks to expand an ad set row, THE Analytics_Service SHALL capture a "adset_expanded" event with campaign_name, campaign_id, and adset_name
5. WHEN a user clicks to collapse an ad set row, THE Analytics_Service SHALL capture a "adset_collapsed" event with campaign_name, campaign_id, and adset_name
6. WHEN a user clicks to edit an ad set deeplink, THE Analytics_Service SHALL capture a "adset_deeplink_edit_clicked" event with campaign_name and adset_name
7. WHEN a user clicks to edit an ad creative deeplink, THE Analytics_Service SHALL capture a "adcreative_deeplink_edit_clicked" event with campaign_name and creative_name
8. WHEN a user clicks on a campaign row to open details, THE Analytics_Service SHALL capture a "campaign_details_opened" event with campaign_name and campaign_id

### Requirement 6: Campaign Details Drawer Events

**User Story:** As a product manager, I want to track campaign detail interactions, so that I can understand how users analyze campaign performance.

#### Acceptance Criteria

1. WHEN a user changes the date filter in the campaign drawer, THE Analytics_Service SHALL capture a "campaign_drawer_date_changed" event with campaign_name, date_preset, from_date, and to_date
2. WHEN a user downloads a QR code, THE Analytics_Service SHALL capture a "qr_code_downloaded" event with campaign_name and campaign_id
3. WHEN a user clicks share campaign, THE Analytics_Service SHALL capture a "campaign_share_clicked" event with campaign_name and campaign_id
4. WHEN a user downloads campaign data, THE Analytics_Service SHALL capture a "campaign_data_downloaded" event with campaign_name, campaign_id, and export_type ("user" or "revenue")
5. WHEN a user clicks edit campaign, THE Analytics_Service SHALL capture a "campaign_edit_clicked" event with campaign_name and campaign_id

### Requirement 7: Campaigns Page - Pagination Events

**User Story:** As a product manager, I want to track pagination usage, so that I can understand how users browse campaign lists.

#### Acceptance Criteria

1. WHEN a user changes rows per page, THE Analytics_Service SHALL capture a "pagination_rows_changed" event with new_rows_count
2. WHEN a user clicks next/previous page buttons, THE Analytics_Service SHALL capture a "pagination_page_changed" event with direction ("next" or "previous") and new_page_number
3. WHEN a user navigates to first/last page, THE Analytics_Service SHALL capture a "pagination_page_changed" event with direction ("first" or "last") and new_page_number

### Requirement 8: Custom Columns Events

**User Story:** As a product manager, I want to track custom column configuration, so that I can understand which metrics users prioritize.

#### Acceptance Criteria

1. WHEN a user selects or deselects a custom event column, THE Analytics_Service SHALL capture a "custom_column_toggled" event with event_name and new_state (true/false)
2. WHEN a user clicks the "Custom Event" button to add a new custom event column, THE Analytics_Service SHALL capture a "custom_event_button_clicked" event
3. WHEN a user clicks the "Cost per Event" button, THE Analytics_Service SHALL capture a "cost_per_event_button_clicked" event
4. WHEN a user reorders columns, THE Analytics_Service SHALL capture a "columns_reordered" event

### Requirement 9: Integrations Page Events

**User Story:** As a product manager, I want to track integration page interactions, so that I can understand integration discovery and configuration patterns.

#### Acceptance Criteria

1. WHEN a user searches integrations, THE Analytics_Service SHALL capture an "integrations_search" event with search_query (debounced)
2. WHEN a user clicks on a category tab (Ad Networks/Analytics/Affiliate Partners), THE Analytics_Service SHALL capture an "integrations_category_clicked" event with category_name
3. WHEN a user clicks configure on an integration, THE Analytics_Service SHALL capture an "integration_configure_clicked" event with integration_name
4. WHEN a user clicks contact on an affiliate partner, THE Analytics_Service SHALL capture an "affiliate_contact_clicked" event with affiliate_name
5. WHEN a user clicks "Request Integration" button, THE Analytics_Service SHALL capture a "request_integration_clicked" event
6. WHEN a user clicks "Request Affiliate Partner" button, THE Analytics_Service SHALL capture a "request_affiliate_clicked" event

### Requirement 10: Google Ads Integration Events

**User Story:** As a product manager, I want to track Google Ads integration interactions, so that I can understand integration setup patterns.

#### Acceptance Criteria

1. WHEN a user clicks on a section tab (Account Integration/Event Mapping/SKAN Integration), THE Analytics_Service SHALL capture a "google_ads_section_clicked" event with section_name
2. WHEN a user clicks "Add Google Account" button, THE Analytics_Service SHALL capture a "google_ads_add_account_clicked" event
3. WHEN a user clicks "Add mapping" in event mapping section, THE Analytics_Service SHALL capture a "google_ads_add_mapping_clicked" event
4. WHEN a user clicks "View docs" button, THE Analytics_Service SHALL capture a "google_ads_docs_clicked" event

### Requirement 11: Meta Ads Integration Events

**User Story:** As a product manager, I want to track Meta Ads integration interactions, so that I can understand integration setup patterns.

#### Acceptance Criteria

1. WHEN a user clicks on a section tab (Meta App Integration/Ad Account Integration/Event Mapping/SKAN Integration), THE Analytics_Service SHALL capture a "meta_ads_section_clicked" event with section_name
2. WHEN a user clicks "Add Meta account" button, THE Analytics_Service SHALL capture a "meta_ads_add_account_clicked" event
3. WHEN a user clicks "Add mapping" in event mapping section, THE Analytics_Service SHALL capture a "meta_ads_add_mapping_clicked" event
4. WHEN a user clicks "View guide" button, THE Analytics_Service SHALL capture a "meta_ads_guide_clicked" event
5. WHEN a user clicks "View docs" button, THE Analytics_Service SHALL capture a "meta_ads_docs_clicked" event

### Requirement 12: TikTok Ads Integration Events

**User Story:** As a product manager, I want to track TikTok Ads integration interactions, so that I can understand integration setup patterns.

#### Acceptance Criteria

1. WHEN a user clicks "Add TikTok Account" button, THE Analytics_Service SHALL capture a "tiktok_ads_add_account_clicked" event
2. WHEN a user clicks "Add mapping" in event mapping section, THE Analytics_Service SHALL capture a "tiktok_ads_add_mapping_clicked" event
3. WHEN a user clicks "View docs" button, THE Analytics_Service SHALL capture a "tiktok_ads_docs_clicked" event

### Requirement 13: Analytics Tool Integration Events

**User Story:** As a product manager, I want to track analytics tool configuration, so that I can understand which analytics tools are being integrated.

#### Acceptance Criteria

1. WHEN a user saves an analytics tool configuration, THE Analytics_Service SHALL capture an "analytics_tool_saved" event with tool_name (e.g., "PostHog", "Amplitude", "Mixpanel")

### Requirement 14: Affiliate Partner Events

**User Story:** As a product manager, I want to track affiliate partner interactions, so that I can understand affiliate engagement.

#### Acceptance Criteria

1. WHEN a user clicks contact on an affiliate partner, THE Analytics_Service SHALL capture an "affiliate_contact_clicked" event with affiliate_name

### Requirement 15: Settings Page Events

**User Story:** As a product manager, I want to track settings page interactions, so that I can understand which settings users configure.

#### Acceptance Criteria

1. WHEN a user clicks on a settings section in the sidebar, THE Analytics_Service SHALL capture a "settings_section_clicked" event with section_name
2. WHEN a user searches in the Events section, THE Analytics_Service SHALL capture a "events_search" event with search_query (debounced)

### Requirement 16: SKAN Setup Events

**User Story:** As a product manager, I want to track SKAN setup interactions, so that I can understand SKAN configuration patterns.

#### Acceptance Criteria

1. WHEN a user toggles the SKAN enable switch, THE Analytics_Service SHALL capture a "skan_toggled" event with new_state (true/false)
2. WHEN a user clicks on a SKAN section tab (Events Setup/Conversion Value Mapping/Meta SKAN Config), THE Analytics_Service SHALL capture a "skan_section_clicked" event with section_name
3. WHEN a user clicks the "SKAdNetwork Integration" external link, THE Analytics_Service SHALL capture a "skan_docs_link_clicked" event with link_type "integration"
4. WHEN a user clicks the "Understanding conversion values" external link, THE Analytics_Service SHALL capture a "skan_docs_link_clicked" event with link_type "conversion_values"

### Requirement 17: Session Duration Tracking

**User Story:** As a product manager, I want to track how long users spend on different sections, so that I can understand engagement patterns.

#### Acceptance Criteria

1. WHEN a user navigates away from a dashboard section, THE Analytics_Service SHALL capture a "section_time_spent" event with section_name and duration_seconds
2. THE Analytics_Service SHALL track time spent on these sections: campaigns, integrations, settings, usage_billing
3. WHEN a user's session ends (page unload or navigation away from dashboard), THE Analytics_Service SHALL capture a "dashboard_session_ended" event with total_duration_seconds

### Requirement 18: Create Campaign Modal Events

**User Story:** As a product manager, I want to track campaign creation interactions, so that I can understand the campaign creation flow.

#### Acceptance Criteria

1. WHEN a user opens the create campaign modal, THE Analytics_Service SHALL capture a "create_campaign_modal_opened" event with source ("topbar" or "empty_state")
2. WHEN a user successfully creates a campaign, THE Analytics_Service SHALL capture a "campaign_created" event with campaign_name and ad_channel
