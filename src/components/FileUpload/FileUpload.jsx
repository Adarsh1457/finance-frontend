import { useRef, useState } from 'react';

export default function FileUpload({ onFileSelected }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div
      className={`dropzone ${dragActive ? 'active' : ''}`}
      onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="presentation"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(event) => event.target.files?.[0] && onFileSelected(event.target.files[0])}
        hidden
      />
      <strong>Drop CSV or Excel file here</strong>
      <span>or click to browse</span>
    </div>
  );
}