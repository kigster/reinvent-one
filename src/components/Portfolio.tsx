'use client'

import { useState, useCallback, memo } from 'react'
import { clients, type Client } from '@/data/clients'
import { trackClick } from './SectionContext'

const ClientCard = memo(function ClientCard ({
  client,
  onSelect
}: {
  client: Client
  onSelect: (client: Client) => void
}) {
  return (
    <button
      onClick={() => onSelect(client)}
      className='group relative overflow-hidden rounded-lg w-full max-w-[500px] h-[500px] text-left card-shadow'
    >
      <img
        src={client.image}
        alt={client.name}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent blur-sm' />
      <div className='absolute bottom-0 left-0 right-0 p-4'>
        <h3 className='font-heading text-2xl font-semibold text-white'>
          {client.name}
        </h3>
        <p className='text-sm text-gray-300'>{client.subtitle}</p>
      </div>
    </button>
  )
})

function ClientModal ({
  client,
  onClose
}: {
  client: Client
  onClose: () => void
}) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='bg-white text-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        <div className='relative'>
          <img
            src={client.image}
            alt={client.name}
            className='w-full object-cover rounded-t-xl'
          />
          <button
            onClick={onClose}
            className='absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors'
            aria-label='Close'
          >
            &times;
          </button>
        </div>
        <div className='p-6'>
          <h3 className='font-heading text-3xl font-bold mb-1'>
            {client.name}
          </h3>
          <p className='text-brand-accent font-semibold mb-4'>
            {client.subtitle}
          </p>
          <p className='text-gray-600 leading-relaxed mb-6'>{client.details}</p>
          <a
            href={client.externalUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-6 py-2 bg-brand-accent text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold'
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio () {
  const [selected, setSelected] = useState<Client | null>(null)
  const handleSelect = useCallback((client: Client) => {
    trackClick('client', client.name, 'open')
    setSelected(client)
  }, [])
  const handleClose = useCallback(() => {
    if (selected) trackClick('client', selected.name, 'close')
    setSelected(null)
  }, [selected])

  return (
    <section id='portfolio' className='relative py-24 bg-gray-200 text-gray-900'>
      <div className='mx-auto px-4 sm:px-6'>
        <div className='text-center mb-16'>
          <h2 className='font-heading text-5xl sm:text-6xl font-bold text-brand-dark mb-4'>
            Portfolio
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            A selection of companies we&apos;ve helped with scalability,
            infrastructure, and engineering.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-8 xl:gap-[50px]'>
          {clients.map(client => (
            <ClientCard
              key={client.short}
              client={client}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {selected && <ClientModal client={selected} onClose={handleClose} />}
    </section>
  )
}
