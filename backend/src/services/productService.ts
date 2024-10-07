import productModel from "../models/productModel";

export const getAllProducts = async () => {
       return await productModel.find();
}

export const seedInitialProduct = async () => {
    try {
        const products = [
          {
            title: "Dell Laptop",
            image:
              "https://i5.walmartimages.com/seo/Dell-Inspiron-15-6-FHD-Touchscreen-Laptop-Computer-AMD-Ryzen-5-8GB-DDR4-RAM-256GB-SSD-HDMI-USB-3-1-Windows-10-Home_c761828d-f59d-4d87-a380-33740e087477.12423ff52be2c3671d251794ff0afca0.jpeg",
            price: 25000,
            stock: 13,
          },
          {
            title: "Asus Laptop",
            image: "https://dlcdnwebimgs.asus.com/gain/91f5e32d-e415-4d8b-a080-ffadc04fceee/w800",
            price: 20000,
            stock: 17,
          },
          {
            title: "HP Laptop",
            image: "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/laptops-and-2-n-1s/essential/HP%2014%22%20Laptop%20(Intel)_Natural%20Silver_Desktop@2x.png",
            price: 5000,
            stock: 3,
          },
        ];
    
        const existingProducts = await getAllProducts();
    
        if(existingProducts.length === 0){
            await productModel.insertMany(products)
        }
    } catch(err) {
        console.error("cannot see database", err)
    }
};