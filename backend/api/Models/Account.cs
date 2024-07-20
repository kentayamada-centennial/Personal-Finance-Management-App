namespace api.Models
{
    public class Account
    {
        public int AccountId { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required decimal Balance { get; set; }
        public required int UserId { get; set; }
    }
}
