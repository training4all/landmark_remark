using landmark_remark.Data.Entities;

namespace landmark_remark.Data.Repository
{
    public class MarkerRepositoryAsync : RepositoryAsync<Marker>, IMarkerRepositoryAsync
    {
        public MarkerRepositoryAsync(LandmarkRemarkContext context) : base(context)
        {}
    }
}
