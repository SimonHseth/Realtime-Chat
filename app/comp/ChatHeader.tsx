import LoginButton from './LoginButton'


export default function ChatHeader() {
  return (
    <div>
      
      {<><div className="h-0"></div><div className="p-5 border-b flex items-center justify-between">
         <div className="">
             <h1 className="text-xl font-bold">Forest Seekers</h1>
             <div className="flex items-center gap-1">
                 <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                 <h2 className="text-sm text-gray-400">Online</h2>
             </div>
         </div>
         <LoginButton />
         

     </div></>}
    </div>
  )
}

