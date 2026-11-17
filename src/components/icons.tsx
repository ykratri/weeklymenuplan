type IconProps = { className?: string };

const stroke = "#292524";

export function IconBook({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 12c-3.5-2.5-8.5-3.5-14-2.5v25c5.5-1 10.5 0 14 2.5V12Z"
        fill="#F4A94E"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 12c3.5-2.5 8.5-3.5 14-2.5v25c-5.5-1-10.5 0-14 2.5V12Z"
        fill="#FBD79A"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 12v25"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 16.5c2.7-.6 5.7-.3 8 1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M13 21.5c2.7-.6 5.7-.3 8 1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconWheel({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="26"
        cy="24"
        r="15"
        fill="#FDE68A"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M26 9a15 15 0 0 1 15 15h-15V9Z"
        fill="#F9A8D4"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M26 39a15 15 0 0 1-15-15h15v15Z"
        fill="#93C5FD"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11 24a15 15 0 0 1 15-15v15H11Z"
        fill="#FFFFFF"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="26"
        cy="24"
        r="4.5"
        fill="#F4A94E"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="m9 17 4 3.5-5.5 1.5L9 17Z"
        fill="#EF4444"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBasket({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 22h6l1 6h4l-1-6h6l3 5-3 15H13l-3-15 3-5Z"
        fill="#F4A94E"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15 27h18M12 32h24"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M17 22c0-6 2.5-10 7-10s7 4 7 10"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="15"
        y="9"
        width="5"
        height="9"
        rx="1.5"
        fill="#93C5FD"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <circle
        cx="26"
        cy="13"
        r="4.5"
        fill="#EF4444"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M31 17c1-3.5 3-5.5 5.5-6"
        stroke="#6B8E3F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBookmark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 8h22v32l-11-8-11 8V8Z"
        fill="#FB7185"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 8h11v32l-11-8V8Z"
        fill="#F43F5E"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22 24 9l15 13v17a2 2 0 0 1-2 2h-8v-12h-10v12h-8a2 2 0 0 1-2-2V22Z"
        fill="#A8C473"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 24 24 8l18 16"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconEdit({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.4 2.6a2.1 2.1 0 1 1 3 3L11 16l-4 1 1-4Z" />
    </svg>
  );
}

export function IconDelete({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
