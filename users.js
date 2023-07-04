import fs from 'fs'
import crypto from 'crypto'

class userManager{
    constructor(file){
        this.file = file;
    }

// creacion del json vacio--
    async getUsers(){
        try{
            const data = await fs.promises.readFile(this.file, "utf-8");
            const users = JSON.parse(data);
            return users;
        } catch(e){
            await fs.promises.writeFile(this.file, JSON.stringify([]));
            return[]; 
            }
        }

// creacion de un usuario--

    async crearUser(user){
        const users = await this.getUsers();

        // encriptacion de la contraseña--
        user.salt = crypto.randomBytes(128).toString("base64");
        user.password = crypto
         .createHmac("sha256", user.salt)
         .update(user.password)
         .digest("hex");

        users.push(user);
        await fs.promises.writeFile(this.file, JSON.stringify(users))
    }

    // validacion de usuario--
    async validarUser(username, password){
        const users = await this.getUsers();
        const user = users.find((user) => user.username == username);
        if(!user) return "Usuario incorrecto, porfavor inserte un nombre correcto";

        // validacion de la contraseña encriptada anteriormente--
        const loginHash = crypto
         .createHmac("sha256", user.salt)
         .update(password)
         .digest("hex");
        return loginHash == user.password ? 'Sesion iniciada!' : 'Usuario o contraseña incorrecta.'

        }
}

// usuario añadido al archivo json-- 
const users = new userManager('./users.json')

//await users.crearUser({
    //nombre: "Valentin",
    //apellido: "Mosco",
    //username: "Mosk",
    //password: "boca1234",
    //});

// logeo del usuario exitoso/incorrecto-- 
const login = await users.validarUser("Mosk", "boca1234");
console.log(login)
