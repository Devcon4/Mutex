FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["mutex-api/mutex-api.csproj", "mutex-api/"]
COPY ["mutex-data/mutex-data.csproj", "mutex-data/"]
RUN dotnet restore "mutex-api/mutex-api.csproj"
COPY . .
WORKDIR "/src/mutex-api"
RUN dotnet build "mutex-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "mutex-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "mutex-api.dll"]