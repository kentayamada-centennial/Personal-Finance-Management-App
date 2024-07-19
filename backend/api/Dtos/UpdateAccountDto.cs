namespace api.Dtos
{
    public class UpdateAccountDto
    {
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required decimal Balance { get; set; }
    }
}
