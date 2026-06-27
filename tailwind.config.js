/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
    './node_modules/primeng/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        bg:              'var(--bg)',
        'secondary':  'var(--secondary)',
        'code':       'var(--code)',
        'bg-button':     'var(--bg-button)',
        surface:         'var(--surface)',
        'surface-terminal': 'var(--surface-terminal)',
        surface2:        'var(--surface2)',

        'border-subtle':      'var(--border-subtle)',
        border:               'var(--border)',
        'border-alt':         'var(--border-alt)',
        'border-input':       'var(--border-input)',
        'border-modal':       'var(--border-modal)',
        'border-scrollbar':   'var(--border-scrollbar)',
        'border-hover':       'var(--border-hover)',
        'border-card-hover':  'var(--border-card-hover)',

        'ghost-hover': 'var(--state-ghost-hover)',
        disabled:      'var(--state-disabled)',

        text:          'var(--text)',
        'text-primary':   'var(--text-primary)',
        'text-continue':  'var(--text-continue)',
        'text-input':     'var(--text-input)',
        'text-button':    'var(--text-button)',
        'text-feature':   'var(--text-feature)',
        'text-desc':      'var(--text-desc)',
        'text-loading':   'var(--text-loading)',
        'text-label':     'var(--text-label)',
        'text-section':   'var(--text-section)',
        'text-muted':     'var(--text-muted)',
        muted:            'var(--muted)',
        'text-tag':       'var(--text-tag)',
        'text-footer':    'var(--text-footer)',
        'text-comment':   'var(--text-comment)',
        'text-disabled':  'var(--text-disabled)',

        accent:       'var(--accent)',
        'accent-6':   'var(--accent-6)',
        'accent-7':   'var(--accent-7)',
        'accent-10':  'var(--accent-10)',
        'accent-12':  'var(--accent-12)',
        'accent-25':  'var(--accent-25)',
        'accent-30':  'var(--accent-30)',
        'accent-code':'var(--accent-code)',

        gold:      'var(--gold)',
        'gold-10': 'var(--gold-10)',
        'gold-12': 'var(--gold-12)',
        'gold-15': 'var(--gold-15)',
        'gold-25': 'var(--gold-25)',
        'gold-40': 'var(--gold-40)',

        blue:      'var(--blue)',
        'blue-12': 'var(--blue-12)',
        'blue-25': 'var(--blue-25)',

        error:          'var(--error)',
        'error-text':   'var(--error-text)',
        'error-bg':     'var(--error-bg)',
        'error-border': 'var(--error-border)',

        success:          'var(--success)',
        'success-text':   'var(--success-text)',
        'success-bg':     'var(--success-bg)',
        'success-border': 'var(--success-border)',

        'shadow-sm': 'var(--shadow-sm)',
        'shadow-md': 'var(--shadow-md)',
        'shadow-lg': 'var(--shadow-lg)',
        overlay:     'var(--overlay)',

        'project-blue':    'var(--project-blue)',
        'project-teal':    'var(--project-teal)',
        'project-yellow':  'var(--project-yellow)',
        'project-green':   'var(--project-green)',
        'project-purple':  'var(--project-purple)',
        'project-orange':  'var(--project-orange)',
        'project-pink':    'var(--project-pink)',
        'project-magenta': 'var(--project-magenta)',

        'terminal-red':   'var(--terminal-red)',
        'terminal-amber': 'var(--terminal-amber)',
        'terminal-green': 'var(--terminal-green)',
      },
      fontFamily: {
        sans: ['var(--font)', 'sans-serif'],
        mono: ['var(--mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
