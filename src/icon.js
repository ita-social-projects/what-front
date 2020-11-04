export default function Icon({glyph, viewBox = '0 0 16 16', className = 'icon',...props}){
    return (
      <svg className={className} viewBox={viewBox} {...props}>
        <use xlinkHref={`#${glyph}`} />
      </svg>
    );
  }