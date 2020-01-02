using Microsoft.EntityFrameworkCore.Migrations;

namespace landmark_remark.Migrations
{
    public partial class DbCreationAndSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserName = table.Column<string>(maxLength: 20, nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(maxLength: 10, nullable: false),
                    FirstName = table.Column<string>(maxLength: 20, nullable: false),
                    LastName = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserName);
                });

            migrationBuilder.CreateTable(
                name: "Markers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Markers_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Markers_Users_UserName",
                        column: x => x.UserName,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserName", "FirstName", "LastName", "Password" },
                values: new object[] { "sa", "admin", "admin", "sa" });

            migrationBuilder.InsertData(
                table: "Markers",
                columns: new[] { "Id", "Description", "Latitude", "Longitude", "UserName" },
                values: new object[] { 1, "Welcome to Melbourne!!!", 144.968853, -37.801504000000001, "sa" });

            migrationBuilder.CreateIndex(
                name: "IX_Markers_UserName",
                table: "Markers",
                column: "UserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Markers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
