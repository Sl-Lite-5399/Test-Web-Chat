// 🔥 Firebase Configuration (API Key & অন্যান্য তথ্য)
const firebaseConfig = {
    apiKey: "AIzaSyBim2PwtFrpHLMs5GqGSNauqhe2J0Kjj5k",
    authDomain: "test-web-chat-e5359.firebaseapp.com",
    projectId: "test-web-chat-e5359",
    storageBucket: "test-web-chat-e5359.appspot.com", // ✅ এটি ঠিক করা হয়েছে
    messagingSenderId: "1008359389722",
    appId: "1:1008359389722:web:69ecc325ef753abbc56fa3"
};

// Firebase ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ ইউজার আইডি তৈরি (যাতে দুইজন আলাদা হয়)
const userId = "user_" + Math.random().toString(36).substr(2, 9);

// ✅ মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim() !== "") {
        db.collection("messages").add({
            text: message,
            user: userId, // ✅ এখন প্রতিটি মেসেজ প্রেরকের ID সংরক্ষণ করবে
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("message").value = "";
    }
}

// ✅ মেসেজ রিয়েল-টাইমে দেখানোর ফাংশন
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // পুরনো মেসেজ মুছে নতুনভাবে লোড করা

    snapshot.forEach(doc => {
        let data = doc.data();
        let msg = document.createElement("p");
        msg.textContent = data.text;

        // ✨ যদি মেসেজ আমার হয়, তাহলে ডান দিকে দেখাবে
        if (data.user === userId) {
            msg.classList.add("message", "sent");
        } else {
            msg.classList.add("message", "received");
        }

        chatBox.appendChild(msg);
    });

    // চ্যাট স্ক্রল স্বয়ংক্রিয়ভাবে নিচে যাবে
    chatBox.scrollTop = chatBox.scrollHeight;
});