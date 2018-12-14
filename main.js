function openStream(){
    const config = { audio: false, video: true};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream){
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}


// openStream()
// .then(stream => playStream('localStream',stream));

const peer = new Peer({key: 'tkv5g2acaree9udi'});
peer.on('open', id => $('#my-peer').append(id));

//Caller:
$('#btnCall').click(() => {
    const id =$('#remoteId').val();
    openStream()
    .then(stream => {
        playStream('localStream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});

//Callee
peer.on('call', call =>{
    alert('co cuoc goi den');
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    })
});