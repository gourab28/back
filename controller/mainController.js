const ytdl = require('ytdl-core');
const path = require('path');
exports.getIndex = (req,res,next) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../views') });
};



exports.getVideoInfo = async (req,res,next) => {
    const videoURL = req.query.videoURL;
    
    try{
        const info = await ytdl.getInfo(videoURL);
        const name = info.videoDetails.title;
        res.header('Access-Control-Allow-Origin', '*');
        const videf = ytdl.chooseFormat(info.formats, { format: 'mp4',
            quality: 'highestvideo',
            filter: 'audioandvideo' });
            
        res.status(200).json({title: name, url: videf.url});
    }catch(err){
        console.log(err);
    }
};

exports.getDownload = (req,res,next) => {
    const videoURL = req.query.videoURL;
    //const itag = req.query.itag;
    res.header("Content-Disposition",'attachment;\ filename="video.mp4"');
    ytdl(videoURL,{
		format: 'mp4',
    quality: 'highestvideo',
    filter: 'audioandvideo' 
	}).pipe(res);

};
exports.getaudioDownload = (req,res,next) => {
    const videoURL = req.query.videoURL;
    //const itag = req.query.itag;
    res.header("Content-Disposition",'attachment;\ filename="audio"');
    ytdl(videoURL,{
    quality: 'highestaudio',
    filter: 'audioonly' 
	}).pipe(res);

};