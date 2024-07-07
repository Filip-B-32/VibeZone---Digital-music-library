using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using VibeZoneApp.Data;
using VibeZoneApp.Models;
using Microsoft.Extensions.Hosting;

namespace VibeZoneApp
{
    public class Seed
    {
        private readonly DataContext _dataContext;
        private readonly IWebHostEnvironment _environment;

        public Seed(DataContext context, IWebHostEnvironment environment)
        {
            _dataContext = context;
            _environment = environment;
        }

        public async Task SeedDataContext()
        {
            if (!await _dataContext.Artists.AnyAsync())
            {
                var filePath = Path.Combine(_environment.ContentRootPath, "InitialDataSeed", "data.json");
                var jsonData = await File.ReadAllTextAsync(filePath);
                var deserializedData = JsonConvert.DeserializeObject<List<Artist>>(jsonData);

                if (deserializedData != null)
                {
                    _dataContext.Artists.AddRange(deserializedData);
                    await _dataContext.SaveChangesAsync();
                }
            }
        }
    }
}
