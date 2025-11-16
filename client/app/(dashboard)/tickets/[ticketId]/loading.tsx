import React from 'react'

export default function loading() {
  return (
    <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {/* Left: Ticket Review Skeleton (main content) */}
      <div className="panel col-span-1 md:col-span-2 lg:col-span-3 animate-pulse">
        {/* Header */}
        <div className="mb-1 flex flex-col gap-3 lg:flex-row items-start justify-between p-5">
          <div className="h-6 w-56 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-3 flex-wrap">
            <div className="h-7 w-36 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Body */}
        <div className="p-5 pt-0 pb-3">
          {/* Title + date */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-6 w-72 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="text-right space-y-2">
              <div className="h-5 w-44 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 ml-auto" />
            </div>
          </div>

          {/* Divider label */}
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#eee] dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#eee] dark:bg-slate-800 px-2 text-sm text-gray-500 dark:text-gray-400 rounded">
                <span className="inline-block h-3 w-20 rounded bg-gray-200 dark:bg-gray-700 align-middle" />
              </span>
            </div>
          </div>

          {/* Scrollable description area (simulated) */}
          <div className="mt-4 max-h-[calc(100vh-500px)] space-y-3 pr-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            ))}
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-6 h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* New Comment input */}
          <div className="mt-6 flex">
            <div className="h-10 w-40 rounded-l-md bg-gray-200 dark:bg-gray-700 border border-white-light dark:border-[#17263c]" />
            <div className="h-10 flex-1 rounded-r-md bg-gray-200 dark:bg-gray-700 border border-l-0 border-white-light dark:border-[#17263c]" />
          </div>
          <div className="mt-4 flex justify-end">
            <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Right: Latest Activity Skeleton (sidebar) */}
      <div className="panel col-span-1 md:col-span-1 lg:col-span-1 pb-0 relative animate-pulse max-h-[calc(100vh-200px)]">
        <div className="-mx-5 mb-5 flex items-center justify-between border-b border-white-light p-5 pt-0 dark:border-[#1b2e4b]">
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-10 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="h-3/4 pr-3 -mr-3 space-y-7 ">
          {/* Optional escalation item */}
          <div className="flex items-start">
            <div className="relative z-10 mr-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-56 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          <div className="mx-auto h-px w-3/4 border-b border-white-light dark:border-[#1b2e4b]" />

          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start">
              <div className="relative z-10 mr-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                {i !== 5 && (
                  <div className="absolute left-3 top-10 h-[calc(100%-24px)] w-[2px] bg-white-dark/30 dark:bg-white/10" />
                )}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-60 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-36 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer link bar */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:block">
          <div className="flex w-full items-center justify-center p-4 border-t border-white-light dark:border-white/10">
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
