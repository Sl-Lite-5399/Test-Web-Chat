// 🔥 Firebase Configuration (তোমার API ডিটেইলস এখানে বসাও)
const firebaseConfig = {
    apiKey: "AIzaSyBim2PwtFrpHLMs5GqGSNauqhe2J0Kjj5k",
    authDomain: "test-web-chat-e5359.firebaseapp.com",
    projectId: "test-web-chat-e5359",
    storageBucket: "test-web-chat-e5359.firebasestorage.app",
    messagingSenderId: "1008359389722",
    appId: "1:1008359389722:web:69ecc325ef753abbc56fa3"
};

// Firebase ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim() !== "") {
        db.collection("messages").add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("message").value = "";
    }
}

// ✅ মেসেজ রিয়েল-টাইমে দেখানোর ফাংশন
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
        let msg = document.createElement("p");
        msg.textContent = doc.data().text;
        chatBox.appendChild(msg);
    });
});