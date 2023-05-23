using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace livelihood.AppCode
{
    public class EncryptPassword
    {
        public static byte[] GetSHAHash(string PasswordSHA256)
        {
            try
            {
                System.Security.Cryptography.SHA256Managed sha265 = new System.Security.Cryptography.SHA256Managed();
                Byte[] EncryptedSHA256 = sha265.ComputeHash(System.Text.Encoding.UTF8.GetBytes(PasswordSHA256));

                sha265.Clear();
                return EncryptedSHA256;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string GetSalt()
        {
            try
            {
                int minsaltlen = 4;
                int maxsaltlen = 16;
                byte[] saltbytes;

                Random r = new Random();
                int saltlen = r.Next(minsaltlen, maxsaltlen);

                saltbytes = new byte[saltlen];
                RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
                rng.GetNonZeroBytes(saltbytes);
                rng.Dispose();

                return Convert.ToBase64String(saltbytes);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string getHexString(byte[] EncryptedSHA256)
        {
            try
            {
                StringBuilder hex = new StringBuilder(EncryptedSHA256.Length * 2);
                foreach (byte b in EncryptedSHA256)
                    hex.AppendFormat("{0:x2}", b);

                return hex.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string getHexString_new(string vpass)
        {
            try
            {
                StringBuilder Sb = new StringBuilder();

                using (SHA256 hash = SHA256Managed.Create())
                {
                    //Encoding enc = Encoding.UTF8;
                    //Byte[] result = hash.ComputeHash(enc.GetBytes(vpass));
                    byte[] result = hash.ComputeHash(Encoding.UTF8.GetBytes(vpass));

                    foreach (Byte b in result)
                        Sb.Append(b.ToString("x2"));
                }

                return Sb.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

