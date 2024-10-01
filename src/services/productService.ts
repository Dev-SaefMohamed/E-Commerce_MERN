import productModel from "../models/productModel";

export const getAllProducts = async () => {
       return await productModel.find();
}

export const seedInitialProduct = async () => {
    const products = [
        { title: "Dell Laptop", 
          image: "https://i5.walmartimages.com/seo/Dell-Inspiron-15-6-FHD-Touchscreen-Laptop-Computer-AMD-Ryzen-5-8GB-DDR4-RAM-256GB-SSD-HDMI-USB-3-1-Windows-10-Home_c761828d-f59d-4d87-a380-33740e087477.12423ff52be2c3671d251794ff0afca0.jpeg",
          price: 25000, stock: 13 }
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products)
    }

};