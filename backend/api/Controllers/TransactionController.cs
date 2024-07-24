using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context) {
            _context = context;
        }

        // POST: api/transactions/
        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] CreateTransactionDto createTransactionDto) {
            var account = await _context.Account.FindAsync(createTransactionDto.AccountId);
            if (account == null) {
                return NotFound("Account not found.");
            }

            var transaction = new Transaction {
                Amount = createTransactionDto.Amount,
                Type = createTransactionDto.Type,
                Category = createTransactionDto.Category,
                Description = createTransactionDto.Description,
                Date = createTransactionDto.Date,
                AccountId = createTransactionDto.AccountId
            };

            _context.Transaction.Add(transaction);

            account.Balance += transaction.Amount;

            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        // GET: api/transactions/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions(int userId) {
            var transactions = await _context.Transaction
                .Where(t => _context.Account.Any(a => a.AccountId == t.AccountId && a.UserId == userId))
                .Select(t => new TransactionDto {
                    TransactionId = t.TransactionId,
                    Amount = t.Amount,
                    Type = t.Type,
                    Category = t.Category,
                    Description = t.Description,
                    Date = t.Date,
                    AccountId = t.AccountId
                })
                .ToListAsync();

            return Ok(transactions);
        }

        // PUT: api/transactions/{transaction_id}
        [HttpPut("{transaction_id}")]
        public async Task<IActionResult> UpdateTransaction(int transaction_id, [FromBody] UpdateTransactionDto updateTransactionDto) {

            var transaction = await _context.Transaction.FindAsync(transaction_id);
            if (transaction == null) {
                return NotFound("Transaction not found.");
            }
            var account = await _context.Account.FindAsync(updateTransactionDto.AccountId);
            if (account == null) {
                return NotFound("Account not found.");
            }

            account.Balance -= transaction.Amount;
            transaction.Amount = updateTransactionDto.Amount;
            transaction.Type = updateTransactionDto.Type;
            transaction.Category = updateTransactionDto.Category;
            transaction.Description = updateTransactionDto.Description;
            transaction.AccountId = updateTransactionDto.AccountId;
            transaction.Date = updateTransactionDto.Date;
            account.Balance += transaction.Amount;

            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        // DELETE: api/transactions/{transaction_id}
        [HttpDelete("{transaction_id}")]
        public async Task<IActionResult> DeleteTransaction(int transaction_id) {
            var transaction = await _context.Transaction.FindAsync(transaction_id);
            if (transaction == null) {
                return NotFound("Transaction not found.");
            }

            _context.Transaction.Remove(transaction);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}