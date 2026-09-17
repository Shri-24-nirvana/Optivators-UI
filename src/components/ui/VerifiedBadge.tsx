import * as React from "react";

export interface VerifiedBadgeProps {
  size?: number;
  className?: string;
  showTooltip?: boolean;
}

/**
 * Authentic Instagram-style scalloped blue checkmark verified badge
 */
export function VerifiedBadge({
  size = 16,
  className = "",
  showTooltip = true,
}: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 align-middle ${className}`}
      title={showTooltip ? "Verified Profile" : undefined}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23863 19.6757 6.41554L19.6049 7.92903C19.5771 8.52388 19.8158 9.10021 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10021 19.8158 8.52388 19.5771 7.92903 19.6049L6.41554 19.6757C5.23863 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10021 4.42288 8.52388 4.39508 7.92903L4.32435 6.41554C4.26934 5.23863 5.23863 4.26934 6.41554 4.32435L7.92903 4.39508C8.52388 4.42288 9.10021 4.18418 9.50111 3.74391L10.5213 2.62368Z"
          fill="#0095F6"
        />
        <path
          d="M9.5 12L11.5 14L15 10"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default VerifiedBadge;
