let mediaRecorder;
let audioChunks = [];
let downloadLink;

let maxRecordingTime = 100*60*1000;
let recordingTimer;

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
            // 释放流媒体资源
            stream.getTracks().forEach(track => track.stop());
            audioChunks = []; // 清空缓冲区
             // 如果不再需要audioUrl，也应释放
            setTimeout(() => {alert("释放已录音的内容的空间"); URL.revokeObjectURL(audioUrl);}, 9000000); 
        };
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;

          // 设置自动停止计时器
        recordingTimer = setTimeout(() => {
            stopRecording();
        
        }, maxRecordingTime);
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
    clearTimeout(recordingTimer); // 清除定时器
   
}

async function download(){
        alert("录音下载了！");
        downloadLink.click();
            
            
          
}

// 绑定按钮点击事件
document.getElementById('startRecording').addEventListener('click', startRecording);
document.getElementById('stopRecording').addEventListener('click', stopRecording);
document.getElementById('downloading').addEventListener('click',download);
