const fs=require("fs");
const path=require("path");
const mm=require("music-metadata");

const songsDir=path.join(process.cwd(),"songs");
const output=path.join(process.cwd(),"playlist.json");

function cleanName(filename){
  let n=path.basename(filename,path.extname(filename));
  n=n.replace(/_spotdown\.org$/i,"").replace(/_/g," ").replace(/\s+/g," ").trim();
  return n||"Unknown Song";
}

function coverData(picture){
  if(!picture||!picture.data||!picture.format)return null;
  return "data:"+picture.format+";base64,"+Buffer.from(picture.data).toString("base64");
}

async function main(){
  if(!fs.existsSync(songsDir))fs.mkdirSync(songsDir,{recursive:true});
  const files=fs.readdirSync(songsDir)
    .filter(f=>/\.(mp3|m4a|aac|ogg|wav)$/i.test(f))
    .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:"base"}));

  const playlist=[];
  for(const filename of files){
    const full=path.join(songsDir,filename);
    try{
      const meta=await mm.parseFile(full,{duration:true});
      const c=meta.common||{}, pic=c.picture&&c.picture[0];
      const duration=Number(meta.format.duration||0);
      playlist.push({
        filename,
        url:"/songs/"+encodeURIComponent(filename),
        title:c.title||cleanName(filename),
        artist:c.artist||"Unknown Artist",
        duration,
        cover:coverData(pic)
      });
      console.log(filename,"=>",duration,"sec");
    }catch(err){
      console.warn("Metadata error:",filename,err.message);
    }
  }
  fs.writeFileSync(output,JSON.stringify(playlist,null,2));
  console.log("Generated playlist.json:",playlist.length,"songs");
}
main().catch(e=>{console.error(e);process.exit(1)});
