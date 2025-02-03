// TempStore.js

const tempStore = new Map(); // In-memory store for temporary data

// Function to add or update user data in the temp store
export function AddUserData(newUserData) {
  const { email } = newUserData;
  tempStore.set(email, newUserData);
  console.log(tempStore);
  
}

// Function to get user data from the temp store by email
export function GetUserData(email) {
  return tempStore.get(email);
}

// Function to remove user data after OTP expiration or successful verification
export function RemoveUserData(email) {
  tempStore.delete(email);
}

export function VerifyUserCode(code, email) {
    console.log(code);
    console.log(email);
    
    // for (const user of tempStore.values()) {
    //   if (user?.verificationCode == code) {
    //     return user;
    //   }
    // }
    // return null;

    const tempObj = tempStore.get(email)

    return tempObj


  }


// Optional: Function to check if the OTP is still valid
export function IsOTPExpired(email) {
  const userData = tempStore.get(email);
  if (!userData) return true; // Data not found means expired
  const currentTime = Date.now();
  const expiryTime = userData.codeGeneratedAt + 10 * 60 * 1000; // 10 minutes expiration
  return currentTime > expiryTime;
}
