using Microsoft.EntityFrameworkCore.Migrations;

namespace landmark_remark.Migrations
{
    public partial class DbDataUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Markers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Latitude", "Longitude" },
                values: new object[] { "Welcome to Adelaide !!!", -34.890127999999997, 138.601519 });

            migrationBuilder.InsertData(
                table: "Markers",
                columns: new[] { "Id", "Description", "Latitude", "Longitude", "UserName" },
                values: new object[] { 2, "Welcome to Echucca !!!", -36.146321, 144.74462500000001, "sa" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Markers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Markers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Latitude", "Longitude" },
                values: new object[] { "Welcome to Melbourne!!!", 144.968853, -37.801504000000001 });
        }
    }
}
