import { useCallback, useRef } from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { flushSync } from "react-dom"

import { IconButton } from "@/components/ui/icon-button"

interface AnimatedThemeTogglerProps {
  mounted: boolean
  theme: "light" | "dark"
  onToggle?: () => void
  duration?: number
  className?: string
}

export const AnimatedThemeToggler = ({
  mounted,
  theme,
  onToggle,
  duration = 400,
  className,
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback: just invoke the callback without animation
      onToggle?.()
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        onToggle?.()
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [duration, onToggle])

  return (
    <IconButton
      ref={buttonRef}
      variant="ghost"
      size="md"
      onClick={toggleTheme}
      aria-label={mounted && theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
    >
      {theme === "dark" ? (
        <Sun className="w-[20px] h-[20px]" weight="regular" />
      ) : (
        <Moon className="w-[20px] h-[20px]" weight="regular" />
      )}
    </IconButton>
  )
}
