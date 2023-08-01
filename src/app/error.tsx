'use client'

export default function Page({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <>
      <h1 className='text-center'>Error Handling</h1>

      <h3 className='text-center'>{error.message}</h3>

      <div className='flex justify-center'>
        <button onClick={reset} type='button'>
          Try Again
        </button>
      </div>
    </>
  )
}
