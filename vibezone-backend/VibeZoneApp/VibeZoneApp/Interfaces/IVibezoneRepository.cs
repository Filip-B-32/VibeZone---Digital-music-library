using VibeZoneApp.Models;

namespace VibeZoneApp.Interfaces
{
    public interface IVibezoneRepository
    {
        ICollection<Artist> GetArtists();
        ICollection<object> Search(string query);
    }
}
