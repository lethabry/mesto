export class UserInfo {
  constructor({ userNameSelector, userActivitSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userActivity = document.querySelector(userActivitSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      activity: this._userActivity.textContent
    }
  }

  setUserInfo(name, activity) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  }
}