# Component Documentation

This directory contains documentation for reusable React components.

## Component Structure

All components follow this structure:

```
src/components/
├── ui/              # Base UI components (shadcn/ui)
├── forms/           # Form components
├── dashboard/       # Dashboard-specific components
└── layout/          # Layout components (header, footer, nav)
```

## Component Documentation Standards

Each complex component should include:

### 1. TypeScript Types/Interfaces
```typescript
interface ComponentProps {
  /** Description of prop */
  propName: string
  /** Optional prop with default */
  optional?: boolean
}
```

### 2. JSDoc Comments
```typescript
/**
 * Brief component description
 *
 * @example
 * ```tsx
 * <Component propName="value" />
 * ```
 */
export function Component({ propName }: ComponentProps) {
  // ...
}
```

### 3. Component File Structure
```typescript
// ComponentName.tsx

import { ... } from '...'

// Types
interface ComponentNameProps {
  // ...
}

// Component
export function ComponentName(props: ComponentNameProps) {
  // Component logic
  return (
    // JSX
  )
}

// Optional: Sub-components
ComponentName.Header = function Header() { ... }
ComponentName.Footer = function Footer() { ... }
```

## Testing Components

Every component should have a corresponding test file:

```
Button.tsx
Button.test.tsx  // Unit tests
```

### Test Structure
```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

## Styling Guidelines

- Use Tailwind CSS utility classes
- Use `cn()` utility for conditional classes
- Follow shadcn/ui patterns for consistency

```typescript
import { cn } from '@/lib/utils/cn'

<div className={cn(
  "base classes",
  condition && "conditional classes",
  className
)} />
```

## Accessibility

All components must be accessible:

- ✅ Proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Semantic HTML
- ✅ Color contrast compliance
- ✅ Screen reader tested

## Example Component

See `docs/components/examples/Button.example.tsx` for a complete example.
