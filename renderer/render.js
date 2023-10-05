//const { ipcRenderer } = require("ipc-renderer");


const myfile=document.getElementById("chooseFile");
const upload=document.getElementById("upload");
let jfile="";
myfile.addEventListener("change",function(){
    const file=this.files[0];
    if(isFileJson(file.name)){
        //console.log(file.name);
        jfile=file.path;
        

    }
    else{
        console.log("Please choose a json file");
    }
    
    },
    
);
//console.log(jfile);


// Receive the JSON data from the main process

function isFileJson(filename){   
    return filename.endsWith(".json");
};
//const myfilepath=myfile.files[0].path;
// function sendImage(e){
//     e.preventDefault();
//     if(!myfile.files[0]){
//         console.log("Please choose a file");
//         return;
//     }
//     ipcRenderer.send("file:upload",{jfile});

// }

upload.addEventListener("click",function(e){
    e.preventDefault();
    if(!myfile.files[0]){
        console.log("Please choose a file");
        return;
    }
    else{
        //console.log(jfile);
        ipcRenderer.send("file:upload",{jfile});
        
    }
}); 
ipcRenderer.on('jsonData', (jsonData) => {
    getBird = jsonData;
    
     // use jsonData variable to access the contents of the JSON file
  });
  let getBird={
    "input_nodes": 5,
  "hidden_nodes": 8,
  "output_nodes": 2,
  "weights_ih": {
    "rows": 8,
    "cols": 5,
    "data": [
      [
        -2.3671660835689194,
        0.6322366311658095,
        0.0048391394021971915,
        0.9489717193933611,
        -0.8269277056430766
      ],
      [
        -0.8401857851828597,
        0.7024924611936808,
        0.9459654271002542,
        0.9396643698187155,
        -0.9790654388736576
      ],
      [
        0.5426975121294193,
        -1.74902979997948,
        0.7853126065933296,
        0.2044578799923199,
        -0.4598574382904074
      ],
      [
        0.9337691177189849,
        0.963198951771546,
        1.3060976039673804,
        -0.23366596720690436,
        -0.4449838565960548
      ],
      [
        1.068579906379294,
        -1.9956665894859107,
        0.03256686426053133,
        0.15352554664331608,
        -0.09102637129260985
      ],
      [
        -1.4844319546274922,
        0.5013119271827052,
        -2.4470562884225595,
        -0.020833628495686568,
        -0.5500720466811667
      ],
      [
        0.9129179680360283,
        0.3104509994873643,
        -1.0361754394610732,
        0.43720355951243806,
        0.022189630727333015
      ],
      [
        1.0531250913449914,
        0.655324716028379,
        0.4736468536250601,
        -0.3420443677049866,
        0.2866485408006916
      ]
    ]
  },
  "weights_ho": {
    "rows": 2,
    "cols": 8,
    "data": [
      [
        -2.174474756836491,
        -0.58772138801427,
        0.6414436833552191,
        0.5885912676393118,
        1.1533105192804158,
        -0.771160029374833,
        -0.03734269449519936,
        0.19155777414546887
      ],
      [
        0.5131263350977467,
        -0.36241984560584534,
        -0.5662751383945858,
        0.7193478286392538,
        -1.5343410217812803,
        0.6026924057703595,
        -1.0751309575783068,
        0.7993903835191339
      ]
    ]
  },
  "bias_h": {
    "rows": 8,
    "cols": 1,
    "data": [
      [
        0.22551850424569378
      ],
      [
        0.8378204127533163
      ],
      [
        -0.026814283377831247
      ],
      [
        1.0154132701675052
      ],
      [
        0.20855758621221046
      ],
      [
        -1.8018239103167117
      ],
      [
        -1.6350884225136797
      ],
      [
        0.22874367827032732
      ]
    ]
  },
  "bias_o": {
    "rows": 2,
    "cols": 1,
    "data": [
      [
        0.24106213538506932
      ],
      [
        0.7847067254386401
      ]
    ]
  },
  "learning_rate": 0.1,
  "activation_function": {}
  };
 