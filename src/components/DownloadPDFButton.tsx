'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import WordSearchPDF from './WordSearchPDF';

interface DownloadPDFButtonProps {
  title: string;
  grid: string[][];
  words: string[];
}

const DownloadPDFButton = ({ title, grid, words }: DownloadPDFButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const doc = <WordSearchPDF title={title} grid={grid} words={words} />;
      const asPdf = pdf();
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-word-search.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading}>
      <Download className="w-4 h-4 mr-2" />
      {loading ? 'Preparing PDF...' : 'Download PDF'}
    </Button>
  );
};

export default dynamic(() => Promise.resolve(DownloadPDFButton), {
  ssr: false
});
