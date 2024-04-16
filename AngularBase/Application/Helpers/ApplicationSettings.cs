using Microsoft.Extensions.Configuration;

namespace AngularBase.Application.Helpers
{
    public static class ApplicationSettings
    {
        public const string SectionName = "ApplicationSettings";

        public static string ApplicationName { get; set; }
        public static string ConnectionString { get; set; }
        public static string ClientId { get; set; }
        public static string ClientSecret { get; } = "d@C'~C&1:/]MZGAE$|1k1$w^'.4XGQ/;[%g{x1!3Mx`qf=!+Y'!DPwh6?'f0a17+";
        public static string Domain { get; set; }

        public static void SetApplicationSettings(IConfiguration configuration)
        {
            ApplicationName = configuration.GetValue<string>("ApplicationSettings:ApplicationName");
            ConnectionString = configuration.GetValue<string>("ApplicationSettings:ConnectionString");
            ClientId = configuration.GetValue<string>("ApplicationSettings:ClientId");
            Domain = configuration.GetValue<string>("ApplicationSettings:Domain");

        }
    }
}
