using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using landmark_remark.Data.Entities;
using landmark_remark.Data.Repository;

namespace landmark_remark.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkersController : ControllerBase
    {
        private readonly IMarkerRepositoryAsync _repo;

        public MarkersController(IMarkerRepositoryAsync repo)
        {
            _repo = repo;
        }

        // GET: api/Markers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Marker>>> GetMarkers()
        {
            return Ok(await _repo.GetAsync());
        }

        // GET: api/Markers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Marker>> GetMarker(string id)
        {   
            var marker = await _repo.GetByIdAsync(id);

            if (marker == null)
            {
                return NotFound();
            }

            return Ok(marker);
        }


        // POST: api/Markers
        [HttpPost]
        public async Task<ActionResult<Marker>> PostMarker(Marker marker)
        {
            try
            {
                await _repo.AddAsync(marker);
            }
            catch (DbUpdateException)
            {
                if (await MarkerExists(marker.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMarker", new { id = marker.Id }, marker);
        }

        private async Task<bool> MarkerExists(int id)
        {
            var marker = await _repo.GetByIdAsync(id.ToString());
            return marker != null;
        }
    }
}
