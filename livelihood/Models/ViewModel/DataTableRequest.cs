namespace livelihood.Models.ViewModel
{
    public class DataTableRequest
    {
        public int sEcho { get; set; }

        public int iDisplayLength { get; set; }

        public int iDisplayStart { get; set; }

        public string sSearch { get; set; }

        public int iSortCol_0 { get; set; }

        public string sSortDir_0 { get; set; }
    }
}
