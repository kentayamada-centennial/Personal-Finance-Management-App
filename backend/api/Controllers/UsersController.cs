using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            if (await _context.User.AnyAsync(u => u.Email == registerUserDto.Email))
            {
                return BadRequest("Email already in use.");
            }

            User user = new()
            {
                Email = registerUserDto.Email,
                Password = registerUserDto.Password,
                Name = registerUserDto.Name
            };

            _ = _context.User.Add(user);
            _ = await _context.SaveChangesAsync();

            UserResponseDto userResponseDto = new()
            {
                UserId = user.UserId,
                Email = user.Email,
                Name = user.Name
            };

            return CreatedAtAction(nameof(Register), new { id = user.UserId }, userResponseDto);
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            User? existingUser = await _context.User
                .FirstOrDefaultAsync(u => u.Email == loginUserDto.Email && u.Password == loginUserDto.Password);

            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            UserResponseDto userResponseDto = new()
            {
                UserId = existingUser.UserId,
                Email = existingUser.Email,
                Name = existingUser.Name
            };

            return Ok(userResponseDto);
        }
    }
}
