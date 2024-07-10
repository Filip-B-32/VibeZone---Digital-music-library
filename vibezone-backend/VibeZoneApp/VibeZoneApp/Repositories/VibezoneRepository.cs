using Microsoft.EntityFrameworkCore;
using VibeZoneApp.Models;
using VibeZoneApp.Interfaces;
using VibeZoneApp.Data;
using System.Collections.Generic;
using System.Linq;

namespace VibeZoneApp.Repositories
{
    public class VibezoneRepository : IVibezoneRepository
    {
        private readonly DataContext _context;

        public VibezoneRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Artist> GetArtists()
        {
            return _context.Artists
                .Include(a => a.Albums)
                .ThenInclude(al => al.Songs)
                .ToList();
        }

        public ICollection<object> Search(string query)
        {
            var artists = _context.Artists
                .Where(a => a.Name.Contains(query))
                .Select(a => new { a.Id, a.Name, Type = "Artist" })
                .ToList();

            var albums = _context.Albums
                .Where(al => al.Title.Contains(query))
                .Select(al => new { al.Id, al.Title, Type = "Album" })
                .ToList();

            var songs = _context.Songs
                .Where(s => s.Title.Contains(query))
                .Select(s => new { s.Id, s.Title, Type = "Song" })
                .ToList();

            return artists.Concat<object>(albums).Concat(songs).ToList();
        }

        public ICollection<object> GetAllData()
        {
            var artists = _context.Artists
                .Select(a => new { a.Id, a.Name, Type = "Artist" })
                .ToList();

            var albums = _context.Albums
                .Select(al => new { al.Id, al.Title, Type = "Album" })
                .ToList();

            var songs = _context.Songs
                .Select(s => new { s.Id, s.Title, Type = "Song" })
                .ToList();

            return artists.Concat<object>(albums).Concat(songs).ToList();
        }
    }
}