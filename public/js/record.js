let mediaRecorder;
let audioChunks = [];
let downloadLink;
// 获取用户媒体设备（麦克风）
async function startRecording() {
    alert("录音开始了！");
    let down=document.getElementById("downloading");
    down.style.display="none";
    try {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const options = { mimeType: 'audio/mp4' };
        mediaRecorder = new MediaRecorder(stream,options);
        
        
        audioChunks = [];
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks,{ type: mediaRecorder.mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioUrl;

                // 创建下载链接并触发下载
            
            downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'recording.mp4'; // 设置下载的文件名
            
            document.body.appendChild(downloadLink);
       

        };
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
    } catch (error) {
        console.error('Error accessing the media devices.', error);
    }
}

// 停止录音并播放录音文件
async function stopRecording() {
    alert("录音结束了！");
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
    let down=document.getElementById("downloading");
    down.style.display="block";
    
}

async function download(){
        alert("录音下载了！");
        downloadLink.click();
            
            
          
}

// 绑定按钮点击事件
document.getElementById('startRecording').addEventListener('click', startRecording);
document.getElementById('stopRecording').addEventListener('click', stopRecording);
document.getElementById('downloading').addEventListener('click',download);
