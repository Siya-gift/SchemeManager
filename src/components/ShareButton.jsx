import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Check out this App',
      text: 'I thought you might like this app!',
      url: window.location.href,
    };

    // 1. Try native mobile/browser share sheet
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          Toaster.error('Could not share link. Please try again.');
        }
      }
    } else {
      // 2. Fallback: Copy URL to clipboard on unsupported desktop browsers
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        Toaster.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        Toaster.error('Failed to copy link to clipboard.');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 active:scale-[0.99] cursor-pointer transition-all duration-300 ease-in-out text-left"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <i className={`fa-solid ${copied ? 'fa-check text-green-400' : 'fa-share-nodes'}`}></i>
          <p className="font-medium">
            {copied ? 'Link Copied!' : 'Share App'}
          </p>
        </div>
        <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
      </div>
    </button>
  );
}