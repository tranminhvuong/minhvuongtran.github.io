const socket = io('https://chat-do-an-mang.herokuapp.com');


let customConfig;

$.ajax({
  url: "https://service.xirsys.com/ice",
  data: {
    ident: "minhvuonga31",
    secret: "8b2a25f2-fca0-11e8-87ad-0242ac110003",
    domain: "tranminhvuong.github.io",
    application: "default",
    room: "default",
    secure: 1
  },
  success: function (data, status) {
    // data.d is where the iceServers object lives
    customConfig = data.d;
    console.log(customConfig);
  },
  async: false
});



const peer = new Peer({
    key: 'peerjs',
     host: 'mypen.herokuapp.com',
     secure: true, port: 443,
     config: customConfig 
    });
peer.on('open', id => socket.emit("myname1", id+ ","+name));


var pro = name;
var a = pro.split(',');


if(a.length == 4){
    $('#nguoi-goi').show();
    $('#nguoi-nhan').hide();
    $('#cuoc-goi').hide();
    socket.on("server-send-id-callee", data => {
        openStream()
        .then(stream => {
            playStream('localStream', stream);
            const call = peer.call(data, stream);
            call.on('stream', remoteStream =>{
                $('#nguoi-goi').hide();
                $('#nguoi-nhan').hide();
                $('#cuoc-goi').show();
                playStream('remoteStream', remoteStream);
            });
        })
    });
    
}
else if(a.length ==5){
    $('#nguoi-goi').hide();
    $('#nguoi-nhan').show();
    $('#cuoc-goi').hide();
    $('#goier').append(a[1]);
    $('#btn-tra-loi').click(()=>{
        $('#nguoi-goi').hide();
        $('#nguoi-nhan').hide();
        $('#cuoc-goi').show();
        socket.emit("nguoi-nhan-gui-id", a[1]+ "," + a[3]);
        peer.on('call', call =>{
            openStream()
            .then(stream => {
                call.answer(stream);
                playStream('localStream', stream);
                call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
            })
        });
    });
}
else{
    $('#nguoi-goi').show();
    $('#nguoi-nhan').hide();
    $('#cuoc-goi').hide();
}



function openStream(){
    const config = { audio: true, video: true};
    return navigator.mediaDevices.getUserMedia(config);
};

function playStream(idVideoTag, stream){
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
};


