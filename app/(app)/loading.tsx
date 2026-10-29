export default function AppLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 animate-pulse">
      {/* Top Search Bar Skeleton */}
      <div className="mb-6">
        <div className="h-12 w-full bg-[#efeeeb] border-2 border-[#cec7aa] rounded-xl shadow-[3px_3px_0px_#cec7aa]" />
      </div>

      {/* Filter Chips Skeleton */}
      <div className="flex items-center gap-2 mb-8 overflow-x-hidden">
        <div className="h-8 w-28 bg-[#ffe500]/40 border-2 border-[#1b1c1a]/40 rounded-full" />
        <div className="h-8 w-32 bg-[#efeeeb] border-2 border-[#cec7aa] rounded-full" />
        <div className="h-8 w-36 bg-[#efeeeb] border-2 border-[#cec7aa] rounded-full" />
        <div className="h-8 w-32 bg-[#efeeeb] border-2 border-[#cec7aa] rounded-full" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-44 bg-[#efeeeb] rounded-lg" />
            <div className="h-9 w-32 bg-[#ffe500]/40 border-2 border-[#1b1c1a]/30 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-80 bg-white border-[3px] border-[#cec7aa] rounded-2xl p-5 shadow-[4px_4px_0px_#cec7aa] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-24 bg-[#f5f3f0] rounded-xl" />
                <div className="h-5 w-3/4 bg-[#efeeeb] rounded" />
                <div className="h-4 w-1/2 bg-[#efeeeb] rounded" />
              </div>
              <div className="h-10 bg-[#efeeeb] rounded-lg" />
            </div>

            <div className="h-80 bg-white border-[3px] border-[#cec7aa] rounded-2xl p-5 shadow-[4px_4px_0px_#cec7aa] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-24 bg-[#f5f3f0] rounded-xl" />
                <div className="h-5 w-3/4 bg-[#efeeeb] rounded" />
                <div className="h-4 w-1/2 bg-[#efeeeb] rounded" />
              </div>
              <div className="h-10 bg-[#efeeeb] rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="lg:col-span-4">
          <div className="h-96 bg-white border-[3px] border-[#cec7aa] rounded-2xl p-5 shadow-[4px_4px_0px_#cec7aa] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-[#efeeeb] rounded" />
              <div className="h-7 w-48 bg-[#efeeeb] rounded" />
              <div className="h-2.5 w-full bg-[#efeeeb] rounded-full" />
              <div className="h-28 bg-[#f5f3f0] rounded-xl" />
            </div>
            <div className="h-11 bg-[#ffe500]/40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
