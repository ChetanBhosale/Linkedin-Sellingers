# App/Dashboard — Development Guide

## Project Overview

App/Dashboard is a Next.js (Pages Router) analytics dashboard for mobile app attribution and campaign management. It uses TypeScript, Tailwind CSS with a custom semantic design system, React Query for server state, and a shadcn-inspired component library.

**Package Manager:** `bun`
**Run dev:** `bun run dev`
**Build:** `bun run build`
**Lint:** `bun run lint`

---

## Architecture & File Structure

```
src/
├── components/
│   ├── ui/              # Base UI primitives (Button, Input, Modal, Drawer, Select, etc.)
│   ├── campaigns/       # Campaign page components
│   ├── dashboard/       # Dashboard layout (sidebar, header)
│   ├── modals/          # All modal components
│   ├── integrations/    # Ad network integration components
│   ├── settings/        # Settings page components
│   ├── skan-analytics/  # SKAN analytics components
│   └── billing/         # Billing components
├── data/
│   ├── index.ts         # Axios fetcher, IResponse<T> type
│   ├── endpoints.ts     # API endpoint URL constants
│   ├── project.ts       # Project-related API functions
│   ├── campaign.ts      # Campaign API functions
│   ├── user.ts          # User API functions
│   └── mock/            # Demo project mock data (project 24/225 only)
├── hooks/               # Custom hooks
│   ├── use-modal.tsx    # Modal state management (URL-based)
│   ├── use-drawer.tsx   # Drawer state management (URL-based)
│   ├── use-analytics.ts # PostHog analytics tracking
│   └── use-campaigns-api.ts # Campaign data hook
├── context/
│   └── RootContext.tsx   # Global app context (user, selectedProject)
├── pages/               # Next.js Pages Router
│   ├── dashboard/       # Dashboard sub-pages
│   └── _app.tsx         # App wrapper
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constants/           # Constants (analytics events, demo project IDs)
├── styles/
│   └── globals.css      # CSS variables, design tokens
├── lottie/              # Lottie animation JSON files
└── archive/             # Legacy code (READ-ONLY reference, never import from here)
```

---

## Critical Development Rules

### Rule 1: Always Use RootContext for Project/User Data

**NEVER** extract `project_id` or user info from `useRouter().query`. Always use RootContext:

```tsx
import { useRootContext } from "@/context/RootContext";

const { selectedProject, user } = useRootContext();
const projectId = selectedProject?.id;
```

Available from RootContext:
- `selectedProject` — Full project object (id, name, company, timezone, domains, tokens, role, etc.)
- `user` — Current user (id, email, first_name, last_name, project_members)

### Rule 2: Preserve `p_id` Query Parameter on Navigation

When redirecting users between pages, always include `p_id`:

```tsx
const { query, push } = useRouter();
const p_id = (query?.p_id as string) || String(projectId);

push({
  query: { ...newQuery, ...(p_id && { p_id }), campaign: displayId }
});
```

### Rule 3: No Unused Code

Remove all unused imports, variables, functions, and dead code before finishing any task.

### Rule 4: Never Import from `src/archive/`

The `src/archive/` directory is a read-only knowledge base of legacy implementations. Study it for patterns and API usage, but **never import from it**. If you need something from archive, recreate it in `src/`.

### Rule 5: Fix Root Causes, Not Symptoms

Always resolve problems at their root rather than applying temporary patches. Each issue should be fixed thoroughly so it never recurs. If unclear about the root cause, ask questions and explore approaches before implementing.

### Rule 6: Research Before Building

Before writing any new component or feature:
1. Check `src/components/ui/` for existing base components
2. Check `src/components/` for similar feature components
3. Check `src/archive/` for reference implementations (patterns only, don't import)
4. Check `src/hooks/` for existing data-fetching hooks
5. Check `src/data/` for existing API functions

---

## Design System

### Colors — Semantic Tokens Only

**NEVER use hardcoded colors.** Always use semantic tokens from the design system:

```tsx
// ✅ CORRECT
className="bg-primary text-primary border-default"
className="bg-status-success text-status-success"
className="text-tertiary border-light"

// ❌ WRONG
className="bg-white text-black border-gray-300"
className="bg-green-500 text-green-600"
```

#### Background Tokens
| Token | Usage |
|-------|-------|
| `bg-primary` | Main page background |
| `bg-secondary` | Cards, sections |
| `bg-tertiary` | Nested sections |
| `bg-elevated-primary` | Elevated cards, popovers |
| `bg-elevated-secondary` | Secondary elevated surfaces |
| `bg-status-warning` | Warning backgrounds |
| `bg-status-error` | Error backgrounds |
| `bg-status-success` | Success backgrounds |
| `bg-status-info` | Info backgrounds |
| `bg-status-neutral` | Neutral status backgrounds |

#### Text Tokens
| Token | Usage |
|-------|-------|
| `text-primary` | Main text, headings |
| `text-secondary` | Body text, descriptions |
| `text-tertiary` | Muted text, captions |
| `text-placeholder` | Input placeholders |
| `text-status-*` | Status-colored text |

#### Border Tokens
| Token | Usage |
|-------|-------|
| `border-default` | Standard borders |
| `border-light` | Subtle borders |
| `border-heavy` | Emphasized borders |
| `border-selected` | Active/selected state |
| `border-status-*` | Status-colored borders |

#### Icon Tokens
| Token | Usage |
|-------|-------|
| `icon-primary` | Primary icons |
| `icon-secondary` | Secondary icons |
| `icon-tertiary` | Muted icons |
| `icon-disabled` | Disabled state icons |
| `icon-status-*` | Status-colored icons |

#### Interactive Tokens
| Token | Usage |
|-------|-------|
| `interactive-surface-default/hover/pressed` | Interactive backgrounds |
| `interactive-text-default/hover/pressed` | Interactive text (links) |

#### Alpha Tokens (for overlays/hover states)
| Token | Usage |
|-------|-------|
| `bg-alpha-5` | Subtle hover background |
| `bg-alpha-10` | Stronger hover background |

### Typography — Use Token Classes

**NEVER use arbitrary font sizes.** Use typography tokens:

```tsx
className="text-heading1"    // 36px, line-height: 40px
className="text-heading2"    // 24px, line-height: 30px
className="text-heading3"    // 18px, line-height: 26px
className="text-body-lg"     // 16px, line-height: 26px
className="text-body-md"     // 14px, line-height: 20px
className="text-body-sm"     // 12px, line-height: 16px
className="text-button-md"   // 14px, line-height: 18px
className="text-label-md"    // 14px
className="text-badge-label-md" // 12px
```

### Border Radius

```tsx
className="rounded-sm"   // 4px
className="rounded-md"   // 8px
className="rounded-lg"   // 12px
className="rounded-xl"   // 16px
className="rounded-full" // 9999px (pills, circles)
```

### Spacing Scale

Use Tailwind spacing: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32`

### CSS Variables in Inline Styles

When inline styles are necessary, use CSS variables:

```tsx
<div style={{ backgroundColor: "var(--bg-primary)" }}>
<div style={{ color: "var(--text-primary)" }}>
```

---

## Component Development

### Before Creating Any Component

1. **Check `src/components/ui/`** for existing primitives
2. **Check the codebase** for similar implementations
3. **Extend existing components** with new variants/props rather than creating duplicates
4. **Compose** smaller components rather than building monolithic ones

### Component Structure Template

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Define variants
const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "primary-classes",
      secondary: "secondary-classes",
    },
    size: {
      sm: "small-classes",
      md: "medium-classes",
      lg: "large-classes",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// 2. Define props interface
export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// 3. Implement with forwardRef
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(componentVariants({ variant, size }), className)} {...props}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </div>
    );
  }
);

// 4. Set displayName
MyComponent.displayName = "MyComponent";

// 5. Export
export { MyComponent, componentVariants };
```

### Icon Props Patterns (Existing Conventions)

```tsx
// Button: leftIcon, rightIcon, dropdownIcon
<Button leftIcon={<Icon />} rightIcon={<Icon />} dropdownIcon={<CaretDown />}>Text</Button>

// Input: iconLeading, iconTrailing
<Input iconLeading={<MagnifyingGlass />} iconTrailing={<X />} />

// Badge/Chip: leftIcon
<Badge leftIcon={<Icon />}>Label</Badge>
```

### Icons — Phosphor Icons Only

Use `@phosphor-icons/react` for all icons. Every interactive icon must be wrapped in a `<Button>` component for accessibility. Only decorative/static icons are exempt.

```tsx
import { MagnifyingGlass, CaretDown, Info } from "@phosphor-icons/react";

// Interactive icon — wrap in Button
<Button variant="text" size="sm" className="h-auto p-0">
  <Info size={14} weight="regular" className="text-icon-tertiary" />
</Button>

// Decorative icon — no button needed
<MagnifyingGlass size={16} className="text-icon-secondary" />
```

### Accessibility Requirements

- Use `<a>` for navigation (route changes)
- Use `<button>` for actions (modals, toggles, commands)
- Use `<div>` only for layout — never for clickable elements
- Include `aria-label` on icon-only buttons
- Include `aria-disabled` on disabled interactive elements
- Use `role` attributes where semantic HTML isn't sufficient

### Performance Patterns

```tsx
// Memoize expensive computations
const computed = useMemo(() => expensiveCalc(data), [data]);

// Memoize callbacks passed to children
const handleClick = useCallback(() => { /* ... */ }, [deps]);

// Memoize components that receive stable props
export const MyComponent = memo(function MyComponent({ ... }) { /* ... */ });
```

---

## React Query (TanStack Query) Patterns

### API Response Wrapper

All API functions return `Promise<IResponse<T>>`:

```tsx
interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}
```

### Standard Query

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["campaigns", projectId, { status, page }],
  queryFn: () => campaign.getAll({ project_id: projectId!, status, page }),
  select: (res) => res.data,       // ALWAYS extract from IResponse wrapper
  enabled: !!projectId,            // ALWAYS gate dependent queries
  staleTime: 5 * 60 * 1000,       // Cache duration
  refetchOnWindowFocus: false,
});
```

### Standard Mutation

```tsx
const mutation = useMutation({
  mutationFn: (data: CreateRequest) =>
    api.create({ project_id: projectId!, ...data }),
  onSuccess: () => {
    toast({ title: "Created successfully!" });
    queryClient.invalidateQueries({ queryKey: ["resource", projectId] });
  },
  onError: (error: any) => {
    toast({
      title: error?.response?.data?.msg || "Operation failed",
      variant: "destructive",
    });
  },
});
```

### Query Key Conventions

```tsx
// Hierarchical, descriptive arrays
queryKey: ["campaigns", projectId]
queryKey: ["campaign-totals", projectId, from, to]
queryKey: ["campaignTableColumns", projectId]
queryKey: ["projectEvents", projectId]

// NEVER use string concatenation
// ❌ queryKey: "campaigns" + projectId
```

### Stale Time Guidelines

- User/session data: `60_000` (1 min)
- Project config: `30_000` (30 sec)
- Real-time status: `5_000` (5 sec)
- Static/rarely-changing: `300_000` (5 min)

### Smart Polling

```tsx
refetchInterval: (query) => {
  if (query.state.data?.isComplete) return false; // Stop polling
  return 10_000; // Poll every 10s
},
refetchIntervalInBackground: false,
```

---

## Modals

### Component Imports

```tsx
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
```

**NEVER use `Dialog` components. Always use `Modal*` components.**

### Registration

Add to `src/hooks/use-modal.tsx`:

```tsx
export const MODALS = {
  your_new_modal: "your-new-modal",
} as const;
```

### Usage

```tsx
const { your_new_modal } = useModals();

// Open
your_new_modal.toggle(true);

// Open with data
your_new_modal.toggle(true, { data: { id: 123 } });

// Access data inside modal
const modalData = your_new_modal.data;
```

### Modal Footer Button Pattern

```tsx
<ModalFooter className="justify-between">
  <Button variant="outlined" size="md" onClick={onClose} disabled={isPending} type="button">
    Cancel
  </Button>
  <Button variant="primary" size="md" onClick={onSubmit} loading={isPending} type="button">
    Save
  </Button>
</ModalFooter>
```

### Size Options

`<ModalContent size="sm" | "md" | "lg" | "xl" | "full">`

---

## Drawers

### Component Imports

```tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
```

### Registration

Add to `src/hooks/use-drawer.tsx`:

```tsx
export const DRAWERS = {
  your_new_drawer: "your-new-drawer",
} as const;
```

### Usage

```tsx
const { your_new_drawer } = useDrawers();
your_new_drawer.toggle(true);
your_new_drawer.toggle(true, { data: { id: 123 } });
```

### DrawerContent Props

- `side="right"` (most common), `"left"`, `"top"`, `"bottom"`
- `width="70%"` or `width={500}` (for left/right)
- `height="400px"` (for top/bottom)

### URL State

- Modals use `?m=modal-name`
- Drawers use `?d=drawer-name`
- Both support browser back/forward navigation

---

## Analytics (PostHog)

### Tracking Events

```tsx
import { useAnalytics } from "@/hooks/use-analytics";
import { ANALYTICS_EVENTS } from "@/constants/analytics-events";

const { trackEvent } = useAnalytics();

trackEvent(ANALYTICS_EVENTS.CAMPAIGN_ROW_CLICKED, {
  campaign_name: campaign.name,
  campaign_id: campaign.display_id,
});
```

### Adding New Events

1. Check `src/constants/analytics-events.ts` — reuse existing events when possible
2. Add constant: `MY_NEW_EVENT: "my_new_event"` (snake_case value, SCREAMING_SNAKE key)
3. Track with `trackEvent(ANALYTICS_EVENTS.MY_NEW_EVENT, { ...props })`

Auto-injected properties: `project_id`, `project_name`, `user_id`, `user_email`, `username`, `timestamp`

---

## Lottie Animations

**NEVER import `lottie-react` directly.** Always use the `LottieIsland` wrapper for SSR compatibility:

```tsx
import LottieIsland from "@/components/LottieIsland";
import AnimationData from "@/lottie/loaders/dog_running.json";

<LottieIsland
  config={{ animationData: AnimationData, loop: true }}
  width="68px"
  className="mt-3"
/>
```

---

## Demo Projects (IDs: 24, 225)

These are playground/demo projects that use mock data instead of real API calls.

### Gating Pattern

```tsx
import { isDemoProjectId } from "@/constants/demo-projects";

if (isDemoProjectId(projectId)) {
  // Demo-only logic — uses localStorage, mock data
}
```

### What's Mocked

- Campaign list data → `src/data/mock/demo-campaigns.ts`
- Project stats → `src/data/mock/demo-project.ts`
- Campaign details → `src/data/mock/demo-campaign-details.ts`
- SKAN analytics → `src/data/mock/demo-skan-analytics.ts`
- Column preferences → localStorage (`demo_column_prefs_{id}`)

### Key Rule

All demo-specific code must be gated behind `isDemoProjectId()` or `isDemoContext()`. Never let demo logic affect real projects.

---

## Data Layer (`src/data/`)

### API Function Pattern

```tsx
// src/data/campaign.ts
const campaign = {
  getAll: (data: { project_id: number; page?: number }): Promise<IResponse<ICampaignListResponse>> =>
    fetcher.get(endpoints.campaign.list, data),

  create: (data: CreateCampaignRequest): Promise<IResponse<ICampaign>> =>
    fetcher.post(endpoints.campaign.create, data),
};

export default campaign;
```

### Fetcher

The `fetcher` object (from `src/data/index.ts`) wraps Axios with:
- Base URL from `NEXT_PUBLIC_BASE_URL` env var
- 30s timeout
- Auto short-circuits requests on `/embed/*` routes (demo dashboard)

---

## Figma Integration Workflow

When implementing a Figma design:

1. **Ask clarifying questions** — understand interactions, states, edge cases
2. **Research existing patterns** — check archive, existing components, hooks
3. **Plan before building** — outline architecture, props, integration points
4. **Build with design system** — use semantic tokens, Shadcn primitives, Phosphor icons
5. **Implement all states** — default, hover, active, focus, disabled, loading, error, empty
6. **Verify fidelity** — compare with Figma, target 95%+ pixel match
7. **Add skeleton loading** — for any component that fetches data

---

## Code Quality Checklist

Before finishing any task, verify:

- [ ] Uses semantic design tokens (no hardcoded colors/sizes)
- [ ] Follows existing component prop patterns
- [ ] Uses `forwardRef` for reusable UI components
- [ ] Proper TypeScript types and interfaces
- [ ] Accessible (ARIA labels, semantic HTML, keyboard nav)
- [ ] Handles loading/error/disabled/empty states
- [ ] Uses `cn()` for className merging
- [ ] No unused imports or dead code
- [ ] `p_id` preserved in navigation
- [ ] Project data from RootContext (not router query)
- [ ] Interactive icons wrapped in Button
- [ ] React Query uses `select`, `enabled`, proper `queryKey`
- [ ] Mutations invalidate related queries on success
- [ ] Error messages shown via toast
