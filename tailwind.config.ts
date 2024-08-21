import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        magenta: {
          '50': '#fff0fc',
          '100': '#ffe4fa',
          '200': '#ffc9f7',
          '300': '#ff9cef',
          '400': '#ff5fe1',
          '500': '#ff30cf',
          '600': '#f50db0',
          '700': '#e10098',
          '800': '#b00476',
          '900': '#920964',
          '950': '#5b003a',
        },
        'cod-gray': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#101010',
          '900': '#050505',
          '950': '#000000',
        },
      }
    }
  }
}
