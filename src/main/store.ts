import {app, ipcMain} from "electron"
import PouchDB from "pouchdb"
import path from "node:path"
import fs from "node:fs"
import {Customer,NewCustomer} from "../shared/types/ipc"
import { randomUUID } from "node:crypto"

let dbPath = path.join(app.getPath("userData"), "my_db");
if (process.platform === "darwin") {
    // caminho para macos
    dbPath = path.join(app.getPath("appData"), "devclientes", "my_db");
}

// verificar e criar o diretorio se n existir
const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, {recursive: true});
}

//Inicializar o DB

const db = new PouchDB<Customer>(dbPath);

async function addCustomer(doc: NewCustomer) : Promise<void | PouchDB.Core.Response> {
    const id = randomUUID();
    
    const data: Customer = {
        ...doc,
        _id: id
    } 

    return db.put(data)
            .then((response => response))
            .catch((error) => console.error("ERROR AO CADASTRAR", error));
}

ipcMain.handle("add-customer", async (event, doc: Customer) => {
    const result = await addCustomer(doc);

    return result;
})

async function fetchAllCustomers() : Promise<Customer[]> {
    try{

        const result = await db.allDocs({
            include_docs: true
        });

        return result.rows.map((row) => row.doc as Customer)
    } catch (err) {
        console.log("ERROR AO BUSCAR", err);

        return []
        
    }
}

ipcMain.handle("fetch-all-customers", async () => {
    return await fetchAllCustomers();
})

async function fetchCustomerById(docId: string) {
    return await db.get(docId)
                    .then(doc => doc)
                    .catch((error) => {
                        console.error("ERROR AO BUSCAR PELO ID ", error);
                        return null;
                    })
}

ipcMain.handle("fetch-customer-id", async (event, docId: string) => {
    const result = await fetchCustomerById(docId);
    return result
})


async function deleteCustomer(docId: string) {
    try {
        
        const doc = await db.get(docId)
        const result = await db.remove(doc._id, doc._rev)

        return result;
    } catch (err) {
        console.log("ERRO AO DELETAR ", err);
        return null;
        
    }
}

ipcMain.handle("delete-customer", async (event, dockId: string) => {
    return await deleteCustomer(dockId);
})