import React from "react";

interface RemoveWishlistButtonProps {
  productId: number;
  onRemove: (productId: number) => Promise<void>;
}

const RemoveWishlistButton: React.FC<RemoveWishlistButtonProps> = ({
  productId,
  onRemove,
}) => {
  return (
    <button
      onClick={() => onRemove(productId)}
      className="absolute top-3 right-3 bg-white border-2 border-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white hover:border-red-500 group"
      aria-label="Remove from wishlist"
    >
      {/* Trash icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-colors"
        viewBox="0 0 20 20"
        fill="black"
      >
        <path
          d="M6.5 7a.5.5 0 01.5.5V15a.5.5 0 01-1 0V7.5a.5.5 0 01.5-.5zm3 0a.5.5 0 01.5.5V15a.5.5 0 01-1 0V7.5a.5.5 0 01.5-.5zm3 0a.5.5 0 01.5.5V15a.5.5 0 01-1 0V7.5a.5.5 0 01.5-.5z"
          className="transition-colors group-hover:fill-red-500"
        />
        <path
          fillRule="evenodd"
          d="M4 6a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8a1 1 0 01-1-1V6zm2 2v8a1 1 0 001 1h6a1 1 0 001-1V8H6zm2-4a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1H8z"
          clipRule="evenodd"
          className="transition-colors group-hover:fill-red-500"
        />
      </svg>
    </button>
  );
};

export default RemoveWishlistButton;
