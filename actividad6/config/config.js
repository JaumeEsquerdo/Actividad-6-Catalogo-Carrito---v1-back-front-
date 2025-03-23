import dotenv from 'dotenv';
dotenv.config();

export const PORT=process.env.PORT  || 3000; 
export const DOMAIN= process.env.DOMAIN || "http://localhost"

export const DB_USER= process.env.DB_USER ||"jaumeesquerdo"
export const DB_PASS = process.env.DB_PASS ||"I6SlwoOlJS3nxKSt"
export const DB_CLUSTER = process.env.DB_CLUSTER ||"cei-valencia-mongodb-pr.qlgcw.mongodb.net"
export const DATABASE = process.env.DATABASE || "menu"
export const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_para_pruebas123"