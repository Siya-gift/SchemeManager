import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#374151',
  },
  headerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5',
    paddingBottom: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#4f46e5',
    marginTop: 4,
    fontWeight: 'medium',
  },
  metaContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#6b7280',
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },
  card: {
    width: '31%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  cardTitle: {
    fontSize: 8,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 5,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
    minHeight: 30,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
    minHeight: 28,
  },
  th: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    padding: 6,
  },
  td: {
    fontSize: 9,
    padding: 6,
    color: '#4b5563',
  },
  colName: { width: '30%' },
  colStatus: { width: '20%' },
  colBehind: { width: '25%' },
  colOwed: { width: '25%', textAlign: 'right' },
  badgeArrears: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#9ca3af',
    fontSize: 8,
  },
    badgeArrears: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  badgeAhead: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  badgePaidUp: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  textGreen: {
    color: '#059669',
  },
  textRed: {
    color: '#dc2626',
  },
  textBlue: {
    color: '#2563eb',
  }

});

// The base Document view component
export const ReportDocument = ({ data, totalOutstanding, complianceRate, totalBeneficiaries, selectedSchemeName }) => (
  <Document title={`${selectedSchemeName}_Executive_Financial_Report`} fileName={`${selectedSchemeName}_Executive_Financial_Report`}>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Executive Summary</Text>
        <Text style={styles.subtitle}>{selectedSchemeName}</Text>
        <View style={styles.metaContainer}>
          <Text>Financial Year: 2026 | Current Period: September</Text>
          <Text>Report Date: 13/09/2026, 20:01:08</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>1. Financial Performance</Text>
      <View style={styles.gridContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opening Balance (recorded)</Text>
          <Text style={styles.cardValue}>R 0</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Member Collections (YTD)</Text>
          <Text style={styles.cardValue}>R 0</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Net Fund Position</Text>
          <Text style={styles.cardValue}>R 0</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>2. Compliance & Arrears</Text>
      <View style={styles.gridContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Beneficiaries</Text>
          <Text style={styles.cardValue}>{totalBeneficiaries}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Compliance Rate</Text>
          <Text style={styles.cardValue}>{complianceRate}%</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Outstanding Contributions</Text>
          <Text style={styles.cardValue}>
            {totalOutstanding.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>3. High Priority Follow-ups</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.th, styles.colName]}>Member Name</Text>
          <Text style={[styles.th, styles.colStatus]}>Status</Text>
          <Text style={[styles.th, styles.colBehind]}>Behind</Text>
          <Text style={[styles.th, styles.colOwed]}>Shortfall</Text>
        </View>
        
        {data.map((member, index) => {
  // Determine financial status based on the shortfall amount
  const isAhead = member.amountOwed < 0;
  const isPaidUp = member.amountOwed === 0;

  // Determine the styling based on balance condition
  let statusBadgeStyle = styles.badgeArrears;
  let textAmountStyle = styles.textRed;
  let statusLabel = member.status || 'Arrears';

  if (isAhead) {
    statusBadgeStyle = styles.badgeAhead;
    textAmountStyle = styles.textGreen;
    statusLabel = 'Ahead';
  } else if (isPaidUp) {
    statusBadgeStyle = styles.badgePaidUp;
    textAmountStyle = styles.textBlue;
    statusLabel = 'Paid Up';
  }

  return (
    <View style={styles.tableRow} key={index}>
      <Text style={[styles.td, styles.colName]}>{member.memberName}</Text>
      
      {/* 1. Status Column with dynamic theme background shapes */}
      <View style={[styles.td, styles.colStatus]}>
        <Text style={statusBadgeStyle}>{statusLabel}</Text>
      </View>
      
      {/* 2. Months Behind calculation adjusting safely for credit statuses */}
      <Text style={[styles.td, styles.colBehind]}>
        {isAhead || isPaidUp ? '0.0 mo' : `${member.monthsBehind.toFixed(1)} mo`}
      </Text>
      
      {/* 3. Shortfall Column removing negative signs and styling accordingly */}
      <Text style={[styles.td, styles.colOwed, textAmountStyle]}>
        {isAhead ? (
          `${Math.abs(member.amountOwed).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}`
        ) : isPaidUp ? (
          'R 0,00'
        ) : (
          member.amountOwed.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })
        )}
      </Text>
    </View>
  );
})}

      </View>

      <View style={styles.footer} fixed>
        <Text>Scheme Manager Pro - Executive Financial Reporting</Text>
        <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </Page>
  </Document>
);

// Main Component Default Export using the interactive browser `<PDFViewer>`
export default function SchemeSummaryReport(props) {
  return (
    <div className="w-full h-full  rounded-xl overflow-hidden shadow-inner">
      <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
        <ReportDocument {...props} />
      </PDFViewer>
    </div>
  );
}
