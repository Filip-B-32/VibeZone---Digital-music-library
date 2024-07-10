using VibeZoneApp.Models;
using System.Collections.Generic;

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
    }
}