const { createWorker } = require( 'tesseract.js');
let worker = '';
const W =async ()=>{
     worker =await createWorker('eng')
}

const tesseract = async(img)=>{
   if(!worker)await W()  
  const ret = await worker.recognize(img);
  
  console.log(ret.data.text);
  console.log(ret.data.text)
  return ret.data.text
  //   await worker.terminate();
}
module.exports = tesseract
// const run = async()=>{
// for(let i = 0;i<=10;i++){
//  await tesseract('https://tesseract.projectnaptha.com/img/eng_bw.png')
//  console.log('worker runnedd ',i)
// }
// }
// run()