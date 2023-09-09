import Chat from '@/components/chat'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {/* {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null} */}
      <div className="hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          {/* <Sidebar /> */}
        </div>
      </div>
      <Chat />
  </main>
  )
}
