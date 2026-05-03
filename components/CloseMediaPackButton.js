'use client';

import { useRouter } from 'next/navigation';

export default function CloseMediaPackButton() {
  const router = useRouter();

  const handleClose = () => {
    // Try closing if opened in a separate tab/window.
    window.close();

    // Otherwise navigate back when possible.
    if (window.history.length > 1) {
      router.back();
      return;
    }

    // Final fallback path.
    router.push('/advertisers');
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      className="mediaPackCloseBtn"
      aria-label="Close media pack"
    >
      Close
    </button>
  );
}
