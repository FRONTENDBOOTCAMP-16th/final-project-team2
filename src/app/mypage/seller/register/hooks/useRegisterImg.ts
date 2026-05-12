import { useState } from 'react'

export default function useRegisterImg() {
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [imgKey, setImgKey] = useState(0)

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImgFile(file)
    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
    setImgKey((prev) => prev + 1)
  }

  const resetImg = () => {
    setImgFile(null)
    setPreview(null)
    setFileName('')
    setImgKey((prev) => prev + 1)
  }

  return { imgFile, preview, handleChangeImg, resetImg, fileName, imgKey }
}
