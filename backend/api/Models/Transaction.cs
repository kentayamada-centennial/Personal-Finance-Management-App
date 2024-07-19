namespace api.Models
{
    public class Transaction
    {
        public required int TransactionId { get; set; }
        public required decimal Amount { get; set; }
        public required DateTime Date { get; set; }
        public required string Type { get; set; }
        public required string Category { get; set; }
        public required string Description { get; set; }
        public required int AccountId { get; set; }
        public required Account Account { get; set; }
    }
}
