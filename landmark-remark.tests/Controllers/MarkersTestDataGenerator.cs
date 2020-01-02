using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using landmark_remark.Data.Entities;

namespace landmark_remark.tests.Controllers
{
    public class MarkersTestDataGenerator : IEnumerable<object[]>
    {
        private static readonly Marker marker = new Marker
        {
            Id = 1,
            Longitude = 138.601519,
            Latitude = -34.890128,
            Description = "Welcome to Adelaide !!!",
            UserName = "sa"
        };

        private readonly List<object[]> _data = new List<object[]>
        {
            new object[]
            {
                marker,
                typeof(OkObjectResult)
            },
            new object[]
            {
                null,
                typeof(NotFoundResult)
            }
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public static IEnumerable<object[]> GetMarkersForPostAction()
        {  
            yield return new object[] {
                marker,
                marker,
                false,
                typeof(CreatedAtActionResult)
            };

            yield return new object[]
            {
                marker,
                marker,
                true,
                typeof(ConflictResult)
            };

            yield return new object[]
            {
                marker,
                null,
                true,
                typeof(Exception)
            };
        }
    }
}
