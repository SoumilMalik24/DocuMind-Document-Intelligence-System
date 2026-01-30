import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <Loader2 className="w-6 h-6 text-neon animate-spin" />
    </div>
  );
};

export default Loader;