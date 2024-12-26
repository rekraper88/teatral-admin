import axios from "axios"
// import { csrf } from "./src/lib/utils";

const func = async () => {
    // await csrf();
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return response;
}

console.log(await func());

