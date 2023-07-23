module.exports= {

    // products
    AddProduct: require("./products/add-product"),
    DeleteProduct: require("./products/delete-product"),
    EditProduct: require("./products/edit-product"),
    GetProduct: require("./products/get-product"),
    ProductImages: require("./products/product-images"),


    // store 
    CreateStore: require("./store/create-store"),
    EditStore: require("./store/edit-store"),
    ChangeImage: require("./store/change-image"),
    GetStore: require("./store/get-store"),
    

    // categories
    AddCategory: require("./categories/add-category"),
    GetCategory: require("./categories/get-category"),


    // subcategories
    AddSubCategory: require("./categories/add-subcategory"),
    GetSubCategory: require("./categories/get-subcategory"),

    // orders
    GetOrders: require("./orders/get_orders"),
    UpdateOrder: require("./orders/update_order"),
    DeleteOrder: require("./orders/delete_order"),
}