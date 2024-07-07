namespace VibeZoneApp.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Album> Albums { get; set; }
    }
}
