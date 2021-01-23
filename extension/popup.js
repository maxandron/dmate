let supportUrl = "mailto:" + SUPPORT_ADDRESS + "?subject=" + SUPPORT_SUBJECT;
document.getElementById('support-button').href = supportUrl;

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };

// document.getElementById('signIn').onclick = function(){
//   alert("yo!");
//   // Useful data for your client-side scripts:
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//   console.log('Full Name: ' + profile.getName());
//   console.log('Given Name: ' + profile.getGivenName());
//   console.log('Family Name: ' + profile.getFamilyName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail());

//   // The ID token you need to pass to your backend:
//   var id_token = googleUser.getAuthResponse().id_token;
//   console.log("ID Token: " + id_token);
// }

// function onSignIn(googleUser) {
//   alert("yo");
//   // Useful data for your client-side scripts:
//   // var profile = googleUser.getBasicProfile();
//   // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//   // console.log('Full Name: ' + profile.getName());
//   // console.log('Given Name: ' + profile.getGivenName());
//   // console.log('Family Name: ' + profile.getFamilyName());
//   // console.log("Image URL: " + profile.getImageUrl());
//   // console.log("Email: " + profile.getEmail());

//   // // The ID token you need to pass to your backend:
//   // var id_token = googleUser.getAuthResponse().id_token;
//   // console.log("ID Token: " + id_token);
// }
