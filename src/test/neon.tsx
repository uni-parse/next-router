export default function NeonGrid() {
  const rows = []

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 10; i++) {
    rows.push(<Row key={i} index={i} />)
  }

  return (
    <div className='absolute left-0 top-0 grid h-full w-full'>
      {rows}
    </div>
  )
}

function Row({ index }: { index: number }) {
  return (
    <div
      className='row absolute bottom-0 h-5 w-full'
      style={{ transform: `translateZ(-${index * 50}px)` }}>
      <div
        className='absolute left-0 top-0 h-full w-full'
        style={{
          backgroundImage: `repeating-linear-gradient(
            to right,
            magenta,
            magenta calc(1.3vmin + ${index * 0.2}vmin),
            transparent calc(10vmin + ${index * 0.5}vmin),
            transparent
          )`,
        }}
      />
    </div>
  )
}
