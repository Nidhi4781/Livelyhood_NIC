using ClosedXML.Excel;

namespace livelihood.Models.ViewModel.DataTable
{
    public class ExcelExportManager
    {
        public static void Export(string sheetName, List<string> headings, List<DataTableRow> dataRows, string destinationFilePath)
        {
            using XLWorkbook workbook = new XLWorkbook();
            IXLWorksheet worksheet = workbook.Worksheets.Add(sheetName);

            foreach (string headingColumn in headings)
            {
                worksheet.Cell(1, headings.IndexOf(headingColumn) + 1).Value = headingColumn;
                worksheet.Row(1).Style.Font.Bold = true;
                worksheet.Row(1).Style.Alignment.WrapText = false;
            }

            int rowIndex = 1;

            foreach (var row in dataRows)
            {
                rowIndex++;
                int columnIndex = 0;

                foreach (string columnValue in row.Select(c => c != null ? c.ToString() : ""))
                {
                    columnIndex++;
                    worksheet.Cell(rowIndex, columnIndex).Value = columnValue;
                }
            }

            // Adjust column width
            worksheet.Columns().AdjustToContents();

            // Adjust row heights
            worksheet.Rows().AdjustToContents();

            workbook.SaveAs(destinationFilePath);
        }
    }
}
