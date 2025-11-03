export function OpenContainerLogo() {
  return (
    <div className="flex items-center gap-8">
      {/* Logotype */}
      <div 
        className="text-white uppercase tracking-wide" 
        style={{ 
          fontFamily: '"Inter", "Montserrat", sans-serif', 
          fontWeight: 600, 
          fontSize: '2.5rem',
          letterSpacing: '0.05em'
        }}
      >
        Arc<span className="text-[#00FFFF] align-super" style={{ fontSize: '1.8rem', verticalAlign: 'super' }}>^</span>
      </div>
      
      {/* Logomark - Open Container */}
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logomark"
      >
        {/* Bottom Arc - Living Earth Green (RE:EARTH/ecology) */}
        <path
          d="M 30 95 A 45 45 0 0 0 110 95"
          stroke="#38B281"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Left Upper Arc - Arc Electric Teal (RE:TECH) */}
        <path
          d="M 20 85 A 50 50 0 0 1 35 45"
          stroke="#00FFFF"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Right Upper Arc - Arc Electric Teal (RE:ALIGN) */}
        <path
          d="M 105 45 A 50 50 0 0 1 120 85"
          stroke="#00FFFF"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
