using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace mutex_data.Migrations
{
    public partial class AddColumnsToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Posts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Posts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Posts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PostStatusId",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedDate",
                table: "Posts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "StatusPostStatusId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PostStatuses",
                columns: table => new
                {
                    PostStatusId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostStatuses", x => x.PostStatusId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_StatusPostStatusId",
                table: "Posts",
                column: "StatusPostStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostStatuses_StatusPostStatusId",
                table: "Posts",
                column: "StatusPostStatusId",
                principalTable: "PostStatuses",
                principalColumn: "PostStatusId",
                onDelete: ReferentialAction.Restrict);

						migrationBuilder.InsertData("PostStatuses", new string[] { "Code", "Name" }, new string[,] { { "DRAFT", "Draft" }, { "SUBMITTED", "Submitted" } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostStatuses_StatusPostStatusId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "PostStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Posts_StatusPostStatusId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostStatusId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PublishedDate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "StatusPostStatusId",
                table: "Posts");
        }
    }
}
