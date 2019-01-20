// UForgot Web App
// COP 4331

// Url
var urlBase = 'http://ec2-18-191-190-147.us-east-2.compute.amazonaws.com';

var extension = 'php';

var firstName = "";
var lastName = "";
var userID = 0;

// Directs to signup
function doSignUp()
{
  hideOrShow("signUp", false);
  hideOrShow("createAccount", true);
  hideOrShow("loginForm", false);
}

function showCreateAccount()
{
  hideOrShow("helloButtons", false);
  hideOrShow("createAccount", true);
}

function goToApp()
{
  hideOrShow("helloButtons", false);
  hideOrShow("downloadApp", true);
}

//secured
function registerNewUser()
{
        // getElementById gets the text in the input where the id = "whatever"
        // Gets the value of each input and stores it in a variable
        var cleanFirstName = document.getElementById("firstName").value.replace(/[^a-zA-Z]/g, '');      //only letters
        //var shinyFirstName = mysqli_real_escape_string(cleanFirstName);
        var cleanLastName = document.getElementById('lastName').value.replace(/[^a-zA-Z]/g, '');        //only letters
        //var shinyLastName = mysqli_real_escape_string(cleanLastName);
        var cleanEmail = document.getElementById('email').value.replace(/[^a-zA-Z|@|.]/g, '');          //only letters, '@', and '.'
        //var shinyEmail = mysqli_real_escape_string(cleanEmail);
        var cleanUserName = document.getElementById('newUser').value.replace(/[^a-zA-Z0-9]/g, '');      //only letters and numbers

        //NOTE: THIS REGEX NEEDS TESTING
        //What this *should* do is require:
        //>Between 8 and 32 characters
        //>At least one lowercase letter (?=.*[a-z])
        //>At least one uppercase letter (?=.*[A-Z])
        //>At least one number (?=.*[0-9])
        //>At least one special character (?=.*[!@#\$%\^&\*])
        var newPassword = document.getElementById('passwordNewUser').value;//.replace(/[^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})]/g, '');
        //var hashedPassword = AES_ENCRYPT(newPassword,'$2y$09$whatsyourbagelsona?$');

        // Create the url -- Change the urlBase to aws domain
        var url = urlBase + '/create.' + extension;

        // Create json -- the variables in quotes can be changed to a different name but the changes need to be
        // reflected in the php scripts
        var jsonPayload = '{"first" : "' + cleanFirstName + '", "last" : "' + cleanLastName + '", "userNew" : "' + cleanUserName + '", "password": "' + newPassword + '", "email" : "' + cleanEmail + '"}';

        // Some networking code available in Leineckers slides -- don't really know what it does
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
          xhr.onreadystatechange = function()
          {
            if(this.readyState == 4 && this.status == 200)
            {
              document.getElementById("userAddResult").innerHTML =  "User is registered";

              // Added to automatically login new user
              document.getElementById("loginUser").innerHTML = document.getElementById("newUser");
              document.getElementById("pwUser").innerHTML = document.getElementById("passwordNewUser");
            }
          };

          // Send the json to php scripts?
          xhr.send(jsonPayload);
        }
        catch(err)
        {
          // Display error
          document.getElementById("userAddResult").innerHTML =  "User could not be registered. Try again.";
        }

        // Hides or displays the form based on boolean passed
        hideOrShow("createAccount", false);
        hideOrShow("downloadApp", true);
}

function hideOrShow( elementId, showState )
{
  var vis = "visible";
  var dis = "block";
  if( !showState )
  {
    vis = "hidden";
    dis = "none";
  }

  document.getElementById( elementId ).style.visibility = vis;
  document.getElementById( elementId ).style.display = dis;
}
