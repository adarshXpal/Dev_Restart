const fs=require('fs');

fs.writeFile("hello.txt","Hey Hello Hola Amigo",(err)=>{
  if(err) console.log(err);
  else console.log("Done");
})
fs.appendFile("hello.txt"," Bhot badiya aunty",(err)=>{
  if(err) console.log(err);
  else console.log("Done Again");
})

fs.rename("./hello.txt","changehello.txt",(err)=>{
  if(err)console.log(err);
  else console.log("Done rename");
})
fs.copyFile("./changehello.txt","./copy/copy.txt",(err)=>{
  if(err)console.log(err.message);
  else console.log("File Copied !!");
})
fs.unlink("./copy/copy.txt",(err)=>{
  if(err)console.log(err);
  else console.log("Removed !!");
// })
fs.rm("./copy",{recursive:true},(err)=>{
  if(err)console.log(err.message);
  else console.log("Directory Removed !!")
})
fs.mkdir("./copy",(err)=>{
  if(err) console.error(err.message);
  else console.log("Copy folder created !!");

})
fs.readFile("./changehello.txt",(err,data)=>{
  if(err)console.error(err);
  else console.log(data);
  
})
fs.rm("./changehello.txt",(err)=>{
  if(err)console.error(err.message);
  else console.log("File Removed !!");
  
})
