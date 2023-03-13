import userData from "./userData.json";

export const authenticateUser = (userName, password) => {
  if (userName === "" || password === "") {
    return { error: "Please enter username and password" };
  }
  let currentUser = userData[userName];

  if (!currentUser) {
    return { error: "User not found" };
  }

  if (currentUser.loginAttempts > 5) {
    return { error: "Account Locked" };
  }

  const hashedPw = superComplexHashFn(password);

  if (currentUser.password !== hashedPw) {
    currentUser.loginAttempts++;
    return { error: "Invalid Password" };
  }

  // Successfully authenticated currentUser
  currentUser.loginAttempts = 0;

  return {
    cacheData: {
      userName: currentUser.userName,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dateOfBirth: currentUser.dateOfBirth,
      themePreference: currentUser.themePreference,
      favoriteColor: currentUser.favoriteColor,
    },
  };
};

export const createUser = (data) => {
  userData[data.userName] = {
    ...data,
    password: superComplexHashFn(data.password),
    loginAttempts: 0,
    themePreference: "light",
  };
};

export const updateUser = (data) => {
  let currentUser = userData[data.userName];

  if (!currentUser) {
    return {
      error: "User not found",
    };
  }

  Object.assign(currentUser, data);

  return {
    cacheData: {
      userName: currentUser.userName,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dateOfBirth: currentUser.dateOfBirth,
      themePreference: currentUser.themePreference,
      favoriteColor: currentUser.favoriteColor,
    },
  };
};

const superComplexHashFn = (password) => {
  const asciiArray = toAscii(password);
  let hashArray = [];

  for (let i = 0; i < asciiArray.length; i++) {
    const even = asciiArray[i] % 2 === 0;
    const hash = even ? asciiArray[i] * 2 : asciiArray[i] - 2;
    hashArray.push(hash);
  }

  return toString(hashArray);
};

const toAscii = (str) => {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    result.push(str[i].charCodeAt());
  }

  return result;
};

const toString = (arr) => {
  return String.fromCharCode(...arr);
};
