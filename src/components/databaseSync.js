//just save all user saved items to db
  export async function saveCartToDB(cartitems)
  {
    let userToken = getCookie()
    if(userToken !==""){
      let cartShotened = prepareItemsForDB(cartitems);

     try{ 
  const res = await fetch('http://localhost/react-commerce/sync_only_cart.php', {
    
    method: 'POST',
      body: JSON.stringify({cart_items: cartShotened, user_token: userToken})
      
    });
    ///console.log(JSON.stringify({cart_items: cartitems, wish_list: wishlist, user_token: userToken}))
    const results =  await res.json();

     } catch (error) {
    console.error(error.message);
  }
    }

  }
  
  
    export async function saveWishlistToDB(wishlist)
  {
    let userToken = getCookie();
      if(userToken !==""){
            let wishListShotened = prepareItemsForDB(wishlist);

     try{ 
  const res = await fetch('http://localhost/react-commerce/sync_only_wishlist.php', {
    
    method: 'POST',
      body: JSON.stringify({wish_list: wishListShotened, user_token: userToken})
      
    });
    ///console.log(JSON.stringify({cart_items: cartitems, wish_list: wishlist, user_token: userToken}))
    const results =  await res.json();

     } catch (error) {
    console.error(error.message);
  }
}
  } 



    export function prepareItemsForDB(items)
  {
    var itemIDforDB = [];

    for(let i=0; i<items.length; i++)
    {
      itemIDforDB.push({id: items[i].id, quantity: items[i].quantity})
    }

    return itemIDforDB;
  }

  //so here is this hack again...
  //get the so called token from cookies to identify the user, if he is even logged in
  //smh the React did not like when i've added all other contexts to cart.jsx
   function getCookie() {
  let name = 'token' + "=";
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