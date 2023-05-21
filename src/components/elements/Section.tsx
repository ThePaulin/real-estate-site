import clsx from 'clsx'
import { missingClass, formatText } from '@/utils/utils'

function Section ({
  as: Component = 'section',
  display = 'flex',
  className,
  size = 'copy',
  children,
  padding = 'all',
  ...props
}: {
  as?: React.ElementType
  display?: 'flex' | 'grid'
  className?: string
  children: React.ReactNode
  padding?: 'x' | 'y' | 'all' | 'none'
  [key: string]: any
}) {
  const paddingStyle: Record<string, string> = {
    x: 'px-4 tablet:px-8',
    y: 'py-4 tablet:py-8',
    all: 'p-4 tablet:p-8',
    none: 'p-0'
  }
  const styles = clsx(
    missingClass(className, 'w-') && 'w-full',
    paddingStyle[padding],
    className,
    display
  )

  return (
		<Component {...props} className={styles}>
			{children}
		</Component>
  )
}

export default Section
