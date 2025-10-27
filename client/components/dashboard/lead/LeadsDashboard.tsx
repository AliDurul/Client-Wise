'use client';
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import StatsCard from './StatsCard'
import { FiUsers, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi'
import type { Lead } from '@/types'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  leads?: Lead[]
}

export default function LeadsDashboard({ leads = [] }: Props) {
  const totalLeads = leads.length
  const openLeads = leads.filter(l => l.status === 'Open').length
  const won = leads.filter(l => l.status === 'Closed-Won').length
  const avgProb = leads.length ? Math.round(leads.reduce((s, a) => s + (Number(a.probability) || 0), 0) / leads.length) : 0

  // Prepare data for charts
  const statusCounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const l of leads) map[l.status ?? 'Unknown'] = (map[l.status ?? 'Unknown'] || 0) + 1
    return map
  }, [leads])

  const pipelineCounts = useMemo(() => {
    const pipeline = ['Proposal|Quotation', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Other']
    const map: Record<string, number> = {}
    for (const key of pipeline) map[key] = 0
    for (const l of leads) {
      const key = l.pipeline_stage ?? 'Other'
      map[pipeline.includes(key) ? key : 'Other'] = (map[pipeline.includes(key) ? key : 'Other'] || 0) + 1
    }
    return pipeline.map(p => map[p])
  }, [leads])

  const totalValue = leads.reduce((s, a) => s + (Number(a.deal_value) || 0), 0)

  const lineOptions: any = {
    chart: { id: 'pipeline', toolbar: { show: false } },
    stroke: { curve: 'smooth' as const },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    colors: ['#06b6d4'],
    grid: { borderColor: '#e6e6e6' },
  }

  const lineSeries = [
    { name: 'Expected Revenue', data: [12000, 18000, 15000, 22000, totalValue || 8000, totalValue] },
  ]

  const donutOptions: any = {
    labels: Object.keys(statusCounts).length ? Object.keys(statusCounts) : ['No Leads'],
    legend: { position: 'bottom' as const },
    colors: ['#60a5fa', '#34d399', '#f97316', '#ef4444', '#94a3b8'],
  }

  const donutSeries = Object.values(statusCounts).length ? Object.values(statusCounts) : [1]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Leads" value={totalLeads} change={`+${Math.round((totalLeads/100)*5)}%`} icon={<FiUsers size={18} />} colorClass="bg-indigo-600" />
        <StatsCard title="Open Leads" value={openLeads} change={`-${Math.round((openLeads/Math.max(1,totalLeads))*2)}%`} icon={<FiActivity size={18} />} colorClass="bg-emerald-500" />
        <StatsCard title="Won" value={won} change={`${Math.round((won/Math.max(1,totalLeads))*100)}%`} icon={<FiTrendingUp size={18} />} colorClass="bg-amber-500" />
        <StatsCard title="Avg Probability" value={`${avgProb}%`} change={avgProb > 50 ? `+${avgProb - 50}%` : `${avgProb - 50}%`} icon={<FiDollarSign size={18} />} colorClass="bg-sky-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 panel ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Pipeline Revenue</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">Projected revenue from active leads</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-xl font-semibold">{totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            </div>
          </div>

          <div className="h-56">
            <ReactApexChart options={lineOptions} series={lineSeries} type="area" height={220} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="panel mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Status Distribution</h4>
            <div className="mt-3 h-56">
              <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={220} />
            </div>
          </div>

          <div className="">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Summary</h4>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">Average Deal Size</div>
                <div className="font-medium">{(totalLeads ? (totalValue / totalLeads) : 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">Avg Probability</div>
                <div className="font-medium">{avgProb}%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">Top Pipeline</div>
                <div className="font-medium">{pipelineCounts.reduce((i, c, idx) => c > pipelineCounts[i] ? idx : i, 0) === 0 ? 'Proposal' : 'Other'}</div>
              </div>
              <div className="pt-2">
                <button className="w-full btn btn-primary">Create Lead</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
