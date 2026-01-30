import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { uploadDocument } from '../services/api'; // Import your API function
import Loader from '../components/Loader';

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setError('');
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      await uploadDocument(file);
      // On success, redirect to chat
      navigate('/chat');
    } catch (err) {
      console.error(err);
      setError('Failed to upload. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center shadow-2xl">
        
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-neon/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,153,0.2)]">
            <FileText className="w-8 h-8 text-neon" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">Upload your PDF</h2>
        <p className="text-gray-400 mb-8 text-sm">
          DocuMind will analyze your document and allow you to chat with it instantly.
        </p>

        {/* Custom File Input */}
        <div className="relative mb-6">
          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden" 
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-neon/50 hover:bg-white/5 transition-all"
          >
            {file ? (
              <span className="text-neon font-medium flex items-center gap-2">
                <FileText size={16} />
                {file.name}
              </span>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="mb-2" />
                <span className="text-sm">Click to select PDF</span>
              </div>
            )}
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full py-3 rounded-xl font-bold transition-all flex justify-center items-center
            ${!file || loading 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-neon text-black hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] hover:scale-[1.02]'
            }`}
        >
          {loading ? <Loader /> : 'Analyze Document'}
        </button>

      </div>
    </div>
  );
};

export default Home;