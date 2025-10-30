import { Mail } from 'lucide-react'
import { logoDefaults } from '@/lib/design-tokens'

interface LogoProps {
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'black'
  size?: 'sm' | 'md' | 'lg'
}

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-emerald-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600', // Primary brand color
  black: 'bg-gray-900',
}

const sizeClasses = {
  sm: { icon: 16, text: 'text-xl', padding: 'px-3 py-1' },
  md: { icon: 24, text: 'text-3xl', padding: 'px-4 py-2' },
  lg: { icon: 32, text: 'text-4xl', padding: 'px-5 py-3' },
}

export default function Logo({
  color = logoDefaults.color,
  size = logoDefaults.size
}: LogoProps) {
  const bgColor = colorClasses[color]
  const sizeConfig = sizeClasses[size]

  return (
    <div className={`inline-flex items-center gap-2 ${bgColor} text-white ${sizeConfig.padding} rounded font-bold ${sizeConfig.text}`}>
      <Mail size={sizeConfig.icon} strokeWidth={2.5} />
      <span>RSVP&apos;d</span>
    </div>
  )
}
