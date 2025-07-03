'use client'

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-cyan-900 via-black to-gray-900 bg-no-repeat">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 opacity-30 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-700 opacity-20 rounded-full filter blur-2xl animate-pulse" />
    </div>

  )
};
