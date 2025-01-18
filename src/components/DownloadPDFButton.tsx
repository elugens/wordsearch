'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import WordSearchPDF from './WordSearchPDF';
import NumberSearchPDF from './NumberSearchPDF';

interface BaseDownloadPDFButtonProps {
  title: string;
  grid: string[][];
}

interface WordSearchDownloadProps extends BaseDownloadPDFButtonProps {
  type: 'word';
  words: string[];
}

interface NumberSearchDownloadProps extends BaseDownloadPDFButtonProps {
  type: 'number';
  numbers: number[];
  equations?: { equation: string; result: number; }[];
}

type DownloadPDFButtonProps = WordSearchDownloadProps | NumberSearchDownloadProps;

const DownloadPDFButton = (props: DownloadPDFButtonProps) => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = useCallback(async (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownload = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const pdfDoc = props.type === 'word' 
        ? <WordSearchPDF title={props.title} grid={props.grid} words={props.words} />
        : <NumberSearchPDF 
            title={props.title} 
            grid={props.grid} 
            numbers={props.numbers} 
            equations={props.equations}
          />;
      
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const filename = `${props.title.toLowerCase().replace(/\s+/g, '-')}-${props.type}-search.pdf`;
      
      await downloadPDF(url, filename);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  }, [props, loading, downloadPDF]);

  return (
    <Button onClick={handleDownload} disabled={loading}>
      {loading ? 'Generating PDF...' : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
};

const DynamicDownloadPDFButton = dynamic(
  () => Promise.resolve(DownloadPDFButton),
  { 
    ssr: false,
    loading: () => (
      <Button disabled>
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
    )
  }
);

export default DynamicDownloadPDFButton;
