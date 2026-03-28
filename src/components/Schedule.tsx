'use client'

export default function Schedule () {
  return (
    <section
      id='schedule'
      className='relative min-h-dvh py-24 bg-[#000000] text-white'
    >
      <div className='max-w-[min(100%,1420px)] mx-auto px-4 sm:px-6'>
        <div className='text-center mb-12'>
          <h2 className='font-teko text-5xl md:text-6xl uppercase tracking-wide mb-4'>
            Schedule a Meeting
          </h2>
          <div className='w-20 h-1 bg-brand-accent mx-auto mb-6' />
          <p className='text-gray-400 font-opensans max-w-2xl mx-auto'>
            Pick a time that works for you and let&apos;s connect.
          </p>
        </div>
        <div className='flex justify-center w-full overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-lg'>
          <iframe
            src='https://cal.com/kigster-sf/connect'
            className='shrink-0 w-[min(100%,1360px)] h-[min(1320px,92dvh)] min-h-[1000px] border-0 rounded-lg bg-[#000000]'
            title='Schedule a meeting'
            allow='payment'
          />
        </div>
      </div>
    </section>
  )
}
