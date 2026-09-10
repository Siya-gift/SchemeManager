import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { styles } from "./style";

const InvoicePDF = () => (
  <Document title="Statement_Sam_2026">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section2</Text>
      </View>
    </Page>
  </Document>
);

export default function MemberAccountStatement() {
  return (
    <div className="w-full h-full">
      <PDFViewer width="100%" height="100%">
        <InvoicePDF />
      </PDFViewer>
    </div>
  );
};
