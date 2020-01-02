using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using Xunit;

using landmark_remark.Controllers;
using landmark_remark.Data.Entities;
using landmark_remark.Data.Repository;

namespace landmark_remark.tests.Controllers
{
    public class MarkersControllerTests
    {
        private readonly IMarkerRepositoryAsync _repo;
        private readonly MarkersController _controller;

        public MarkersControllerTests()
        {
            _repo = Substitute.For<IMarkerRepositoryAsync>();
            _controller = new MarkersController(_repo);
        }

        [Theory]
        [MemberData(nameof(MarkersTestDataGenerator.GetMarkersForPostAction), MemberType = typeof(MarkersTestDataGenerator))]
        public async Task PostMarker(Marker newMarker, Marker existingMarker, bool throwException, Type actionResultType)
        {
            // Arrange
            if (throwException)
                _repo.AddAsync(Arg.Any<Marker>()).Returns(x => throw new DbUpdateException());
            else
                _repo.AddAsync(Arg.Any<Marker>()).Returns(Task.FromResult<Marker>((Marker)newMarker));

            _repo.GetByIdAsync(Arg.Any<string>()).Returns(Task.FromResult<Marker>(existingMarker));
            
            // Act and Assert
            if (actionResultType == typeof(Exception))
            {
                // Assert
                await Assert.ThrowsAnyAsync<Exception>(async () => await _controller.PostMarker(newMarker));
            }
            else
            {
                // Act
                var sut = await _controller.PostMarker(newMarker);

                // Assert
                Assert.Equal(sut.Result.GetType(), actionResultType);
            }
        }

        [Theory]
        [ClassData(typeof(MarkersTestDataGenerator))]
        public async Task GetMarker(Marker getReturnData, Type actionResultType)
        {
            // Arrange
            _repo.GetByIdAsync(Arg.Any<string>()).Returns(getReturnData);

            // Act
            var sut = await _controller.GetMarker("any_id");

            // Assert
            Assert.Equal(sut.Result.GetType(), actionResultType);
        }

        [Fact]
        public async Task GetMarkersShouldReturnMarkers()
        {
            // Arrange
            var markerLst = new List<Marker>()
            {
                new Marker()
                {
                    Id = 1,
                    Longitude = 138.601519,
                    Latitude = -34.890128,
                    Description = "Welcome to Adelaide !!!",
                    UserName = "sa"
                },
            };
            IEnumerable<Marker> markers = markerLst;

            _repo.GetAsync().Returns(Task.FromResult<IEnumerable<Marker>>(markers));

            // Act
            var okResult = await _controller.GetMarkers();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }
    }
}
