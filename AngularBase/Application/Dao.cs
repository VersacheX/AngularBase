using AngularBase.Application.Helpers;
using AngularBase.Application.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace AngularBase.Application
{
    public static class Dao
    {
        public static User AuthenticateUser (string username, string password)
        {
            User result = null;
            string connectionString = ApplicationSettings.ConnectionString;            //TODO ApplicationSettings.ConnectionString
            using (SqlConnection connection = new(connectionString))
            {
                string sql = "EXEC no_auth_AuthenticateUser @username,@password;";

                connection.Open();
                try
                {
                    using SqlCommand command = new();
                    command.CommandText = sql;
                    command.Connection = connection;

                    command.Parameters.AddWithValue("username", username);
                    command.Parameters.AddWithValue("password", password);

                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        string user = ReadSingleRow((IDataRecord)reader);

                        List<User> userList = JsonSerializer.Deserialize<List<User>>(user);
                        result = (userList != null && userList.Count > 0 ? userList[0] : null); //TODO
                    }

                    reader.Close();
                }
                catch (Exception ex)
                {
                    return null;
                }
            }

            return result;
        }

        public static string ExecuteProcedure(int userId, string procedure, string parameter)
        {
            string result = string.Empty;
            //Check procedure for space and ;. ??.remove space and ;
            procedure = procedure.Replace(" ", "").Replace(";", "").Replace(",", "");

            string connectionString = ApplicationSettings.ConnectionString;

            using (SqlConnection connection = new(connectionString))
            {
                connection.Open();
                try
                {
                    string sql = "EXEC " + procedure + " @userId,@parameter;";

                    using SqlCommand command = new(sql, connection);
                    command.Parameters.Add(new SqlParameter("userId", userId));
                    command.Parameters.Add(new SqlParameter("parameter", parameter));//.Replace ("'", "''");

                    SqlDataReader reader = command.ExecuteReader();
                    string rowJson = "";

                    // Call Read before accessing data.
                    while (reader.Read())
                    {
                        rowJson = ReadSingleRow((IDataRecord)reader);
                    }

                    result = rowJson;
                }
                catch (Exception ex)
                {
                    //Console.WriteLine("Something went wrong");
                    dynamic returnError = new ExpandoObject();
                    returnError.ExceptionMessage = ex.Message;
                    //Log the error to errorLogFile

                    return null;
                }
            }

            return result;
        }

        public static string NoAuthExecuteProcedure(string procedure, string parameter)
        {
            string result = string.Empty;
            //Check procedure for space and ;. ??.remove space and ;
            procedure = procedure.Replace(" ", "").Replace(";", "").Replace(",", "");

            string connectionString = ApplicationSettings.ConnectionString;

            using (SqlConnection connection = new(connectionString))
            {
                connection.Open();
                try
                {
                    string sql = "EXEC no_auth_" + procedure + " @parameter;";

                    using SqlCommand command = new(sql, connection);
                    command.Parameters.Add(new SqlParameter("parameter", parameter));//.Replace ("'", "''");

                    SqlDataReader reader = command.ExecuteReader();
                    string rowJson = "";

                    // Call Read before accessing data.
                    while (reader.Read())
                    {
                        rowJson = ReadSingleRow((IDataRecord)reader);
                    }

                    result = rowJson;
                }
                catch (Exception ex)
                {
                    //Console.WriteLine("Something went wrong");
                    dynamic returnError = new ExpandoObject();
                    returnError.ExceptionMessage = ex.Message;
                    //Log the error to errorLogFile

                    return null;
                }
            }

            return result;
        }


        //private static string ExecuteProcedureList(int userId, List<string> procedures, List<string> parameters)
        //{
        //    string result = string.Empty;
        //    //Check procedure for space and ;. ??.remove space and ;
        //    procedure = procedure.Replace(" ", "").Replace(";", "");

        //    string connectionString = "";            //TODO ApplicationSettings.ConnectionString

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        try
        //        {
        //            string sql = "CALL procedure(@userId,'@parameter');";

        //            using (SqlCommand command = new SqlCommand(sql, connection))
        //            {
        //                command.Parameters.Add(new SqlParameter("userId", userId));
        //                command.Parameters.Add(new SqlParameter("parameter", parameter));//.Replace ("'", "''"); <-NeedToParseParametersProperly for the list

        //                SqlDataReader reader = command.ExecuteReader();
        //                string rowJson = "";

        //                // Call Read before accessing data.
        //                while (reader.Read())
        //                {
        //                    rowJson = ReadSingleRow((IDataRecord)reader);
        //                }

        //                result = rowJson;
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            //Console.WriteLine("Something went wrong");
        //            return false;
        //        }
        //    }

        //    return result;
        //}

        private static string ReadSingleRow(IDataRecord record)
        {
            return record[0].ToString();
        }
    }
}
