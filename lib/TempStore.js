
let userData = []


export const AddUserData = (data) => {
    userData.push(data)
    console.log(userData);
    
}


export const VerifyUserCode = (code) => {
    const user = userData.find(user => user?.verificationCode === code);
    console.log(user);
    
    if (user) {
        return user;
    }
    return null;
}