import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";
import { styles } from "./style";

const InvoicePDF = ({ PDFdata, selectedSchemeName, PDFMemberdata }) => (
  <Document title={`${PDFdata[0]?.userName}_Statement_${PDFdata[0]?.year}`}>
    <Page size="A4" style={styles.page}>
      {/* Header section matching Statement_Crok_2026.pdf */}
      <View style={styles.header}>
        <Text style={styles.title} color="#4f46e5">
          {selectedSchemeName}
        </Text>
        <Text style={styles.subtitle}>MEMBER ACCOUNT STATEMENT</Text>
      </View>

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

        {/* Sample rows totalling the R 1500,00 paid shown in your dashboard */}
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
                    {payment?.details || "-"}
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
          /* Safe fallback that spans the layout appropriately */
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

      {/* Annual Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryHeader}>Annual Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Total Payments Expected (to date):
          </Text>
          {/* Example expected based on R 500/mo */}
          <Text style={styles.summaryValue}>R 2 000,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Payments Recorded:</Text>
          <Text style={styles.summaryValue}>R 1 500,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Arrears Balance:</Text>
          <Text style={styles.summaryValue}>R 500,00</Text>
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
  return (
    <>
      <div className="w-full h-full">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF
            PDFdata={PDFdata}
            selectedSchemeName={selectedSchemeName}
            PDFMemberdata={PDFMemberdata}
          />
        </PDFViewer>
      </div>
      <div>
        <button>Download PDF</button>
      </div>
    </>
  );
}
