import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
    color: "#4f46e5",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#3a3a3a7e",
  },
  metaData: {
    marginBottom: 20,
    fontSize: 10,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  metaCell: {
    color:"#88898a",
  },
  metaLabel: {
    width: 150,
    fontFamily: "Helvetica-Bold",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#abb5eb",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  summary: {
    marginTop: 10,
    fontSize: 10,
  },
  summaryHeader: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    color: "#4f46e5",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    width: 200,
    fontFamily: "Helvetica-Bold",
  },
  summaryValue: {
    fontFamily: "Helvetica-Bold",
    color:"#88898a",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "gray",
  },
});