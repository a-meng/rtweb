import mysql from 'mysql'

let pool: mysql.Pool | null = null;

export function createPool(): mysql.Pool {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: '10.10.130.220',
        user: 'rt_admin',
        password: 'i6zeg6nS32uov4csVHdW5iJk7ScErvgD',
        port: 3306
    });
    return pool;
}

export function query(opt: mysql.QueryOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!pool) return reject(new Error('未创建pool'));
        pool.query(opt, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

