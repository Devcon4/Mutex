FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["Source/mutex/mutex.csproj", "Source/mutex/"]
RUN dotnet restore "Source/mutex/mutex.csproj"
COPY . .
WORKDIR "/src/Source/mutex"
RUN dotnet build "mutex.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "mutex.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "mutex.dll"]