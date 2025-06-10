//extract cookie value by name
//https://www.w3schools.com/js/js_cookies.asp
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//send token code to check if what user is logged in/if logged in
//token is not protected and is unsafe...
export async function checkAuthToken() {
  let cookieToken = getCookie('token');
  if(cookieToken !== ''){
     const res = await fetch('http://localhost/react-commerce/check_login.php', {
      method: 'POST',
      body: JSON.stringify({token: cookieToken})
    });

    const result =  await res.json(); 
    //get user name and other data to display in navbar to greet the user
 //console.log(result.message);
   return result.message;
  }
  else return false;
 
    //console.log(response);
  }