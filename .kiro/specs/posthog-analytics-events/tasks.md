# Implementation Plan: PostHog Analytics Events Integration

## Overview

This implementation plan breaks down the PostHog analytics events integration into discrete, incremental tasks. Each task builds on previous work and includes testing requirements. The implementation follows a bottom-up approach: first creating the foundation (analytics service), then integrating events into components.

## Tasks

- [x] 1. Create Analytics Foundation
  - [x] 1.1 Create analytics event constants file
    - Create `src/constants/analytics-events.ts` with all event name constants
    - Export `ANALYTICS_EVENTS` object with categorized event names
    - _Requirements: 2.1, 2.2, 2.3, 3.1-3.6, 4.1-4.8, 5.1-5.8, 6.1-6.5, 7.1-7.3, 8.1-8.4, 9.1-9.6, 10.1-10.4, 11.1-11.5, 12.1-12.3, 13.1, 15.1-15.2, 16.1-16.4, 17.1-17.3, 18.1-18.2_

  - [x] 1.2 Create useAnalytics hook
    - Create `src/hooks/use-analytics.ts`
    - Implement `trackEvent` function that injects common properties (project_id, project_name, user_id, user_email, username)
    - Get context from `useRootContext`
    - Use existing PostHog client from `posthog-js`
    - Handle missing context gracefully
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.3 Write property test for default properties inclusion
    - **Property 1: Default Properties Inclusion**
    - **Validates: Requirements 1.1**

  - [x] 1.4 Write property test for graceful context handling
    - **Property 2: Graceful Context Handling**
    - **Validates: Requirements 1.3**

- [x] 2. Create Session Duration Tracker
  - [x] 2.1 Create useSessionTracker hook
    - Create `src/hooks/use-session-tracker.ts`
    - Implement `startSectionTracking` and `endSectionTracking` functions
    - Track entry timestamps per section
    - Calculate duration on section exit
    - Handle page unload events for session end tracking
    - _Requirements: 17.1, 17.2, 17.3_

  - [x] 2.2 Write property test for section duration accuracy
    - **Property 4: Section Duration Accuracy**
    - **Validates: Requirements 17.1**

- [x] 3. Checkpoint - Ensure foundation tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Integrate Top Bar Events
  - [x] 4.1 Add theme toggle event to AnimatedThemeToggler
    - Import `useAnalytics` hook
    - Track `theme_toggled` event with `new_theme` property on toggle
    - _Requirements: 2.1_

  - [x] 4.2 Add Create Link button event to Topbar
    - Track `create_link_button_clicked` event with `source: "topbar"`
    - _Requirements: 2.2_

  - [x] 4.3 Add logo click event to Topbar
    - Track `logo_clicked` event when logo is clicked
    - _Requirements: 2.3_

- [x] 5. Integrate Sidebar Events
  - [x] 5.1 Add navigation click events to SidebarNav
    - Track `sidebar_nav_clicked` event with `tab_name` for each nav item
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 5.2 Add docs button event to SidebarFooter
    - Track `docs_button_clicked` event
    - _Requirements: 3.5_

  - [x] 5.3 Add sidebar toggle events to Sidebar
    - Track `sidebar_toggled` event with `new_state` and `trigger_method`
    - Handle both button click and keyboard shortcut triggers
    - _Requirements: 3.6_

- [x] 6. Integrate Campaign Toolbar Events
  - [x] 6.1 Add search event with debouncing
    - Track `campaign_search` event with `search_query`
    - Implement 500ms debounce
    - _Requirements: 4.1_

  - [x] 6.2 Add filter events
    - Track `campaign_filter_channel` event on channel filter change
    - Track `campaign_filter_status` event on status filter change
    - Track `campaign_filter_platform` event on platform toggle
    - Track `campaign_filter_date` event on date range change with `date_preset`, `from_date`, `to_date`
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

  - [x] 6.3 Add sort events
    - Track `campaign_sort_clicked` event when sort dropdown opens
    - Track `campaign_sorted` event with `sort_column` and `sort_direction`
    - _Requirements: 4.6, 4.7_

  - [x] 6.4 Add columns drawer event
    - Track `columns_drawer_opened` event when columns button clicked
    - _Requirements: 4.8_

- [x] 7. Checkpoint - Ensure toolbar events work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Integrate Campaign Row Events
  - [x] 8.1 Add campaign active toggle event
    - Track `campaign_active_toggled` event with `campaign_name`, `campaign_id`, `new_status`
    - _Requirements: 5.1_

  - [x] 8.2 Write property test for campaign event properties
    - **Property 3: Campaign Event Properties**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.8**

  - [x] 8.3 Add campaign expand/collapse events
    - Track `campaign_expanded` event with `campaign_name`, `campaign_id`
    - Track `campaign_collapsed` event with `campaign_name`, `campaign_id`
    - _Requirements: 5.2, 5.3_

  - [x] 8.4 Add ad set expand/collapse events
    - Track `adset_expanded` event with `campaign_name`, `campaign_id`, `adset_name`
    - Track `adset_collapsed` event with `campaign_name`, `campaign_id`, `adset_name`
    - _Requirements: 5.4, 5.5_

  - [x] 8.5 Add deeplink edit events
    - Track `adset_deeplink_edit_clicked` event with `campaign_name`, `adset_name`
    - Track `adcreative_deeplink_edit_clicked` event with `campaign_name`, `creative_name`
    - _Requirements: 5.6, 5.7_

  - [x] 8.6 Add campaign details opened event
    - Track `campaign_details_opened` event with `campaign_name`, `campaign_id`
    - _Requirements: 5.8_

- [x] 9. Integrate Campaign Details Drawer Events
  - [x] 9.1 Add drawer date filter event
    - Track `campaign_drawer_date_changed` event with `campaign_name`, `date_preset`, `from_date`, `to_date`
    - _Requirements: 6.1_

  - [ ] 9.2 Add QR code download event
    - Track `qr_code_downloaded` event with `campaign_name`, `campaign_id`
    - _Requirements: 6.2_

  - [x] 9.3 Add share and export events
    - Track `campaign_share_clicked` event with `campaign_name`, `campaign_id`
    - Track `campaign_data_downloaded` event with `campaign_name`, `campaign_id`, `export_type`
    - _Requirements: 6.3, 6.4_

  - [x] 9.4 Add edit campaign event
    - Track `campaign_edit_clicked` event with `campaign_name`, `campaign_id`
    - _Requirements: 6.5_

- [x] 10. Integrate Pagination Events
  - [x] 10.1 Add pagination events to CampaignPagination
    - Track `pagination_rows_changed` event with `new_rows_count`
    - Track `pagination_page_changed` event with `direction`, `new_page_number`
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 11. Integrate Custom Columns Events
  - [x] 11.1 Add column toggle and button events to ColumnsDrawer
    - Track `custom_column_toggled` event with `event_name`, `new_state`
    - Track `custom_event_button_clicked` event
    - Track `cost_per_event_button_clicked` event
    - Track `columns_reordered` event
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 12. Checkpoint - Ensure campaign page events work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Integrate Integrations Page Events
  - [x] 13.1 Add search and category events
    - Track `integrations_search` event with `search_query` (debounced)
    - Track `integrations_category_clicked` event with `category_name`
    - _Requirements: 9.1, 9.2_

  - [x] 13.2 Add configure and request events
    - Track `integration_configure_clicked` event with `integration_name`
    - Track `affiliate_contact_clicked` event with `affiliate_name`
    - Track `request_integration_clicked` event
    - Track `request_affiliate_clicked` event
    - _Requirements: 9.3, 9.4, 9.5, 9.6_

- [x] 14. Integrate Ad Network Integration Events
  - [x] 14.1 Add Google Ads integration events
    - Track `google_ads_section_clicked` event with `section_name`
    - Track `google_ads_add_account_clicked` event
    - Track `google_ads_add_mapping_clicked` event
    - Track `google_ads_docs_clicked` event
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 14.2 Add Meta Ads integration events
    - Track `meta_ads_section_clicked` event with `section_name`
    - Track `meta_ads_add_account_clicked` event
    - Track `meta_ads_add_mapping_clicked` event
    - Track `meta_ads_guide_clicked` event
    - Track `meta_ads_docs_clicked` event
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x] 14.3 Add TikTok Ads integration events
    - Track `tiktok_ads_add_account_clicked` event
    - Track `tiktok_ads_add_mapping_clicked` event
    - Track `tiktok_ads_docs_clicked` event
    - _Requirements: 12.1, 12.2, 12.3_

- [x] 15. Integrate Analytics Tool Events
  - [x] 15.1 Add save events to analytics tool configs
    - Track `analytics_tool_saved` event with `tool_name` in PostHogConfig, AmplitudeConfig, MixpanelConfig, etc.
    - _Requirements: 13.1_

- [x] 16. Integrate Settings Page Events
  - [x] 16.1 Add settings section click events
    - Track `settings_section_clicked` event with `section_name` in SettingsSecondarySidebar
    - _Requirements: 15.1_

  - [x] 16.2 Add events search event
    - Track `events_search` event with `search_query` (debounced) in Events component
    - _Requirements: 15.2_

- [x] 17. Integrate SKAN Setup Events
  - [x] 17.1 Add SKAN toggle and section events
    - Track `skan_toggled` event with `new_state`
    - Track `skan_section_clicked` event with `section_name`
    - _Requirements: 16.1, 16.2_

  - [x] 17.2 Add SKAN docs link events
    - Track `skan_docs_link_clicked` event with `link_type` for external links
    - _Requirements: 16.3, 16.4_

- [x] 18. Integrate Session Duration Tracking
  - [x] 18.1 Add session tracking to DashboardLayout
    - Use `useSessionTracker` hook in DashboardLayout
    - Track section changes based on pathname
    - Handle page unload for session end event
    - _Requirements: 17.1, 17.2, 17.3_

- [x] 19. Integrate Create Campaign Events
  - [x] 19.1 Add create campaign modal events
    - Track `create_campaign_modal_opened` event with `source`
    - Track `campaign_created` event with `campaign_name`, `ad_channel` on successful creation
    - _Requirements: 18.1, 18.2_

- [x] 20. Final Checkpoint - Ensure all events work
  - Ensure all tests pass, ask the user if questions arise.
  - Verify events appear in PostHog dashboard
  - Confirm common properties are included in all events

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation uses the existing PostHog client initialized in `_app.tsx`
- All events will automatically include common properties through the `useAnalytics` hook

