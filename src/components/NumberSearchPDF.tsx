import React from 'react';
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
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  equationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  equation: {
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
    minWidth: '30%',
  },
  numbersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  number: {
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
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

interface NumberSearchPDFProps {
  title: string;
  grid: string[][];
  numbers: number[];
  equations?: { equation: string; result: number; }[];
}

const NumberSearchPDF = ({ title, grid, numbers, equations }: NumberSearchPDFProps) => {
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
        
        {equations ? (
          <>
            <Text style={styles.subtitle}>Solve these equations to find the numbers:</Text>
            <View style={styles.equationsContainer}>
              {equations.map((eq, index) => (
                <View key={index} style={styles.equation}>
                  <Text>{eq.equation}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Numbers to Find:</Text>
            <View style={styles.numbersList}>
              {numbers.map((number, index) => (
                <View key={index} style={styles.number}>
                  <Text>{number}</Text>
                </View>
              ))}
            </View>
          </>
        )}
        <Text style={styles.footer}>WordSearch.diy - https://www.wordsearch.diy</Text>
      </Page>
    </Document>
  );
};

export default NumberSearchPDF;
