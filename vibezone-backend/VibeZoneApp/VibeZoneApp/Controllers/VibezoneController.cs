using Microsoft.AspNetCore.Mvc;
using VibeZoneApp.Interfaces;
using VibeZoneApp.Models;
using System.Collections.Generic;
using VibeZoneApp.DTOs;

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

        [HttpPost("create")]
        [ProducesResponseType(201, Type = typeof(Artist))]
        [ProducesResponseType(400)]
        public IActionResult CreateArtist([FromBody] CreateArtistDto createArtistDto)
        {
            if (createArtistDto == null)
            {
                return BadRequest("CreateArtistDto object is null");
            }

            var artist = new Artist
            {
                Name = createArtistDto.Name,
                Albums = new List<Album>()
            };

            if (createArtistDto.Albums != null)
            {
                foreach (var albumDto in createArtistDto.Albums)
                {
                    var album = new Album
                    {
                        Title = albumDto.Title,
                        Description = albumDto.Description,
                        Songs = new List<Song>()
                    };

                    if (albumDto.Songs != null)
                    {
                        foreach (var songDto in albumDto.Songs)
                        {
                            var song = new Song
                            {
                                Title = songDto.Title,
                                Length = songDto.Length,
                                Album = album
                            };

                            album.Songs.Add(song);
                        }
                    }

                    album.Artist = artist;
                    artist.Albums.Add(album);
                }
            }

            _vibezoneRepository.CreateArtist(artist);

            if (!_vibezoneRepository.Save())
            {
                return StatusCode(500, "Error saving artist to database");
            }

            return CreatedAtAction(nameof(GetArtistById), new { id = artist.Id }, artist);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteArtist(int id)
        {
            var artistToDelete = _vibezoneRepository.GetArtistById(id);

            if (artistToDelete == null)
            {
                return NotFound();
            }

            _vibezoneRepository.DeleteArtist(id);

            return NoContent();
        }

        [HttpPut("update/artist")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateArtistName([FromBody] UpdateArtistNameDto updateDto)
        {
            var artist = _vibezoneRepository.GetArtistById(updateDto.Id);
            if (artist == null)
            {
                return NotFound();
            }

            _vibezoneRepository.UpdateArtistName(updateDto.Id, updateDto.NewName);
            return NoContent();
        }

        [HttpPut("update/album")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateAlbumTitle([FromBody] UpdateAlbumTitleDto updateDto)
        {
            var album = _vibezoneRepository.GetAlbumById(updateDto.Id);
            if (album == null)
            {
                return NotFound();
            }

            _vibezoneRepository.UpdateAlbumTitle(updateDto.Id, updateDto.NewTitle);
            return NoContent();
        }

        [HttpPut("update/song")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateSongTitle([FromBody] UpdateSongTitleDto updateDto)
        {
            var song = _vibezoneRepository.GetSongById(updateDto.Id);
            if (song == null)
            {
                return NotFound();
            }

            _vibezoneRepository.UpdateSongTitle(updateDto.Id, updateDto.NewTitle);
            return NoContent();
        }
    }
}