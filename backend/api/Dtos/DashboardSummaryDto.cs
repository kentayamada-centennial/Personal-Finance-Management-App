namespace api.Dtos
{
    public class DashboardSummaryDto
    {
        public required decimal TotalIncome { get; set; }
        public required decimal TotalExpenses { get; set; }
        public required decimal Balance { get; set; }
        public required List<TransactionDto> RecentTransactions { get; set; }
    }
}
