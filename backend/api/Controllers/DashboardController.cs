using api.Data;
using api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/dashboard
        [HttpGet]
        public async Task<IActionResult> GetDashboard([FromQuery] int userId)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var accounts = await _context.Account.Where(a => a.UserId == userId).ToListAsync();
            var transactions = await _context.Transaction
                .Where(t => accounts.Select(a => a.AccountId).Contains(t.AccountId))
                .OrderByDescending(t => t.Date)
                .Take(5)
                .ToListAsync();

            var totalIncome = transactions.Where(t => t.Type == "income").Sum(t => t.Amount);
            var totalExpenses = transactions.Where(t => t.Type == "expense").Sum(t => t.Amount);
            var balance = accounts.Sum(a => a.Balance);

            var recentTransactions = transactions.Select(t => new TransactionDto
            {
                TransactionId = t.TransactionId,
                Amount = t.Amount,
                Type = t.Type,
                Category = t.Category,
                Description = t.Description,
                Date = t.Date
            }).ToList();

            var dashboardSummary = new DashboardSummaryDto
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                Balance = balance,
                RecentTransactions = recentTransactions
            };

            return Ok(dashboardSummary);
        }
    }
}
