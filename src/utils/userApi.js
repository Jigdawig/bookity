import userData from "./userData.json";

export const authenticateUser = (username, password) => {
  let currentUser = userData[username];

  if (!currentUser) {
    return { error: "User not found" };
  }

  if (currentUser.failedAttempts > 5) {
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
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dateOfBirth: currentUser.dateOfBirth,
      themePreference: currentUser.themePreference,
      favoriteColor: currentUser.favoriteColor,
    },
  };
};

export const createUser = (data) => {
  // TO-DO Some validation
  userData[data.username] = {
    ...data,
    password: superComplexHashFn(data.password),
    loginAttempts: 0,
    themePreference: "light",
  };
};

export const updateUser = (data) => {
  // TO-DO Some validation
  let currentUser = userData[data.userName];
  console.log("updating:", currentUser, "with", data);

  if (!currentUser) {
    return {
      error: "User not found",
    };
  }

  Object.assign(currentUser, data);
  console.log("end result:", currentUser);

  return {
    cacheData: {
      username: currentUser.username,
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
