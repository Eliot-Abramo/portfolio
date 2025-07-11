import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Github } from 'lucide-react'

const projects = [
  {
    name: 'Avionics-COTS',
    tagline: 'Deterministic serial/SPI comms stack',
    repo: 'https://github.com/YOUR_GITHUB_USERNAME/avionics_cots',
  },
  {
    name: 'BroCo ROS2 Bridge',
    tagline: 'Embedded ↔ ROS 2 binary bridge',
    repo: 'https://github.com/YOUR_GITHUB_USERNAME/ERC_EL_BroCo',
  },
]

export default function App () {
  const [dark, setDark] = useState(true)

  return (
    <div className={dark ? 'dark' : ''}>
      <main className='min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors'>
        <header className='max-w-5xl mx-auto py-10 px-4 flex justify-between items-center'>
          <h1 className='text-4xl font-bold dark:text-white'>Eliot Abramo</h1>
          <button
            onClick={() => setDark(!dark)}
            className='bg-neutral-800 text-white px-3 py-1 rounded-xl dark:bg-neutral-200 dark:text-black'
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </header>

        <section className='max-w-5xl mx-auto grid gap-6 md:grid-cols-2 px-4 pb-16'>
          {projects.map(p => (
            <Card key={p.name} className='shadow-lg dark:bg-neutral-800'>
              <CardContent className='p-6'>
                <h2 className='text-2xl font-semibold mb-2 dark:text-white'>
                  {p.name}
                </h2>
                <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                  {p.tagline}
                </p>
                <div className='flex gap-4'>
                  <a
                    href={p.repo}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'
                  >
                    <Github className='w-4 h-4' /> GitHub
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
