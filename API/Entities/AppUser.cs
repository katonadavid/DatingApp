namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] SaltHash { get; set; }
        public string UserName { get; set; }
    }
}