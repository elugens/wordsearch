'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  cell: {
    width: '6.66%',
    height: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cccccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    padding: 2,
  },
  wordsTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  wordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
  },
});

interface WordSearchPDFProps {
  title: string;
  grid: string[][];
  words: string[];
}

const WordSearchPDF = ({ title, grid, words }: WordSearchPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.gridContainer}>
          <View style={styles.grid}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <View key={`${rowIndex}-${colIndex}`} style={styles.cell}>
                  <Text>{cell}</Text>
                </View>
              ))
            )}
          </View>
        </View>
        <Text style={styles.wordsTitle}>Words to Find:</Text>
        <View style={styles.wordsList}>
          {words.map((word, index) => (
            <View key={index} style={styles.word}>
              <Text>{word}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>WordSearch.diy - https://www.wordsearch.diy</Text>
      </Page>
    </Document>
  );
};

export default WordSearchPDF;
