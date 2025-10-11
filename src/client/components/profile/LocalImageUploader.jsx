import React, { useRef, useState } from 'react'
import { saveImageToLocal } from '../../utils/Members'

export default function LocalImageUploader({memberId,onSaveSuccess}) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef(null)

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }

        if (!file.type.startsWith("image/")) {
            setError("Please select and image file")
            return
        }

        setIsProcessing(true)
        setError("")

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const base64Image = reader.result
            const response = saveImageToLocal(memberId, base64Image)
            
            if (response.success) {
                    onSaveSuccess(base64Image)
            } else {
                setError(response.error)
            }

            setIsProcessing(false)

        
        }

        reader.onerror = () => {
            setError("Failed to read the file")
            setIsProcessing(false)
        }



    }

  return (
    <div className="mt-2 border-t border-black pt-4">
      <div className="font-mono text-[11px] tracking-wider mb-2">
        &gt; SET_AVATAR (ONCE)
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png, image/jpeg"
        className="hidden" // The input is hidden, we trigger it with the button
      />
      <button
        onClick={() => fileInputRef.current.click()} // Click the hidden input
        disabled={isProcessing}
        className="w-full text-center py-2 border border-black bg-white text-black font-mono text-sm tracking-widest hover:bg-neutral-100 transition-colors disabled:opacity-50"
      >
        {isProcessing ? "PROCESSING..." : "CHOOSE_IMAGE"}
      </button>
      {error && <p className="text-red-600 text-xs font-mono mt-2">{error}</p>}
    </div>
  );
}
