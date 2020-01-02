using System;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using Xunit;

using landmark_remark.Data.Repository;
using landmark_remark.Controllers;
using landmark_remark.Data.Entities;
using landmark_remark.Models;

namespace landmark_remark.tests.Controllers
{
    public class UsersControllerTests
    {
        private readonly IUserRepositoryAsync _repo;
        private readonly UsersController _controller;

        public UsersControllerTests()
        {
            _repo = Substitute.For<IUserRepositoryAsync>();
            _controller = new UsersController(_repo);
        }

        [Fact]
        public async Task GetUser_InvalidUser_ReturnsNotFoundResult()
        {
            // Arrange
            _repo.GetByNameAsync(Arg.Any<string>()).Returns(Task.FromResult<User>(null));

            // Act
            var notFoundResult = await _controller.GetUser("invalid_user");

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async Task GetUser_ValidUser_ReturnsOkResult()
        {
            // Arrange
            var mockUser = new User()
            {
                UserName = "john_flynn",
                FirstName = "John",
                LastName = "flynn",
                Password = "john@123"
            };
            _repo.GetByNameAsync(Arg.Any<string>()).Returns(Task.FromResult<User>(mockUser));

            // Act
            var okResult = await _controller.GetUser("john_flynn");

            // Assert
            Assert.IsType<User>(okResult.Value);
            Assert.Equal(mockUser, okResult.Value);
        }

        [Fact]
        public async Task Authenticate_InvalidUser_ReturnsNotFoundResult()
        {
            // Arrange
            var invalidUser = new UserDto()
            {
                UserName = "invalid_user", 
                Password = "invalid_password"
            };
            _repo.FirstOrDefaultAsync(Arg.Any<Expression<Func<User, bool>>>()).Returns(Task.FromResult<User>(null));

            // Act
            var notFoundResult = await _controller.PostAsync(invalidUser);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async Task Authenticate_ValidUser_ReturnsOkResult()
        {
            // Arrange
            var validUser = new UserDto()
            {
                UserName = "valid_user",
                Password = "valid_password"
            };
            var mockUser = new User()
            {
                UserName = "valid_user",
                FirstName = "John",
                LastName = "flynn",
                Password = "valid_password"
            };
            _repo.FirstOrDefaultAsync(Arg.Any<Expression<Func<User, bool>>>()).Returns(Task.FromResult<User>(mockUser));

            // Act
            var okResult = await _controller.PostAsync(validUser);
            
            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async Task RegisterUser_AlreadyExistingUser_ReturnsConflict()
        {
            // Arrange
            var existingUser = new User()
            {
                UserName = "john_flynn",
                FirstName = "John",
                LastName = "flynn",
                Password = "john@123"
            };
            _repo.AddAsync(Arg.Any<User>()).Returns(x => throw new DbUpdateException());
            _repo.GetByNameAsync(Arg.Any<string>()).Returns(Task.FromResult<User>(existingUser));

            // Act
            var conflictResult = await _controller.PostUserAsync(existingUser);

            // Assert
            Assert.IsType<ConflictResult>(conflictResult.Result);
        }

        [Fact]
        public async Task RegisterUser_ThrowsException()
        {
            // Arrange
            _repo.AddAsync(Arg.Any<User>()).Returns(x => throw new DbUpdateException());
            _repo.GetByNameAsync(Arg.Any<string>()).Returns(Task.FromResult<User>(null));

            // Act and Assert
            await Assert.ThrowsAnyAsync<Exception>(async () => await _controller.PostUserAsync(null));
        }

        [Fact]
        public async Task RegisterUser_ValidUser_ReturnsCreatedResult()
        {
            // Arrange
            var newUser = new User()
            {
                UserName = "michelle",
                FirstName = "michelle",
                LastName = "obama",
                Password = "michelle@123"
            };
            _repo.AddAsync(Arg.Any<User>()).Returns(Task.FromResult<User>(newUser));
            _repo.GetByNameAsync(Arg.Any<string>()).Returns(Task.FromResult<User>(newUser));

            // Act
            var createdResult = await _controller.PostUserAsync(newUser);

            // Assert
            Assert.IsType<CreatedAtActionResult>(createdResult.Result);
        }
    }
}
