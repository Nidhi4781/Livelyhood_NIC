using System.Collections.Generic;
namespace livelihood.Models.ViewModel
{
    public class DataTableResponse
    {
        public int sEcho { get; set; }

        public int iDisplayLength { get; set; }

        public int iDisplayStart { get; set; }

        public long iTotalRecords { get; set; }

        public long iTotalDisplayRecords { get; set; }

        public decimal Total { get; set; }

        public List<DataTableRow> aaData { get; set; }


    }

    public class DataTableRow : List<object>
    {

    }
}
