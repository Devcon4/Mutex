namespace mutex.IntegrationTest.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using mutex.IntegrationTest.Constants;
    using mutex.IntegrationTest.Fixtures;
    using mutex.IntegrationTest.Models;
    using Xunit;

    public class QueryTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient client;

        public QueryTest(CustomWebApplicationFactory<Startup> factory) =>
            this.client = factory.CreateClient();

        [Fact]
        public async Task IntrospectionQuery_Default_Returns200Ok()
        {
            var introspectionQuery = await this.client.PostGraphQL(GraphQlQuery.Introspection);
            var introspectionContent = await introspectionQuery.Content.ReadAsAsync<GraphQLResponse>();

            Assert.Equal(HttpStatusCode.OK, introspectionQuery.StatusCode);
            Assert.Null(introspectionContent.Errors);
        }
    }
}
