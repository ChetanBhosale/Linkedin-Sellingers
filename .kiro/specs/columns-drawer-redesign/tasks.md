# Implementation Plan

## Overview

This implementation plan refactors the ColumnsDrawer and CampaignTable to use the API as the single source of truth for column preferences, following the archive implementation pattern. The key change is removing prop-drilling and having each component fetch/mutate column preferences directly.

---

- [x] 1. Create shared column preferences utilities
  - [x] 1.1 Create a shared utility file for column transformation functions
    - Create `src/utils/column-preferences.ts`
    - Move `toSortableColumns` and `fromSortableColumns` functions from archive
    - Move `shouldRefetchCampaigns` function
    - Export types for sortable columns
    - _Requirements: 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

  - [ ]* 1.2 Write property test for shouldRefetchCampaigns
    - **Property 4: Should Refetch for New Event Columns**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 1.3 Write property test for non-event changes
    - **Property 5: Should Not Refetch for Non-Event Changes**
    - **Validates: Requirements 3.3, 3.4**

- [x] 2. Refactor CampaignTable to fetch column preferences from API
  - [x] 2.1 Add useQuery hook to CampaignTable for column preferences
    - Import useQuery from tanstack/react-query
    - Add query for campaignTableColumns with projectId
    - Use project context to get projectId
    - _Requirements: 1.1, 1.2_

  - [x] 2.2 Update CampaignTable to render headers from API data
    - Remove columnOrder prop dependency
    - Transform API response to column order using utility functions
    - Render headers based on fetched preferences
    - Handle loading and error states
    - _Requirements: 1.2, 1.3_

  - [x] 2.3 Remove column-related props from CampaignTable interface
    - Remove visibleColumns prop
    - Remove customEventColumns prop
    - Remove columnOrder prop
    - Update CampaignRow to work with new data flow
    - _Requirements: 5.2_

  - [ ]* 2.4 Write property test for column order persistence
    - **Property 1: Column Order Persistence**
    - **Validates: Requirements 1.1, 1.2, 1.3**

- [x] 3. Checkpoint - Ensure CampaignTable works with API data
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Refactor ColumnsDrawer to use API directly
  - [x] 4.1 Add useQuery hook to ColumnsDrawer for column preferences
    - Import useQuery from tanstack/react-query
    - Add query for campaignTableColumns with projectId
    - Initialize local state from query data when drawer opens
    - _Requirements: 4.1_

  - [x] 4.2 Add useMutation hook to ColumnsDrawer for saving preferences
    - Import useMutation from tanstack/react-query
    - Create mutation for project.updateCampaignTableColumns
    - On success invalidate campaignTableColumns query
    - On success conditionally refetch campaigns if new event columns added
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 4.3 Update handleOpenChange to use mutation instead of callback
    - Remove onSavePreferences prop usage
    - Call mutation directly when drawer closes with changes
    - Track hasLocalChanges locally in drawer
    - _Requirements: 2.1, 4.3, 4.4_

  - [x] 4.4 Remove column-related props from ColumnsDrawer interface
    - Remove visibleColumns prop
    - Remove onToggleColumn prop
    - Remove customEventColumns prop
    - Remove onCustomEventColumnsChange prop
    - Remove onReorderColumns prop
    - Remove onColumnOrderChange prop
    - Remove onSavePreferences prop
    - _Requirements: 5.3_

  - [ ]* 4.5 Write property test for mutation triggers refetch
    - **Property 2: Mutation Triggers Refetch**
    - **Validates: Requirements 2.2, 2.3**

  - [ ]* 4.6 Write property test for no API call without changes
    - **Property 6: No API Call Without Changes**
    - **Validates: Requirements 4.3**

- [x] 5. Checkpoint - Ensure ColumnsDrawer works with API
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Simplify CampaignToolbar
  - [x] 6.1 Remove column-related props from CampaignToolbar
    - Remove visibleColumns prop
    - Remove onToggleColumn prop
    - Remove customEventColumns prop
    - Remove onCustomEventColumnsChange prop
    - Remove onReorderColumns prop
    - Remove onColumnOrderChange prop
    - Remove onSavePreferences prop
    - Update ColumnsDrawer usage to only pass open and onOpenChange
    - _Requirements: 5.4_

  - [x] 6.2 Update CampaignToolbar interface
    - Remove all column-related props from interface
    - Keep only filter and sort related props
    - _Requirements: 5.4_

- [x] 7. Simplify use-campaigns-api.ts hook
  - [x] 7.1 Remove column state from use-campaigns-api.ts
    - Remove visibleColumns state and toggleColumnVisibility
    - Remove customEventColumns state and setCustomEventColumns
    - Remove columnOrder state and setColumnOrder
    - Remove hasLocalChanges state
    - Remove saveColumnPreferences function
    - Remove saveColumnPreferencesMutation
    - Remove apiToLocalColumnState and localToApiColumnState
    - Remove shouldRefetchCampaigns
    - _Requirements: 5.1_

  - [x] 7.2 Update hook return value
    - Remove all column-related exports
    - Keep campaign data, filters, pagination, expansion state
    - _Requirements: 5.1_

- [x] 8. Update campaigns.tsx page
  - [x] 8.1 Remove column props from CampaignToolbar usage
    - Remove visibleColumns prop
    - Remove toggleColumnVisibility prop
    - Remove customEventColumns prop
    - Remove setCustomEventColumns prop
    - Remove reorderCustomEventColumns prop
    - Remove columnOrder prop
    - Remove setColumnOrder prop
    - Remove saveColumnPreferences prop
    - _Requirements: 5.1_

  - [x] 8.2 Remove column props from CampaignTable usage
    - Remove visibleColumns prop
    - Remove customEventColumns prop
    - Remove columnOrder prop
    - _Requirements: 5.2_

- [x] 9. Checkpoint - Ensure full integration works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Clean up and verify
  - [x] 10.1 Remove unused imports and types
    - Clean up unused imports in all modified files
    - Remove unused type definitions
    - Removed unused `KEY_TO_COLUMN_NAME` from column-preferences.ts
    - Removed debug `console.log({columnOrder})` from CampaignRow.tsx
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 10.2 Manual integration testing
    - Open ColumnsDrawer, add a custom event column, close drawer, verify table updates
    - Refresh page, verify column order persists
    - Switch projects, verify new project preferences load
    - Add new event column, verify campaigns refetch
    - Toggle standard columns only, verify no unnecessary refetch
    - Added fixed "Campaign", "Content", "Platform" columns at top (not draggable, always visible)
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.3_

- [x] 11. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
