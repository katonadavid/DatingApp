using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDTO
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}