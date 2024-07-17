using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/accounts/{userId}
        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateAccount(int userId, [FromBody] CreateAccountDto createAccountDto)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var account = new Account
            {
                Name = createAccountDto.Name,
                Type = createAccountDto.Type,
                Balance = createAccountDto.Balance,
                UserId = userId
            };

            _context.Account.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateAccount), new { id = account.AccountId }, account);
        }
    }
}
