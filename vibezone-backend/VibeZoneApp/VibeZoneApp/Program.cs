using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VibeZoneApp;
using VibeZoneApp.Data;
using VibeZoneApp.Interfaces;
using VibeZoneApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // URL of your React app localhost
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddTransient<Seed>();
builder.Services.AddScoped<IVibezoneRepository, VibezoneRepository>();

var app = builder.Build();

// Ensure database is created and seed data before the app starts
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DataContext>();
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        logger.LogInformation("Ensuring database is created...");
        context.Database.EnsureCreated();

        if (args.Length == 1 && args[0].ToLower() == "seeddata")
        {
            logger.LogInformation("Seeding database...");
            var seeder = services.GetRequiredService<Seed>();
            seeder.SeedDataContext().Wait();
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while creating or seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
