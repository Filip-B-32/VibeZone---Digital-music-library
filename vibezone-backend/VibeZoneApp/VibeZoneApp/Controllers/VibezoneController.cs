using Microsoft.AspNetCore.Mvc;
using VibeZoneApp.Interfaces;
using VibeZoneApp.Models;
using System.Collections.Generic;

namespace VibeZoneApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VibezoneController : ControllerBase
    {
        private readonly IVibezoneRepository _vibezoneRepository;

        public VibezoneController(IVibezoneRepository vibezoneRepository)
        {
            _vibezoneRepository = vibezoneRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Artist>))]
        public IActionResult GetArtists()
        {
            var artists = _vibezoneRepository.GetArtists();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(artists);
        }

        [HttpGet("getAllData")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<object>))]

        public IActionResult GetAllData()
        {
            var data = _vibezoneRepository.GetAllData();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(data);
        }

        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<object>))]
        public IActionResult Search([FromQuery] string? query)
        {
            IEnumerable<object> results;

            if (string.IsNullOrWhiteSpace(query))
            {
                results = _vibezoneRepository.GetAllData();
            }
            else
            {
                results = _vibezoneRepository.Search(query);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(results);
        }

        [HttpGet("getArtist/{id}")]
        [ProducesResponseType(200, Type = typeof(Artist))]
        [ProducesResponseType(404)]
        public IActionResult GetArtistById(int id)
        {
            var artist = _vibezoneRepository.GetArtistById(id);

            if (artist == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(artist);
        }

        [HttpGet("getAlbum/{id}")]
        [ProducesResponseType(200, Type = typeof(Album))]
        [ProducesResponseType(404)]
        public IActionResult GetAlbumById(int id)
        {
            var album = _vibezoneRepository.GetAlbumById(id);

            if (album == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(album);
        }


        [HttpGet("getSong/{id}")]
        [ProducesResponseType(200, Type = typeof(Song))]
        [ProducesResponseType(404)]
        public IActionResult GetSongById(int id)
        {
            var song = _vibezoneRepository.GetSongById(id);

            if (song == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(song);
        }
    }
}