using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AngularBase.Application.Helpers
{
    public class User
    {
        public int Id
        {
            get
            {
                return this.UserPK;
            }
            set
            {
                this.UserPK = value;
            }
        }

        public int UserPK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        public string Email { get; set; }

        //[JsonIgnore]
        public string Password { get; set; }
        public string NewPassword { get; set; }

        public int SecurityQuestionType1FK { get; set; }
        public int SecurityQuestionType2FK { get; set; }
        public string SecurityQuestionDescription1 { get; set; }
        public string SecurityQuestionDescription2 { get; set; }
        public string SecurityQuestionAnswer1 { get; set; }
        public string SecurityQuestionAnswer2 { get; set; }
        public string ActivationCode { get; set; }
    }

    public class LoginInformation
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string AuthData { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Username = user.Username;
            AuthData = token;
        }
    }
}
