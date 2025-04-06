let editor;
const btn = document.getElementById(`submit`);
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs' } });
require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('workspace'), {
    value: `// Write your C code here;`,
    language: 'c',
    theme: 'vs-dark'
  });
});

document.getElementById('submit').addEventListener('click',async ()=>{
    const code = editor.getValue();
    // console.log(code)
    async function sendData(){
      const res = await fetch(`http://localhost:5000/Online-C-Compiler`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          parcel: code
        })
      })
      const ans = await res.json()
      // console.log(ans);
      document.getElementById("output").innerHTML=ans.output
    }
    sendData();
    // async function recOutput(){
    //   const res = await fetch('http://localhost:5000/Online-C-Compiler/output',{
    //     method:"GET",
    //   })
    //   const ans = await res.json();
    //   console.log(ans)
    // }
    // await recOutput();
})