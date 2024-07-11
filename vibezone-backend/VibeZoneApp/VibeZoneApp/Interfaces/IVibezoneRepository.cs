using VibeZoneApp.Models;

namespace VibeZoneApp.Interfaces
{
    public interface IVibezoneRepository
    {
        ICollection<Artist> GetArtists();
        ICollection<object> Search(string query);
        ICollection<object> GetAllData();
        Artist GetArtistById(int id);
        Album GetAlbumById(int id);
        Song GetSongById(int id);
        void CreateArtist(Artist artist);
        void DeleteArtist(int id);
        void UpdateArtistName(int id, string newName);
        void UpdateAlbumTitle(int id, string newTitle);
        void UpdateSongTitle(int id, string newTitle);
        bool Save();
    }
}