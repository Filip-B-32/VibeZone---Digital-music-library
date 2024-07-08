namespace VibeZoneApp.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Song> Songs { get; set; }
        public string Description { get; set; }
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }
    }
}