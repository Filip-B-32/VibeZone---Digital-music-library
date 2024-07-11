namespace VibeZoneApp.DTOs
{
    public class CreateArtistDto
    {
        public string Name { get; set; }
        public List<AlbumDto> Albums { get; set; }
    }

    public class AlbumDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<SongDto> Songs { get; set; }
    }

    public class SongDto
    {
        public string Title { get; set; }
        public string Length { get; set; }
    }

    public class UpdateArtistNameDto
    {
        public int Id { get; set; }
        public string NewName { get; set; }
    }

    public class UpdateAlbumTitleDto
    {
        public int Id { get; set; }
        public string NewTitle { get; set; }
    }

    public class UpdateSongTitleDto
    {
        public int Id { get; set; }
        public string NewTitle { get; set; }
    }
}
