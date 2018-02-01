// initialize and setup facebook js sdk

window.fbAsyncInit = function () {
  FB.init({
    appId: '{APP ID}',
    xfbml: true,
    version: 'v2.5',
  });
};

// Load Facebook SDK
(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// On change of status calls showInfo
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    console.log('Logged in and authenticated');
    showMessage();
  } else {
    console.log('Not authenticated');
  }
}

// Making get request to count friends and calling another function to show with first name
function showMessage() {
  FB.api('/me/friends', (response) => {
    showWithFriendsCount(response.summary.total_count);
  });
}

// Get First Name and show message
function showWithFriendsCount(totalFriends) {
  FB.api('/me/?fields=first_name', (response) => {
    if (response && !response.error) {
      alert(`Welcome ${response.first_name} you have ${totalFriends} friends!!`);
    }
  });
}

// Checks Login State on button click
function checkLoginState() {
  FB.getLoginStatus((response) => {
    statusChangeCallback(response);
  });
}
