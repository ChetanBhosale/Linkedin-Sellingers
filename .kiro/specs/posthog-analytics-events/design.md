# Design Document: PostHog Analytics Events Integration

## Overview

This design document outlines the architecture and implementation approach for integrating comprehensive PostHog analytics events throughout the Linkrunner dashboard. The solution leverages the existing PostHog client already initialized in `_app.tsx` and the utility functions in `src/utils/posthog.ts`, extending them with a centralized analytics service that ensures consistent event tracking with common properties across all dashboard components.

## Architecture

The analytics integration follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                    React Components                              │
│  (Topbar, Sidebar, CampaignToolbar, CampaignRow, etc.)          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Analytics Service Hook                         │
│              (useAnalytics - src/hooks/use-analytics.ts)        │
│  - Provides trackEvent function with context                     │
│  - Automatically injects common properties                       │
│  - Handles session duration tracking                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PostHog Client                                 │
│              (posthog-js, initialized in _app.tsx)              │
└─────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Analytics Service Hook (`useAnalytics`)

A custom React hook that provides analytics tracking functionality with automatic context injection.

```typescript
// src/hooks/use-analytics.ts

interface AnalyticsContext {
  project_id?: number;
  project_name?: string;
  user_id?: number;
  user_email?: string;
  username?: string;
}

interface UseAnalyticsReturn {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackSectionEntry: (sectionName: string) => void;
  trackSectionExit: (sectionName: string) => void;
}

function useAnalytics(): UseAnalyticsReturn {
  // Gets context from RootContext
  // Returns trackEvent function that auto-injects common properties
}
```

### 2. Event Constants

Centralized event name constants to ensure consistency and prevent typos.

```typescript
// src/constants/analytics-events.ts

export const ANALYTICS_EVENTS = {
  // Top Bar
  THEME_TOGGLED: "theme_toggled",
  CREATE_LINK_BUTTON_CLICKED: "create_link_button_clicked",
  LOGO_CLICKED: "logo_clicked",
  
  // Sidebar
  SIDEBAR_NAV_CLICKED: "sidebar_nav_clicked",
  DOCS_BUTTON_CLICKED: "docs_button_clicked",
  SIDEBAR_TOGGLED: "sidebar_toggled",
  
  // Campaigns Page
  CAMPAIGN_SEARCH: "campaign_search",
  CAMPAIGN_FILTER_CHANNEL: "campaign_filter_channel",
  CAMPAIGN_FILTER_STATUS: "campaign_filter_status",
  CAMPAIGN_FILTER_PLATFORM: "campaign_filter_platform",
  CAMPAIGN_FILTER_DATE: "campaign_filter_date",
  CAMPAIGN_SORT_CLICKED: "campaign_sort_clicked",
  CAMPAIGN_SORTED: "campaign_sorted",
  COLUMNS_DRAWER_OPENED: "columns_drawer_opened",
  
  // Campaign Row
  CAMPAIGN_ACTIVE_TOGGLED: "campaign_active_toggled",
  CAMPAIGN_EXPANDED: "campaign_expanded",
  CAMPAIGN_COLLAPSED: "campaign_collapsed",
  ADSET_EXPANDED: "adset_expanded",
  ADSET_COLLAPSED: "adset_collapsed",
  ADSET_DEEPLINK_EDIT_CLICKED: "adset_deeplink_edit_clicked",
  ADCREATIVE_DEEPLINK_EDIT_CLICKED: "adcreative_deeplink_edit_clicked",
  CAMPAIGN_DETAILS_OPENED: "campaign_details_opened",
  
  // Campaign Drawer
  CAMPAIGN_DRAWER_DATE_CHANGED: "campaign_drawer_date_changed",
  QR_CODE_DOWNLOADED: "qr_code_downloaded",
  CAMPAIGN_SHARE_CLICKED: "campaign_share_clicked",
  CAMPAIGN_DATA_DOWNLOADED: "campaign_data_downloaded",
  CAMPAIGN_EDIT_CLICKED: "campaign_edit_clicked",
  
  // Pagination
  PAGINATION_ROWS_CHANGED: "pagination_rows_changed",
  PAGINATION_PAGE_CHANGED: "pagination_page_changed",
  
  // Custom Columns
  CUSTOM_COLUMN_TOGGLED: "custom_column_toggled",
  CUSTOM_EVENT_BUTTON_CLICKED: "custom_event_button_clicked",
  COST_PER_EVENT_BUTTON_CLICKED: "cost_per_event_button_clicked",
  COLUMNS_REORDERED: "columns_reordered",
  
  // Integrations
  INTEGRATIONS_SEARCH: "integrations_search",
  INTEGRATIONS_CATEGORY_CLICKED: "integrations_category_clicked",
  INTEGRATION_CONFIGURE_CLICKED: "integration_configure_clicked",
  AFFILIATE_CONTACT_CLICKED: "affiliate_contact_clicked",
  REQUEST_INTEGRATION_CLICKED: "request_integration_clicked",
  REQUEST_AFFILIATE_CLICKED: "request_affiliate_clicked",
  
  // Google Ads
  GOOGLE_ADS_SECTION_CLICKED: "google_ads_section_clicked",
  GOOGLE_ADS_ADD_ACCOUNT_CLICKED: "google_ads_add_account_clicked",
  GOOGLE_ADS_ADD_MAPPING_CLICKED: "google_ads_add_mapping_clicked",
  GOOGLE_ADS_DOCS_CLICKED: "google_ads_docs_clicked",
  
  // Meta Ads
  META_ADS_SECTION_CLICKED: "meta_ads_section_clicked",
  META_ADS_ADD_ACCOUNT_CLICKED: "meta_ads_add_account_clicked",
  META_ADS_ADD_MAPPING_CLICKED: "meta_ads_add_mapping_clicked",
  META_ADS_GUIDE_CLICKED: "meta_ads_guide_clicked",
  META_ADS_DOCS_CLICKED: "meta_ads_docs_clicked",
  
  // TikTok Ads
  TIKTOK_ADS_ADD_ACCOUNT_CLICKED: "tiktok_ads_add_account_clicked",
  TIKTOK_ADS_ADD_MAPPING_CLICKED: "tiktok_ads_add_mapping_clicked",
  TIKTOK_ADS_DOCS_CLICKED: "tiktok_ads_docs_clicked",
  
  // Analytics Tools
  ANALYTICS_TOOL_SAVED: "analytics_tool_saved",
  
  // Settings
  SETTINGS_SECTION_CLICKED: "settings_section_clicked",
  EVENTS_SEARCH: "events_search",
  
  // SKAN
  SKAN_TOGGLED: "skan_toggled",
  SKAN_SECTION_CLICKED: "skan_section_clicked",
  SKAN_DOCS_LINK_CLICKED: "skan_docs_link_clicked",
  
  // Session
  SECTION_TIME_SPENT: "section_time_spent",
  DASHBOARD_SESSION_ENDED: "dashboard_session_ended",
  
  // Create Campaign
  CREATE_CAMPAIGN_MODAL_OPENED: "create_campaign_modal_opened",
  CAMPAIGN_CREATED: "campaign_created",
} as const;
```

### 3. Session Duration Tracker Hook

A hook for tracking time spent on different dashboard sections.

```typescript
// src/hooks/use-session-tracker.ts

interface UseSessionTrackerReturn {
  startSectionTracking: (sectionName: string) => void;
  endSectionTracking: () => void;
}

function useSessionTracker(): UseSessionTrackerReturn {
  // Tracks entry/exit times for sections
  // Fires events on section change or page unload
}
```

## Data Models

### Common Event Properties

All events will include these base properties:

```typescript
interface BaseEventProperties {
  project_id?: number;
  project_name?: string;
  user_id?: number;
  user_email?: string;
  username?: string;  // Format: "FirstName LastName"
  timestamp: string;  // ISO 8601 format
}
```

### Event-Specific Properties

```typescript
// Theme toggle
interface ThemeToggledProperties extends BaseEventProperties {
  new_theme: "light" | "dark";
}

// Sidebar navigation
interface SidebarNavClickedProperties extends BaseEventProperties {
  tab_name: "all_campaigns" | "integrations" | "settings" | "usage_billing";
}

// Sidebar toggle
interface SidebarToggledProperties extends BaseEventProperties {
  new_state: "collapsed" | "expanded";
  trigger_method: "button" | "keyboard";
}

// Campaign search
interface CampaignSearchProperties extends BaseEventProperties {
  search_query: string;
}

// Campaign filter
interface CampaignFilterProperties extends BaseEventProperties {
  filter_type: "channel" | "status" | "platform" | "date";
  filter_value: string;
  date_preset?: string;
  from_date?: string;
  to_date?: string;
}

// Campaign sort
interface CampaignSortedProperties extends BaseEventProperties {
  sort_column: string;
  sort_direction: "asc" | "desc";
}

// Campaign row events
interface CampaignEventProperties extends BaseEventProperties {
  campaign_id: string;
  campaign_name: string;
}

// Campaign active toggle
interface CampaignActiveToggledProperties extends CampaignEventProperties {
  new_status: boolean;
}

// Ad set events
interface AdSetEventProperties extends CampaignEventProperties {
  adset_name: string;
}

// Pagination
interface PaginationProperties extends BaseEventProperties {
  direction?: "next" | "previous" | "first" | "last";
  new_page_number?: number;
  new_rows_count?: number;
}

// Integration events
interface IntegrationEventProperties extends BaseEventProperties {
  integration_name?: string;
  category_name?: string;
  section_name?: string;
}

// Session tracking
interface SectionTimeSpentProperties extends BaseEventProperties {
  section_name: string;
  duration_seconds: number;
}

interface DashboardSessionEndedProperties extends BaseEventProperties {
  total_duration_seconds: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Default Properties Inclusion

*For any* event tracked through the Analytics Service, when user and project context are available, the event SHALL include project_id, project_name, user_id, user_email, and username properties.

**Validates: Requirements 1.1**

### Property 2: Graceful Context Handling

*For any* event tracked through the Analytics Service, when user or project context is unavailable, the event SHALL still be captured without throwing an error, with missing context properties omitted.

**Validates: Requirements 1.3**

### Property 3: Campaign Event Properties

*For any* campaign-related event (toggle, expand, collapse, details opened), the event SHALL include both campaign_id and campaign_name properties in addition to base properties.

**Validates: Requirements 5.1, 5.2, 5.3, 5.8**

### Property 4: Section Duration Accuracy

*For any* section time tracking, the duration_seconds value SHALL be a non-negative number representing the actual time elapsed between section entry and exit.

**Validates: Requirements 17.1**

## Error Handling

### Missing Context

When user or project context is unavailable:
- The analytics service will still capture events
- Missing properties will be omitted (not set to null/undefined)
- A warning will be logged in development mode

### PostHog Client Unavailable

If the PostHog client is not initialized:
- Events will be silently dropped
- No errors will be thrown to prevent UI disruption
- A warning will be logged in development mode

### Debouncing Search Events

Search events (campaign search, integrations search, events search) will be debounced:
- 500ms debounce delay
- Only the final search query will be captured
- Empty queries will not trigger events

## Testing Strategy

### Unit Tests

Unit tests will verify:
- Analytics hook returns correct functions
- Event constants are properly defined
- Debounce logic works correctly
- Session tracker calculates duration correctly

### Property-Based Tests

Property-based tests will verify:
- All events include required base properties when context is available
- Campaign events always include campaign_id and campaign_name
- Duration calculations are always non-negative
- Events are captured without errors when context is missing

### Integration Tests

Integration tests will verify:
- Events are captured when UI interactions occur
- PostHog client receives correct event data
- Session tracking works across page navigations

### Test Configuration

- Testing framework: Jest with React Testing Library
- Property-based testing: fast-check
- Minimum 100 iterations per property test
- Mock PostHog client for unit tests
