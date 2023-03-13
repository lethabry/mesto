export class UserInfo {
  constructor({ userNameSelector, userActivitSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userActivity = document.querySelector(userActivitSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      activity: this._userActivity.textContent
    }
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }

  setUserInfo(name, activity) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  }
}