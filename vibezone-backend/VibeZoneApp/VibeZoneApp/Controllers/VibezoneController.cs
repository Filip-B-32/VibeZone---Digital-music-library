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
    }
}