/*jshint esversion: 6 */

(function (window) {
    function myLibrary() {

        /* Will create a random object */

        const createRandomProduct = () => {
            let typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
            let price = (Math.random() * 500).toFixed(2);
            let type = typeArray[Math.floor(Math.random() * 4)];

            return {
                price: price,
                type: type
            };
        };

        /* Will create an array containing a specified number of randomized products. Each product will have an id, price, and type attribute */
        const createRandomCatalog = num => {
            let catalog = [];
            for (let i = 0; i < num; i++) {
                let obj = createRandomProduct();
                catalog.push({
                    id: i,
                    price: obj.price,
                    type: obj.type
                });
            }
            return catalog;
        };

        /* Lets create a value to invoke the createRandomCatalog function, creating a new randomly generated array with 100 items */
        let catalog = createRandomCatalog(100)

        const searchAllProducts = () => {
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(catalog);
                }, 1000);
            });
            return promise;
        };

        /* Lets create a function that will search through the catalog array and return a Promise containing the product that matches the id argument. The Promise will resovle in 1000 milliseconds after the function has executed. The Promise will reject if an invalid id is searched*/

        const searchProductById = id => {
            let promise = new Promise((resolve, reject) => {
                let i = 0;
                setTimeout(() => {
                    while (i < catalog.length) {
                        if (catalog[i].id == id) {
                            resolve({
                                id: id,
                                price: catalog[i].price,
                                type: catalog[i].type
                            });
                        }
                        i++;
                    }
                    reject(`Invalid ID: ${id}`)
                }, 1000);
            });
            return promise;
        };

        /* Lets create a function that will return a Promise containing an array of all the products that matched the specified type The Promise will resolve in 1000 milliseconds after the function is executed*/

        const searchProductsByType = type => {
            let promise = new Promise((resolve, reject) => {
                let i = 0;
                let typeArray = [];
                let possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
                let stringifiedArray;
                if (!possibleTypes.includes(type)) {
                    console.log('ugh')
                    reject(`Invalid type: ${type}`)
                } else {
                    console.log('rolling...')
                    setTimeout(() => {
                        while (i < catalog.length) {
                            if (catalog[i].type == type) {
                                typeArray.push({
                                    id:catalog[i].id,
                                    price: catalog[i].price,
                                    type: catalog[i].type
                                });
                            }
                            i++;
                        }
                        resolve(typeArray);
                    }, 1000);
                }
            });
            return promise;
        };

        /* Lets create a function that will return a Promise containing an array of all the products that were witht the specified difference of the specified price. Promise will reject if invalid price is searched */

        const searchProductsByPrice = (price, difference) => {
            console.log(price, difference)
            let promise = new Promise((resolve, reject) => {
                let i = 0;
                let priceArray = [];

                if (!isFinite(price)) {
                    reject(`Invalid price: ${price}`)
                } else {
                    setTimeout(() => {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < difference) {
                                priceArray.push({
                                    id: catalog[i].id,
                                    price: catalog[i].price,
                                    type: catalog[i].type
                                });
                            }
                            i++;
                        }
                        resolve(priceArray);
                    }, 1000);
                }
            });
            return promise;
        };

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        };

    }

    if (typeof (window.api) === 'undefined') {
        window.api = myLibrary();
    }

})(window);