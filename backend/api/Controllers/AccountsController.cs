using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        // GET: api/accounts/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAccounts(int userId)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var accounts = await _context.Account
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return Ok(accounts);
        }

        // PUT: api/accounts/{account_id}
        [HttpPut("{account_id}")]
        public async Task<IActionResult> UpdateAccount(int account_id, [FromBody] UpdateAccountDto updateAccountDto)
        {
            var account = await _context.Account.FindAsync(account_id);
            if (account == null)
            {
                return NotFound("Account not found.");
            }

            account.Name = updateAccountDto.Name;
            account.Type = updateAccountDto.Type;
            account.Balance = updateAccountDto.Balance;

            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(account);
        }

        // DELETE: api/accounts/{account_id}
        [HttpDelete("{account_id}")]
        public async Task<IActionResult> DeleteAccount(int account_id)
        {
            var account = await _context.Account.FindAsync(account_id);
            if (account == null)
            {
                return NotFound("Account not found.");
            }

            _context.Account.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
