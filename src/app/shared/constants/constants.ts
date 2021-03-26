export const Constants = {
   url: 'https://www.goldenrosse.com/api/V1/',
   baseUrl:'https://www.goldenrosse.com/',
      //  baseUrl:'https://www.goldenrosse.com/',
        
    // auth
    login: 'auth/user/login',
    register: 'auth/user/register',
    forgotPassword: 'auth/user/forgotpassword',
    resetPassword: 'auth/user/resetpassword',
    verifyemail: 'auth/user/emailVerify',
    logout: 'auth/user/logout',
    changepassowrd: 'auth/user/changepassword',
    resedemail: 'auth/user/resendemail',
    //Product
    allproduct: 'user/product/list',
    productbycategory: 'user/product/list/category?id=',
    productbyid: 'user/product/get/product?id=',
    rating: 'user/product/rating',
    productbytype: 'user/product/list/type?type=',

    //Category
    allcategory: 'user/category/list',
    categorybytype: 'user/category/listbytype',

    //Account
    orderlist: 'user/order/list',
    checkCoupon: 'user/order/applycoupon?coupon_code=',
    paynow: 'user/order/create',
    orderdetails: 'user/order/details?id=',

    //Cart
    cartlist: 'user/cart/list',
    addcart: 'user/cart/add',
    removecart: 'user/cart/remove?id=',
    increasecart: 'user/cart/increase?id=',
    decreasecart: 'user/cart/decrease?id=',

    //WishList
    wishall: 'user/wishlist/list',
    wishadd: 'user/wishlist/add?id=',
    wishremove: 'user/wishlist/remove?id=',

    //Profile
    addaddress: 'user/address/add',
    getaddress: 'user/address/list',
    updateaddress: 'user/address/update',
    deteletaddress: 'user/address/delete',
    myprofile: 'user/profile/update',
    couponlist: 'user/coupon/list',
    getprofile: 'user/get/profile',
    getnotification:'user/notification/list',
    clearnotification:'user/notification/clearall',
    readnotification:'user/notification/read',

    //Card
    addcard: 'user/card/add',
    listcard: 'user/card/list',
    deletecard: 'user/card/delete?id=',


    //Type
    typelist: 'admin/type/list',

    //Guest
    guestcartlist: 'guest/cart/list',
    guestaddcart: 'guest/cart/add',
    guestremovecart: 'guest/cart/remove?id=',
    guestincreasecart: 'guest/cart/increase?id=',
    guestdecreasecart: 'guest/cart/decrease?id=',

    //guest order
    guestordercreate: 'guest/order/create',
    guestorderdetail: 'guest/order/details?id=',

    getlanguage: 'user/language/get',
    updatelanguage: 'user/language/update?language=',

    searchproduct: 'user/product/search?key=',

    //Insta feed
    instafeed:'user/instagram/feeds',

    //Paypal
    payresponse:'user/order/paypal/checkstatus',
    guestpayresponse:'guest/order/paypal/checkstatus',

    //Settings
    getsetting: 'user/get/settings',
    returnform:'auth/user/returnform',

    //SubType
    subtypelist:'admin/subtype/list',

    //guest language update
    guestlanguage:'guest/cart/language/update?language=',

    //Productlist limitation
    productlist:'user/product/lists',

    //New arrival list
    newarrival:'user/product/newarrival'

}
