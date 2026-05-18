# Design Document: Campaign Page

## Overview

The Campaign Page is a comprehensive dashboard view for managing and analyzing marketing campaigns. It provides a hierarchical table view with expandable rows (campaigns → ad sets → ad creatives), filtering, sorting, search, and pagination capabilities. The implementation uses mock data from `src/data/mock/demo-campaigns.ts` without API integration.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CampaignsPage                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    CampaignHeader                         │  │
│  │  [Title] [Toggle View] [Export] [New Campaign]            │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   CampaignToolbar                         │  │
│  │  [Search] [Channel Filter] [Status Toggle] [Columns]      │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   CampaignTable                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ TableHeader (sortable columns)                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ CampaignRow (expandable)                            │  │  │
│  │  │   └─ AdSetRow (expandable)                          │  │  │
│  │  │       └─ AdCreativeRow                              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   CampaignPagination                      │  │
│  │  [Showing X-Y of Z] [Prev] [Page Numbers] [Next]          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### CampaignsPage (Main Container)
- **Location**: `src/pages/dashboard/campaigns.tsx`
- **Responsibilities**: 
  - Orchestrates state management for filters, sorting, pagination
  - Renders child components
  - Handles modal state for create campaign

### CampaignHeader
- **Location**: `src/components/campaigns/CampaignHeader.tsx`
- **Props**:
  ```typescript
  interface CampaignHeaderProps {
    onExport: () => void;
    onNewCampaign: () => void;
  }
  ```
- **Elements**: Title "All Campaigns", view toggle (list/card/chart icons), Export button, New Campaign button

### CampaignToolbar
- **Location**: `src/components/campaigns/CampaignToolbar.tsx`
- **Props**:
  ```typescript
  interface CampaignToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    channelFilter: ChannelFilter;
    onChannelFilterChange: (channel: ChannelFilter) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange: (status: StatusFilter) => void;
    visibleColumns: ColumnVisibility;
    onColumnVisibilityChange: (columns: ColumnVisibility) => void;
  }
  ```

### CampaignTable
- **Location**: `src/components/campaigns/CampaignTable.tsx`
- **Props**:
  ```typescript
  interface CampaignTableProps {
    campaigns: ICampaignListItem[];
    sortConfig: SortConfig;
    onSort: (column: SortableColumn) => void;
    visibleColumns: ColumnVisibility;
    expandedCampaigns: Set<number>;
    expandedAdSets: Set<string>;
    onToggleCampaign: (id: number) => void;
    onToggleAdSet: (id: string) => void;
    onAction: (action: CampaignAction, campaign: ICampaignListItem) => void;
  }
  ```

### CampaignRow
- **Location**: `src/components/campaigns/CampaignRow.tsx`
- **Props**:
  ```typescript
  interface CampaignRowProps {
    campaign: ICampaignListItem;
    isExpanded: boolean;
    onToggle: () => void;
    visibleColumns: ColumnVisibility;
    onAction: (action: CampaignAction) => void;
  }
  ```

### AdSetRow
- **Location**: `src/components/campaigns/AdSetRow.tsx`
- **Props**:
  ```typescript
  interface AdSetRowProps {
    adSet: AdSet;
    isExpanded: boolean;
    onToggle: () => void;
    visibleColumns: ColumnVisibility;
    depth: number;
  }
  ```

### AdCreativeRow
- **Location**: `src/components/campaigns/AdCreativeRow.tsx`
- **Props**:
  ```typescript
  interface AdCreativeRowProps {
    adCreative: AdCreative;
    visibleColumns: ColumnVisibility;
    depth: number;
  }
  ```

### CampaignPagination
- **Location**: `src/components/campaigns/CampaignPagination.tsx`
- **Props**:
  ```typescript
  interface CampaignPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  }
  ```

## Data Models

### Type Definitions
```typescript
// Filter types
type ChannelFilter = 'all' | 'meta' | 'google' | 'tiktok' | 'organic';
type StatusFilter = 'all' | 'active' | 'inactive';

// Sort configuration
type SortableColumn = 'name' | 'clicks' | 'installs' | 'sign-ups' | 'conversion' | 'revenue' | 'created_at';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  column: SortableColumn;
  direction: SortDirection;
}

// Column visibility
interface ColumnVisibility {
  channel: boolean;
  name: boolean;
  content: boolean;
  tags: boolean;
  platform: boolean;
  clicks: boolean;
  installs: boolean;
  signUps: boolean;
  conversion: boolean;
  lastUpdated: boolean;
  actions: boolean;
}

// Campaign actions
type CampaignAction = 'view' | 'edit' | 'copy-link' | 'delete';

// Channel icon mapping
const CHANNEL_ICONS: Record<string, IconComponent> = {
  META: MetaLogo,
  GOOGLE: GoogleLogo,
  TIKTOK: TiktokLogo,
  LINKEDIN: LinkedinLogo,
  JIO: JioLogo,
  undefined: Users, // Organic/no network
};
```

### State Management
```typescript
// Main page state
interface CampaignPageState {
  // Filters
  searchQuery: string;
  channelFilter: ChannelFilter;
  statusFilter: StatusFilter;
  
  // Sorting
  sortConfig: SortConfig;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // Expansion state
  expandedCampaigns: Set<number>;
  expandedAdSets: Set<string>;
  
  // Column visibility
  visibleColumns: ColumnVisibility;
  
  // Modal state
  isCreateModalOpen: boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following properties have been identified for property-based testing:

### Property 1: Campaign row count matches data
*For any* list of campaigns, the number of rendered campaign rows SHALL equal the number of campaigns in the filtered data set.
**Validates: Requirements 1.2**

### Property 2: Channel icon mapping consistency
*For any* campaign with an ad_network_code, the displayed icon SHALL correspond to the correct channel mapping (META→MetaLogo, GOOGLE→GoogleLogo, TIKTOK→TiktokLogo, undefined→Users).
**Validates: Requirements 1.3**

### Property 3: Active status dot color
*For any* campaign where active equals true, the status dot SHALL have the green color class applied.
**Validates: Requirements 1.4, 1.5**

### Property 4: Expandable caret visibility
*For any* campaign with a non-empty adSets array, an expandable caret icon SHALL be visible in the first column.
**Validates: Requirements 2.1, 2.3**

### Property 5: Expand/collapse round-trip
*For any* expandable campaign row, clicking expand then collapse SHALL return the row to its original collapsed state with zero nested rows visible.
**Validates: Requirements 2.2, 2.4, 2.5**

### Property 6: Search filter correctness
*For any* search query and campaign list, all displayed campaigns SHALL have names containing the search query (case-insensitive).
**Validates: Requirements 3.2**

### Property 7: Search clear restores all
*For any* campaign list, entering a search query then clearing it SHALL result in all original campaigns being displayed.
**Validates: Requirements 3.4**

### Property 8: Channel filter correctness
*For any* channel filter selection (except "all"), all displayed campaigns SHALL have the matching ad_network_code.
**Validates: Requirements 4.2, 4.3**

### Property 9: Combined filter intersection
*For any* combination of search query and channel filter, displayed campaigns SHALL satisfy both filter conditions simultaneously.
**Validates: Requirements 4.4**

### Property 10: Status filter correctness
*For any* status filter selection, all displayed campaigns SHALL have the matching active boolean value.
**Validates: Requirements 5.2, 5.3, 5.4**

### Property 11: Sort order correctness
*For any* sortable column, after clicking the column header, the campaign list SHALL be ordered by that column's values in ascending order.
**Validates: Requirements 6.1, 6.2**

### Property 12: Actions menu presence
*For any* campaign row, a three-dot menu icon button SHALL be present in the actions column.
**Validates: Requirements 9.1**

### Property 13: Platform chip display
*For any* campaign with ios=true, an "iOS" chip SHALL be displayed; for any campaign with android=true, an "Android" chip SHALL be displayed.
**Validates: Requirements 10.1, 10.2, 10.3**

### Property 14: Network account display
*For any* campaign with a non-null network_account containing a name, the account name SHALL be displayed as text.
**Validates: Requirements 10.4**

### Property 15: Pagination range accuracy
*For any* paginated view, the displayed range text SHALL accurately reflect the current page's item indices and total count.
**Validates: Requirements 11.1, 11.2, 11.3**

### Property 16: Column visibility toggle
*For any* column, unchecking it in the column settings SHALL result in that column not being rendered in the table.
**Validates: Requirements 12.3, 12.4**

### Property 17: Content column Meta campaign display
*For any* Meta campaign with ad sets, the Content column SHALL display the count of ad sets and creatives in the format "X ad set(s) • Y creative(s)".
**Validates: Requirements 14.2**

### Property 18: Content column non-Meta campaign display
*For any* non-Meta campaign (Google, TikTok, etc.), the Content column SHALL display a link icon button.
**Validates: Requirements 14.3**

### Property 19: Content column link copy functionality
*For any* campaign with a valid link, clicking the link icon in the Content column SHALL copy the campaign link to the clipboard.
**Validates: Requirements 14.4, 14.5**

### Property 20: Campaign drawer opens on row click
*For any* campaign row, clicking on the row (excluding expand caret and actions menu) SHALL open the campaign details drawer.
**Validates: Requirements 15.1**

### Property 21: Drawer displays correct campaign data
*For any* opened campaign drawer, the displayed campaign name and channel icon SHALL match the selected campaign.
**Validates: Requirements 15.2**

### Property 22: Drawer metrics display
*For any* campaign with loaded details, the drawer SHALL display all six metrics (Clicks, Installs, Sign Ups, Spend, Revenue, Paying Customers).
**Validates: Requirements 15.4**

### Property 23: Drawer loading states
*For any* campaign drawer in loading state, skeleton loaders SHALL be displayed for metrics, chart, and table sections.
**Validates: Requirements 15.7**

### Property 24: Drawer close behavior
*For any* open campaign drawer, clicking outside or the close button SHALL close the drawer.
**Validates: Requirements 15.8**

## Campaign Details Drawer Components

### CampaignDetailsDrawer
- **Location**: `src/components/campaigns/CampaignDetailsDrawer.tsx`
- **Props**:
  ```typescript
  interface CampaignDetailsDrawerProps {
    campaign: ICampaignListItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  ```
- **Responsibilities**:
  - Display campaign header with channel icon, name, and action buttons
  - Show date range picker for filtering data
  - Display summary metrics row (Clicks, Installs, Sign Ups, Spend, Revenue, Paying Customers)
  - Render line chart with Clicks, Installs, Sign Ups data
  - Display user data table with pagination
  - Handle loading states with skeletons
  - Integrate with campaign details API

### CampaignDrawerHeader
- **Location**: `src/components/campaigns/CampaignDrawerHeader.tsx`
- **Props**:
  ```typescript
  interface CampaignDrawerHeaderProps {
    campaign: ICampaignListItem;
    onClose: () => void;
    onEdit: () => void;
    onShare: () => void;
    onDownloadQR: () => void;
  }
  ```

### CampaignDrawerMetrics
- **Location**: `src/components/campaigns/CampaignDrawerMetrics.tsx`
- **Props**:
  ```typescript
  interface CampaignDrawerMetricsProps {
    data: ICampaignDetails | null;
    isLoading: boolean;
  }
  ```

### CampaignDrawerChart
- **Location**: `src/components/campaigns/CampaignDrawerChart.tsx`
- **Props**:
  ```typescript
  interface CampaignDrawerChartProps {
    chartData: CombinedChartData;
    isLoading: boolean;
  }
  ```

### CampaignDrawerUserTable
- **Location**: `src/components/campaigns/CampaignDrawerUserTable.tsx`
- **Props**:
  ```typescript
  interface CampaignDrawerUserTableProps {
    users: Download[];
    isLoading: boolean;
  }
  ```

## Error Handling

- **Empty State**: When no campaigns match filters, display an empty state with illustration and message
- **Loading State**: Show skeleton loaders while data is being processed (for future API integration)
- **Invalid Data**: Gracefully handle missing or malformed campaign data by displaying fallback values ("-" for missing metrics)

## Testing Strategy

### Property-Based Testing Library
The implementation will use **fast-check** for property-based testing in TypeScript/React.

### Unit Tests
- Test individual filter functions (search, channel, status)
- Test sort comparison functions
- Test pagination calculation logic
- Test column visibility state management

### Property-Based Tests
Each correctness property above will be implemented as a property-based test using fast-check:
- Generate random campaign data with arbitrary values
- Generate random filter combinations
- Verify properties hold across 100+ iterations
- Each test will be tagged with the format: `**Feature: campaign-page, Property {number}: {property_text}**`

### Integration Tests
- Test filter combinations work together correctly
- Test expand/collapse state persistence
- Test pagination with filtering
