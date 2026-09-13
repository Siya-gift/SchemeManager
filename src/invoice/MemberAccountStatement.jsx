import { PDFViewer, Document, Page, View, Text, Line, Svg } from "@react-pdf/renderer";
import { styles } from "./style";
import React from 'react';

// 1. Move helper calculations out or accept them as props to keep the PDF template pure
const InvoicePDF = ({ PDFdata, selectedSchemeName, PDFMemberdata, totalExpected, totalRecorded, arrearsBalance, formatZAR }) => (
  <Document title={`${PDFdata[0]?.userName}_Statement_${PDFdata[0]?.year}`} fileName={`${PDFdata[0]?.userName}_Statement_${PDFdata[0]?.year}`}>
    <Page size="A4" style={styles.page}>
      {/* Header section matching Statement_Crok_2026.pdf */}
      <View style={styles.header}>
        <Text style={styles.title} color="#4f46e5">
          {selectedSchemeName}
        </Text>
        <Text style={styles.subtitle}>MEMBER ACCOUNT STATEMENT</Text>
      </View>

      <Svg viewBox="0 0 0 0" width="100%" height="40" xmlns="http://w3.org">
        <Line x1="0" y1="8" x2="2000" y2="8" stroke="#c9c2b6" strokeWidth="1" />
      </Svg>

      {/* Metadata */}
      <View style={styles.metaData}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Report Period:</Text>
          <Text style={styles.metaCell}>FY {PDFdata[0]?.year}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Generated on:</Text>
          <Text style={styles.metaCell}>
            {new Date().toLocaleDateString("en-ZA", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Beneficiary:</Text>
          <Text style={styles.metaCell}>{PDFdata[0]?.userName}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Current Account Status:</Text>
          <Text style={styles.metaCell}>{PDFMemberdata.status}</Text>
        </View>
      </View>

      <Svg viewBox="0 0 0 0" width="100%" height="40" xmlns="http://w3.org">
        <Line x1="0" y1="8" x2="2000" y2="8" stroke="#c9c2b6" strokeWidth="1" />
      </Svg>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Cycle</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Method</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
        </View>

        {PDFdata[0]?.yearHistory?.length > 0 ? (
          PDFdata[0].yearHistory.map((payment, idx) =>
            payment ? (
              <View style={styles.tableRow} key={idx}>
                {/* 1. Full Date */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {payment?.date
                      ? new Date(payment.date).toLocaleDateString("en-ZA", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })
                      : "-"}
                  </Text>
                </View>

                {/* 2. Dynamic Month */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {payment?.date
                      ? new Date(payment.date).toLocaleDateString("en-ZA", {
                        month: "long",
                      })
                      : "-"}
                  </Text>
                </View>

                {/* 3. Description */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {payment?.description || "Monthly Contribution"}
                  </Text>
                </View>

                {/* 4. Details */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {payment?.details || payment?.method || "-"}
                  </Text>
                </View>

                {/* 5. Currency Amount (ZAR) */}
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {payment?.amount !== undefined
                      ? `R ${Number(payment.amount).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "R 0.00"}
                  </Text>
                </View>
              </View>
            ) : null,
          )
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: 20,
            }}
          >
            <Text
              style={{ color: "#6B7280", fontSize: 16, textAlign: "center" }}
            >
              No Transactions Found
            </Text>
          </View>
        )}
      </View>

      <Svg viewBox="0 0 0 0" width="100%" height="40" xmlns="http://w3.org">
        <Line x1="0" y1="8" x2="2000" y2="8" stroke="#c9c2b6" strokeWidth="1" />
      </Svg>

      {/* Annual Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryHeader}>Annual Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Payments Expected (to date):</Text>
          <Text style={styles.summaryValue}>{formatZAR(totalExpected)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Payments Recorded:</Text>
          <Text style={styles.summaryValue}>{formatZAR(totalRecorded)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Arrears Balance:</Text>
          <Text style={[styles.summaryValue, arrearsBalance > 0 && { color: 'red' }]}>
            {formatZAR(arrearsBalance)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text>Generated by Scheme Manager Pro - Official Member Statement</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </Page>
  </Document>
);

export default function MemberAccountStatement({
  PDFdata,
  selectedSchemeName,
  PDFMemberdata
}) {

  // 1. Safely extract member details
  const member = PDFdata?.[0] || {};
  const totalRecorded = member.yearHistory?.reduce((sum, payment) => sum + parseInt(payment.amount || 0), 0) || 0;

  // 2. Fallback dependencies to prevent breakdowns if structural mappings vary
  const joinedDateStr = PDFMemberdata?.joinedDate
  const monthlyFee = PDFMemberdata?.transactions[0]?.amount || member.transactions?.[0]?.amount || 500;

  // 3. Dynamic Date Calculations (Vanilla JS)
  const calculateExpected = () => {
    const today = new Date();
    const joined = new Date(joinedDateStr);

    if (joined > today) return 0;

    // Calculate difference in months
    const yearDiff = today.getFullYear() - joined.getFullYear();
    const monthDiff = today.getMonth() - joined.getMonth();
    let totalMonths = (yearDiff * 12) + monthDiff;

    // If today's day of the month hasn't reached the billing day yet, subtract a month
    if (today.getDate() < joined.getDate()) {
      totalMonths--;
    }

    // Include the first month (signup day payment)
    const expectedCycles = totalMonths + 1;
    return expectedCycles * monthlyFee;
  };

  const totalExpected = calculateExpected();
  const arrearsBalance = Math.max(0, totalExpected - totalRecorded);

  // 4. Currency Formatter for ZAR (en-ZA)
  const formatZAR = (value) => 
    value.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

  return (
    <div className="w-full h-full">
      <PDFViewer width="100%" height="100%">
        <InvoicePDF 
          PDFdata={PDFdata}
          selectedSchemeName={selectedSchemeName}
          PDFMemberdata={PDFMemberdata}
          totalExpected={totalExpected}
          totalRecorded={totalRecorded}
          arrearsBalance={arrearsBalance}
          formatZAR={formatZAR}
        />
      </PDFViewer>
    </div>
  );
}
