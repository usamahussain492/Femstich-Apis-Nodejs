module.exports= {

    // products 
    GetProductHomeDetails: require("./products/get-home-details"),
    GetProductById: require("./products/get-product-by-id"),
    LikeProduct: require("./products/like-product"),
    DislikeProduct: require("./products/dislike-product"),
    FilterProducts: require("./products/filter-product"),
    GetFavoritesProducts: require("./products/get-favorites-product"),


    // store 
    GetStoreById: require("./store/get-store-by-id"),


    //address
    AddAddress: require("./address/add-address"),
    DeleteAddress: require("./address/delete-address"),
    GetAddress: require("./address/get-address"),
    UpdateAddress: require("./address/update-address"),

    // profile
    ChangeImage: require("./profile/change-image"),
    ChangeDetails: require("./profile/change-details"),
    ChangePassword: require("./profile/change-password"),
    ContactUs: require("./profile/contact-us"),
    LikeUser: require("./profile/like-user"),
    DislikeUser: require("./profile/dislike-user"),
    GetFavoriteUsers: require("./profile/get-favorite-user"),
    GetProfile : require("./profile/get-profile"),

    // reviews
    ProductReview: require("./reviews/product-review"),
    StoreReview: require("./reviews/store-review"),

    // orders
    AddOrder: require("./orders/add_order"),
    DeleteOrder: require("./orders/delete_order"),
    GetOrders: require("./orders/get_order"),

    
}