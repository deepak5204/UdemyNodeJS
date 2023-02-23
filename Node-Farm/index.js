const fs = require('fs');

// //Blocking, Synchronous way ( reading File )
// const  textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the file system: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');


//Non-Blocking, asynchronous way ( reading File )
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) {
        console.log(data1);
        return ;
    }

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, (err) => {
                console.log("Your file has been written.")
            });
        });
    });
});
console.log('Will read file!');



