const readXlsxFile = require('read-excel-file/node');
const Product = require('../../db/models/product');
const Category = require('../../db/models/category');
const StringToArray = (str) => {
    var strArr = str.split(',');
    var temp = [];
    for (i = 0; i < strArr.length; i++)
        temp.push(strArr[i]);

    return temp;
}
let sheet = {
    import: async function (file) {
        let data = [];
        let available_price = [];

        await readXlsxFile(file.path).then((rows) => {
            data = rows;
        });
        console.log(data, "1")
        let params = data[0];

        for (var i = 1; i < data.length; i++) {
            console.log("2")

            let cat = await Category.findOne({ name: data[i][2], deleted: false });
            // if (!cat) {
            //     return res.status(200).json({ success: false, message: 'Category Does Not Exist' });
            // }
            let productid = await Product.findOne({ product_id: data[i][1], deleted: false });
            if (cat) {

                data[i][2] = cat._id;

                if (data[i][4] == 'TRUE' || data[i][4] == true) {
                    data[i][4] = true;
                } else {
                    data[i][4] = false;
                }
                if (data[i][5] == 'FIXED') {
                    console.log(data[i][2])
                    console.log(data[i][9])
                    available_price = [];
                    available_price.push(data[i][9] - (data[i][9] * data[i][6] / 100));
                    console.log(available_price)
                    console.log(data[i][12])
                }
                if (data[i][5] == 'CUSTOM') {
                    console.log("CUSTOM")
                    data[i][7] = StringToArray(data[i][7]);
                    data[i][8] = StringToArray(data[i][8]);
                    data[i][9] = StringToArray(data[i][9]);
                    data[i][10] = StringToArray(data[i][10]);
                    data[i][11] = StringToArray(data[i][11]);
                    var price = data[i][9];
                    available_price = [];
                    console.log(price)
                    console.log(data[i][12])
                    for (prices of price) {
                        console.log(prices)
                        available_price.push(prices - (prices * data[i][6] / 100));
                        console.log(available_price)
                    }
                }
                if (productid) {
                    productid.name = data[i][0];
                    productid.product_id = data[i][1];
                    productid.category_id = data[i][2];
                    productid.description = data[i][3];
                    productid.stock_available = data[i][4];
                    productid.price_by = data[i][5];
                    productid.available_price = available_price;
                    productid.offer_percentage = data[i][6];
                    productid.size = data[i][7];
                    productid.weight = data[i][8];
                    productid.price = data[i][9];
                    productid.stock_count = data[i][10];
                    productid.type = data[i][11];
                    productid.sub_type = data[i][12];

                    await productid.save();
                } else {
                    let new_product = new Product({
                        name: data[i][0],
                        product_id: data[i][1],
                        category_id: data[i][2],
                        description: data[i][3],
                        stock_available: data[i][4],
                        price_by: data[i][5],
                        available_price: available_price,
                        offer_percentage: data[i][6],
                        size: data[i][7],
                        weight: data[i][8],
                        price: data[i][9],
                        stock_count: data[i][10],
                        type: data[i][11],
                        sub_type: data[i][12]
                    });
                    await new_product.save();
                    console.log(new_product)
                }
            }
        }
    },
    upload: async function (file) {
        let data = [];
        let available_price = [];

        await readXlsxFile(file.path).then((rows) => {
            data = rows;
        });

        let params = data[0];

        for (var i = 1; i < data.length; i++) {

            let prod = await Product.findOne({ product_id: data[i][0], deleted: false });
            if (prod) {
                if (prod.price_by == 'FIXED') {
                    available_price = [];
                    available_price.push(data[i][2] - (data[i][2] * prod.offer_percentage / 100));
                    console.log(available_price)
                }
                if (prod.price_by == 'CUSTOM') {
                    data[i][2] = StringToArray(data[i][2]);
                    var price = data[i][2];
                    console.log(price)
                    data[i][1] = StringToArray(data[i][1]);
                    for (prices of price) {
                        console.log(prices)
                        available_price.push(prices - (prices * prod.offer_percentage / 100));
                        console.log(available_price)
                    }
                }
                prod.stock_count = data[i][1];
                prod.price = data[i][2];
                prod.available_price = available_price;
                await prod.save();
                console.log(prod)
            }
        }

    }

}

module.exports = sheet;
