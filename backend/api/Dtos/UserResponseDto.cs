namespace api.Dtos
{
    public class UserResponseDto
    {
        public required int UserId { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
    }
}
