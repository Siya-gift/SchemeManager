import React, { useRef } from 'react';

export default function RestoreButton() {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file for recovery:", file.name);
            // Insert your database upload or parsing logic here
        }
    };

    const handleButtonClick = () => {
        // Programmatically open the native file picker
        fileInputRef.current.click();
    };

    return (
        <>
            {/* Hidden Native File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".csv, .xlsx, .json" // Restricts picker to data files
            />

            {/* Styled Trigger Button */}
            <button
                onClick={handleButtonClick}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white rounded-lg hover:bg-white/95 active:scale-95 transition-all duration-200"
            >
                <i className="fa-solid fa-upload"></i>
                <span>Restore Data From File</span>
            </button>
        </>
    );
}
