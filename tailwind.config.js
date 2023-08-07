/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'mv-white':'#ffffff',
        'mv-black':'#000000',
        'mv-divider':'#ebeff2',
        'mv-blue-800':'#00113d',
        'mv-blue-600':'#213770',
        'mv-blue-500':"#293D71",
        'mv-blue-200':'#747D94',
        'mv-orange-400':'#f43724',
        'mv-orange-500':'#f21a05',
        'mv-orange-700':'#F21A05',
        'mv-gray-bg':'#f5f6f8',
        'mv-gray-100':'eaecf0',
        'mv-gray-200':'#EAECF0',
        'mv-gray-150':'#fbfbfb',
        'mv-gray-300':'#D0D5DD',
        'mv-gray-400':'#B7B7B7',
        'mv-gray-500':'#777777',
        'mv-gray-bg':'#F5F6F8'
      },
      fontFamily:{
        'epilogue':['Epilogue, sans-serif'],
        'inter':['Inter, sans-serife'],
        'openSans':['Open Sans, sans-serif']
      }
    },
  },
  plugins: [],
}
