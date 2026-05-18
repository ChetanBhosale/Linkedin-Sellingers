# Design Document: Whitelist SDKs Settings Page

## Overview

This feature implements a settings page for managing Web SDK domain whitelisting. The page allows users to view, create, and delete whitelisted domains that are authorized to make requests to the Linkrunner Web SDK. The implementation follows the existing settings page patterns in the codebase and reuses the existing API methods from `src/data/project.ts`.

## Architecture

The feature follows the existing settings architecture:
- Settings pages are rendered via dynamic routing at `/dashboard/settings/[section].tsx`
- Navigation is configured in `SettingsSecondarySidebar.tsx`
- Components are placed in `src/components/settings/`
- Modals follow the pattern in `src/components/modals/` (e.g., `create-campaign-modal.tsx`)
- API calls use existing endpoints in `src/data/project.ts`

```
┌─────────────────────────────────────────────────────────────┐
│                    Settings Layout                          │
├──────────────┬──────────────────────────────────────────────┤
│   Secondary  │                                              │
│   Sidebar    │         WhitelistSDKs Component              │
│              │  ┌────────────────────────────────────────┐  │
│  - SDK Sign  │  │  Header + Description + Actions        │  │
│  - Whitelist │  │  [Copy Token] [Whitelist New Domain]   │  │
│    SDKs ←    │  ├────────────────────────────────────────┤  │
│              │  │  Table / Empty State                   │  │
│              │  │  - Whitelisted Domain(s) | Created At  │  │
│              │  └────────────────────────────────────────┘  │
└──────────────┴──────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. WhitelistSDKs Component
**Location:** `src/components/settings/WhitelistSDKs.tsx`

```typescript
// No props needed - uses router query for project_id
export const WhitelistSDKs = () => { ... }
```

**Responsibilities:**
- Fetch and display whitelisted domains using React Query
- Handle loading, empty, and error states
- Manage modal open/close state for creating new domains
- Handle copy token functionality
- Handle delete domain functionality

**State:**
- `isModalOpen: boolean` - Controls the create domain modal visibility

### 2. CreateWebSDKTokenModal Component
**Location:** `src/components/modals/create-web-sdk-token-modal.tsx`

```typescript
interface CreateWebSDKTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
```

**Responsibilities:**
- Display form for entering domain to whitelist
- Validate domain format using existing validation logic from archive
- Submit to API and handle success/error
- Close modal on success and trigger refetch

### 3. Navigation Update
**Location:** `src/components/dashboard/SettingsSecondarySidebar.tsx`

Add new navigation item to SETTINGS_SECTIONS under "Privacy & Security":
```typescript
{
  title: "Whitelist SDKs",
  value: "whitelist-sdks",
  icon: GlobeStand,
  description: "Manage whitelisted domains for Web SDK",
}
```

### 4. Route Handler Update
**Location:** `src/pages/dashboard/settings/[section].tsx`

Add case for `whitelist-sdks` section to render WhitelistSDKs component.

## Data Models

### IWebSDKWhitelistedHost (existing in src/data/project.ts)
```typescript
type IWebSDKWhitelistedHost = {
  id: number;
  valid: boolean;
  name: string;
  value: string;
  created_at: string;
  update_at: string;
  type: "WEB_SDK_HOST_WHITELISTING";
};
```

### WebSDKWhitelistedHostsResponse (existing in src/data/project.ts)
```typescript
type WebSDKWhitelistedHostsResponse = {
  hosts: IWebSDKWhitelistedHost[];
  total: number;
};
```

## API Methods (existing in src/data/project.ts)

The following API methods already exist and will be reused:

1. `project.getWebSDKWhitelistedHosts({ project_id })` - Fetch all whitelisted hosts
2. `project.createWebSDKWhitelistedHost({ project_id, host })` - Create new whitelisted host
3. `project.removeWebSDKWhitelistedHost({ project_id, token_id })` - Remove whitelisted host
4. `project.get({ project_id })` - Get project data including tokens for Web SDK token


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Domain table renders all fetched domains
*For any* list of whitelisted domains returned from the API, the table should render exactly that many rows, each displaying the domain value and formatted created_at timestamp.
**Validates: Requirements 2.1, 2.2**

### Property 2: Date formatting consistency
*For any* valid ISO date string, the date formatter should produce output in the format "DD MMM YYYY, HH:mm:ss hrs".
**Validates: Requirements 2.3**

### Property 3: Domain validation rejects invalid formats
*For any* string that is not a valid domain format (e.g., missing TLD, invalid characters, empty string, whitespace-only strings), the form validation should reject it and prevent submission.
**Validates: Requirements 3.8**

### Property 4: Delete action visible for all domain rows
*For any* whitelisted domain displayed in the table, a delete action (trash icon) should be visible and accessible.
**Validates: Requirements 5.1**

## Error Handling

1. **API Fetch Errors:** Display error state with retry option using toast notification
2. **Create Domain Errors:** Show toast with error message from API, keep modal open
3. **Delete Domain Errors:** Show toast with error message, keep domain in list
4. **Validation Errors:** Display inline error message below input field
5. **Network Errors:** Show generic error toast with retry suggestion
6. **Copy to Clipboard Errors:** Show error toast "Failed to copy to clipboard"

## UI Components Used

The implementation will use existing UI components from `src/components/ui/`:
- `Dialog`, `DialogContent` - For modal
- `Button` - For actions
- `Input` - For domain input
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` - For form handling
- `Table` components - For domain list (or custom table matching Figma)
- `Skeleton` - For loading states
- Toast via `useToast` hook

## Testing Strategy

### Unit Tests
- Test WhitelistSDKs component renders correctly with mock data
- Test empty state renders when no domains
- Test loading state renders skeleton
- Test CreateWebSDKTokenModal form validation
- Test copy to clipboard functionality

### Property-Based Tests
- Use fast-check library for property-based testing
- Test domain validation with generated strings
- Test table rendering with generated domain lists

### Integration Tests
- Test full flow: open modal → enter domain → submit → see in table
- Test delete flow: click delete → domain removed from list
