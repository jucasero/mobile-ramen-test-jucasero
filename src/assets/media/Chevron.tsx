const ChevronIcon = ({ color }: any) => (
  <div>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='ionicon'
      viewBox='0 0 512 512'
    >
      <title>Chevron Down</title>
      <path
        fill='transparent'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='48'
        d='M112 184l144 144 144-144'
      />
    </svg>
  </div>
);

export default ChevronIcon;
