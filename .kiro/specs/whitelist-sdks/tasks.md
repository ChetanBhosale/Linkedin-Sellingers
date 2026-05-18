# Implementation Plan

- [x] 1. Add navigation item to settings sidebar
  - [x] 1.1 Update SettingsSecondarySidebar.tsx to add "Whitelist SDKs" item
    - Import `GlobeStand` icon from `@phosphor-icons/react`
    - Add new item under "Privacy & Security" section with value "whitelist-sdks"
    - _Requirements: 1.4_

- [-] 2. Create WhitelistSDKs settings component
  - [x] 2.1 Create WhitelistSDKs.tsx component with page structure
    - Create `src/components/settings/WhitelistSDKs.tsx`
    - Implement header with title "Whitelist Subdomains for Web SDK" and description
    - Add action buttons container (Copy Token, Whitelist New Domain)
    - Set up React Query hook to fetch whitelisted domains using `project.getWebSDKWhitelistedHosts`
    - Set up React Query hook to fetch project data for Web SDK token using `project.get`
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

  - [x] 2.2 Implement domains table with data display
    - Create table with columns "Whitelisted Domain(s)" and "Created At"
    - Map API response to table rows displaying domain value and formatted date
    - Implement date formatting as "DD MMM YYYY, HH:mm:ss hrs"
    - Add delete action (trash icon) to each row
    - _Requirements: 2.2, 2.3, 5.1_

  - [x] 2.3 Implement empty state UI
    - Display GlobeStand icon centered in table area
    - Show message "Whitelisted domains are authorized by a Web SDK token. Create a web SDK token to start whitelisting domains."
    - Add "Create Web SDK Token" button in empty state
    - _Requirements: 2.4_

  - [x] 2.4 Implement loading skeleton state
    - Display skeleton rows while data is loading
    - _Requirements: 2.5_

  - [x] 2.5 Implement copy Web SDK token functionality
    - Add "Copy Web SDK Token" button with masked preview
    - Implement clipboard copy using navigator.clipboard API
    - Show success toast "Copied to clipboard!" on success
    - Show error toast on failure
    - Conditionally show button only when domains exist
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 2.6 Implement delete domain functionality
    - Call `project.removeWebSDKWhitelistedHost` API on delete click
    - Refetch domains list on success
    - Show success toast "Removed {domain} from whitelist"
    - Show error toast on failure
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ] 2.7 Write property test for domain table rendering
    - **Property 1: Domain table renders all fetched domains**
    - **Validates: Requirements 2.1, 2.2**

  - [ ] 2.8 Write property test for date formatting
    - **Property 2: Date formatting consistency**
    - **Validates: Requirements 2.3**

- [-] 3. Create CreateWebSDKTokenModal component
  - [x] 3.1 Create modal component with form structure
    - Create `src/components/modals/create-web-sdk-token-modal.tsx`
    - Follow pattern from `create-campaign-modal.tsx`
    - Implement Dialog with header, form content, and action buttons
    - Add domain input field with label
    - _Requirements: 3.3, 3.4_

  - [x] 3.2 Implement domain validation logic
    - Port validation logic from archive `web-sdk.tsx`
    - Validate domain format (handle localhost, protocols, TLDs)
    - Format domain for saving (standardize protocol, remove trailing slashes)
    - Display inline validation errors for invalid input
    - _Requirements: 3.8_

  - [x] 3.3 Implement form submission and API integration
    - Call `project.createWebSDKWhitelistedHost` API on submit
    - Handle loading state during submission
    - Close modal and trigger refetch on success
    - Show success toast on creation
    - Show error toast on failure
    - Check for duplicate domains before submission
    - _Requirements: 3.5, 3.6, 3.7_

  - [ ] 3.4 Write property test for domain validation
    - **Property 3: Domain validation rejects invalid formats**
    - **Validates: Requirements 3.8**

- [x] 4. Wire up route handler and exports
  - [x] 4.1 Update settings page route handler
    - Add case for "whitelist-sdks" section in `src/pages/dashboard/settings/[section].tsx`
    - Import and render WhitelistSDKs component
    - _Requirements: 1.1_

  - [x] 4.2 Export WhitelistSDKs component
    - Add export to settings components index if exists
    - _Requirements: 1.1_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Write property test for delete action visibility
  - **Property 4: Delete action visible for all domain rows**
  - **Validates: Requirements 5.1**
