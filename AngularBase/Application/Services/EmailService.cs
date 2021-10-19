using AngularBase.Application.Helpers;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBase.Application.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        string GetResetPasswordMailBody(int userPK, string username, string newPassword);
        string GetActivateAccountMailBody(int userId, string username, string activationCode);
    }

    public class EmailService : IEmailService
    {
        private readonly MailSettings _mailSettings;
        public EmailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public string GetResetPasswordMailBody(int userPK, string username, string newPassword)
        {
            string emailBody = @"Password has been reset for {0}<BR/>
                                 <BR/>
                                 Your new password is {1}<BR/>
                                 <BR/>
                                 If you did not choose to reset your password you should contact us at <CompanySupportEmail>
                                ";

            return String.Format(emailBody, username, newPassword);
        }

        public string GetActivateAccountMailBody(int userId, string username, string activationCode)
        {
            string emailBody = @"Welcome to AngularBase, {0}<BR/>
                                 <BR/>
                                 In order to complete your registration, please follow the link below<BR/>
                                 <BR/>
                                 {1}/activate-account/{2}
                                ";

            return String.Format(emailBody, username, ApplicationSettings.Domain, activationCode);
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage
            {
                Sender = MailboxAddress.Parse(_mailSettings.Mail)
            };
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            if (mailRequest.Attachments != null)
            {
                byte[] fileBytes;
                foreach (var file in mailRequest.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
