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

        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<object>))]
        public IActionResult Search([FromQuery] string? query) // Make query parameter optional
        {
            IEnumerable<object> results;

            if (string.IsNullOrWhiteSpace(query))
            {
                // If the search query is empty or whitespace, return all data
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
    }
}