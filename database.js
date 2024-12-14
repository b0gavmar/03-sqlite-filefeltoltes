import sqlite3 from 'sqlite3';

const database = new sqlite3.Database("./database.sqlite");

const initializeDatabase = async() =>{
    await dbRun("DROP TABLE IF EXISTS products");
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, picture TEXT, price REAL)");

    const products = [
        { name: 'Product 1', description: 'Product 1 Description', picture: 'product1.jpg', price: 10.99 },
        { name: 'Product 2', description: 'Product 2 Description', picture: 'product2.jpg', price: 15.99 },
        { name: 'Product 3', description: 'Product 3 Description', picture: 'product3.jpg', price: 20.99 },
    ];

    for (const product of products) {
        await dbRun("INSERT INTO products (name, description, picture, price) VALUES (?,?,?,?)", [product.name, product.description, product.picture, product.price]);
    }
}


function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { database, dbQuery, dbRun, initializeDatabase };