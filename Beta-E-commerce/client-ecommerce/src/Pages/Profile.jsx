import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import CryptoJS from "crypto-js";
function Profile() {
  const [user, setUser] = useState({});
  const token = sessionStorage.getItem("jwtToken");
  const decryptedEmail = "";
  const SECRET_KEY = "1234567890abcdef1234567890abcdef"; // Example 24-byte secret key
  const secretKeyBytes = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const decrypt = (encryptedText) => {
    try {
      // Decrypt the encrypted text using Triple DES
      const decrypted = CryptoJS.TripleDES.decrypt(
        encryptedText,
        secretKeyBytes,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      // Convert the decrypted data to a readable string
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      return decryptedText;
    } catch (error) {
      console.error("Decryption error:", error);
      throw error; // Optionally throw the error for further handling
    }
  };
  const getUserDetails = () => {
    fetch("http://localhost:8090/getUserDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json()) // Corrected method call
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user details:", err));
    try {
      const decryptedEmail = decrypt(user.email);
      console.log("Decrypted data:", decryptedEmail);
    } catch (error) {
      console.error("Failed to decrypt:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      <div></div>
      <div className="container p-5 account-box">
        <div className="row">
          <div class="col">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              value={user.userFirstName}
              disabled
            />
          </div>
          <div class="col">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              value={user.userLastName}
              disabled
            />
          </div>
        </div>
        <div className="row pt-2">
          <div class="col">
            <label htmlFor="">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              value={user.userName}
              disabled
            />
          </div>
          <div class="col">
            <label htmlFor="">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              value={decryptedEmail}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
