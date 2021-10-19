using AngularBase.Application.Helpers;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngularBase.Application.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(LoginInformation model);
        string HashPassword(string password);
        string GenerateRandomPassword();
        string GenerateActivationCode();
    }

    public class UserService : IUserService
    {
        public UserService()
        {
        }

        public AuthenticateResponse Authenticate(LoginInformation model)
        {
            model.Password = HashPassword(model.Password);
            User user = Dao.AuthenticateUser(model.Username, model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            string token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(ApplicationSettings.ClientSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string HashPassword(string password)
        {
            byte[] salt = Encoding.ASCII.GetBytes(ApplicationSettings.ClientSecret);

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string passwordHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return passwordHash;
        }

        public string GenerateRandomPassword()
        {
            return GenerateRandomString(12, true);
        }

        public string GenerateActivationCode()
        {
            return GenerateRandomString(32, false);
        }

        private string GenerateRandomString(int length, bool allowNonAlphaNumeric)
        {
            StringBuilder password = new();
            Random random = new();
            bool nonAlphanumeric = true;
            bool digit = true;
            bool lowercase = true;
            bool uppercase = true;

            while (password.Length < length)
            {
                char c = (char)random.Next(32, 126);

                if(allowNonAlphaNumeric || (!allowNonAlphaNumeric && char.IsLetterOrDigit(c)))
                    password.Append(c);

                if (char.IsDigit(c))
                    digit = false;
                else if (char.IsLower(c))
                    lowercase = false;
                else if (char.IsUpper(c))
                    uppercase = false;
                else if (!char.IsLetterOrDigit(c))
                    nonAlphanumeric = false;
            }

            if (nonAlphanumeric && allowNonAlphaNumeric)
                password.Append((char)random.Next(33, 48));
            if (digit)
                password.Append((char)random.Next(48, 58));
            if (lowercase)
                password.Append((char)random.Next(97, 123));
            if (uppercase)
                password.Append((char)random.Next(65, 91));

            return password.ToString();
        }
    }
}
