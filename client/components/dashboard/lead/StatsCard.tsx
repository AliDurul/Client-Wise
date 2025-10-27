import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  icon?: React.ReactNode
  colorClass?: string
}

export default function StatsCard({ title, value, change, icon, colorClass = 'bg-blue-500' }: StatsCardProps) {
  return (
    <div className="panel shadow rounded-lg p-4 flex items-center gap-4">
      <div className={`rounded-md p-3 text-white ${colorClass} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
          {change && <span className="text-sm text-green-500 font-medium">{change}</span>}
        </div>
      </div>
    </div>
  )
}
