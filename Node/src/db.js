import { createPool } from "mysql2/promise";

export const pool = createPool({
    user: 'root',
    password: 'PrestaMex01',
    host: 'localhost',
    port: '3306',
    database: 'prestamex'
  });

 
  