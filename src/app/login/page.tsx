import Image from "next/image"
import Register from "@/components/Register"

export default function Login() {

  return (
    <section className='w-full min-h-screen  bg-mv-blue-800'>
      <div className='flex flex-col justify-center relative max-w-[1366px] w-full mx-auto min-h-screen p-3 md:p-0 '>
        <div className='logo-wrapper absolute top-3 left-3 md:top-[20px] md:left-0 ' >
          <Image src={'/logo_pontua_white.png'} alt='pontua-logo'
            className='w-[169px] h-[50px]'
            width={'100'} height={'100'}
          //  layout='fill'             
          />
        </div>

        <div className='flex items-center justify-center'>
  
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-[140px] place-items-center  relative '>
            <div className='h-full w-full' >
              <Image src={'/building.svg'}
                width={'100'}
                height={'100'}
                className='w-[614px] h-[467.85px]'
                alt='building' />
            </div>

            <div className='h-full w-fit absolute lg:relative flex items-center justify-center ' >
              <Register />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
