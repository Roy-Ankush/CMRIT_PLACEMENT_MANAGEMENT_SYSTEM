import React from 'react'

function RecentActivity() {
  return (
    <div>
      <div className='  mt-5 h-[80vh] flex justify-center md:flex-row-reverse m:flex-col gap-10 '>

      <div className=' w-3/12 chatroom m:w-full '>
          <div className='h-12 font-bold   w-full rounded-t-md bg-green-600 flex items-center justify-center'>ChatRoom</div>
          <div className=' w-full rounded-b-md bg-gray-300 h-[73vh]' >some chats</div>
      </div>

        <div className='rounded-md bg-blue-300 w-4/6 p-3 overflow-y-scroll m:w-full no-scrollbar s:w-full'>
          <div className='mb-10'>
            <div className='h-12 font-bold   w-full rounded-t-md bg-green-600 flex items-center'>ChatRoom</div>
            <div className=' w-full rounded-b-md bg-gray-300 h-44' >some chats</div>
          </div>

          <div className='mb-10'>
            <div className='h-12 font-bold   w-full rounded-t-md bg-green-600 flex items-center'>ChatRoom</div>
            <div className=' w-full rounded-b-md bg-gray-300 h-44' >some chats</div>
          </div>

          <div className='mb-10'>
            <div className='h-12 font-bold   w-full rounded-t-md bg-green-600 flex items-center'>ChatRoom</div>
            <div className=' w-full rounded-b-md bg-gray-300 h-44' >some chats</div>
          </div>
        </div>
    
        
      </div>
    </div>
  )
}

export default RecentActivity