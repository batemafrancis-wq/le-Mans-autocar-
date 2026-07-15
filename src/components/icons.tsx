type IconProps = {
  size?: number;
  className?: string;
};

export function FacebookIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8.06h2.7l.4-3.14h-3.1V7.87c0-.91.25-1.53 1.56-1.53h1.67V3.53C15.98 3.4 15.05 3.32 13.96 3.32c-2.28 0-3.84 1.39-3.84 3.95v2.53H7.4v3.14h2.72V21h3.38z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 3H22l-7.6 8.68L23 21h-6.9l-5.4-6.6L4.5 21H1.4l8.1-9.26L1 3h7.1l4.9 6.02L18.9 3zm-1.2 16.2h1.7L7.4 4.7H5.6l12.1 14.5z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.5 7.2s-.22-1.57-.9-2.26c-.85-.9-1.8-.9-2.24-.96C16.28 3.75 12 3.75 12 3.75h-.01s-4.28 0-7.36.23c-.44.06-1.39.06-2.24.96-.68.69-.9 2.26-.9 2.26S1.26 9 1.26 10.86v1.78c0 1.86.23 3.66.23 3.66s.22 1.57.9 2.26c.85.9 1.97.87 2.47.97 1.79.17 7.14.23 7.14.23s4.29-.01 7.36-.24c.44-.06 1.39-.06 2.24-.96.68-.69.9-2.26.9-2.26s.23-1.8.23-3.66v-1.78c0-1.86-.23-3.66-.23-3.66zM9.75 14.9V8.7l6.1 3.1-6.1 3.1z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.56-.02s-.51.07-.78.37c-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34z" />
      <path d="M12.02 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 4.99L2 22l5.2-1.36a9.94 9.94 0 004.82 1.23h.01c5.5 0 9.97-4.47 9.97-9.97S17.52 2 12.02 2zm0 18.13h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.09.81.83-3.01-.2-.31a8.17 8.17 0 01-1.26-4.32c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 012.4 5.8c0 4.52-3.68 8.15-8.2 8.15z" />
    </svg>
  );
}

export function TikTokIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 3c.3 2.2 1.75 3.9 4.4 4.1v2.9c-1.6.1-3-.4-4.4-1.3v6.6c0 3.5-2.9 6.3-6.5 6.3S3.6 18.8 3.6 15.3c0-3.4 2.7-6.1 6-6.3v3c-1.6.2-2.9 1.6-2.9 3.3 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4V3h3.1z" />
    </svg>
  );
}
