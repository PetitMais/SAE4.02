const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors");
const port = 3000;

const apiKeys = {
    publicKey: "BBesPLMl_D2QE8Hlojk7RF8sK53ECyRUpXK5B4JpV_qDIgWGT9x-7HMkMi7FHr1HRTeLSSTx6GlWKQV36e23RP4",
    privateKey: "5c2NKOlBBvxOEWYgrweHbyxc6E93TGaVkBPw5wruzGk"
};

webpush.setVapidDetails(
    'mailto:hana.belin@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
        console.error("Invalid subscription object:", subscription);
        return res.status(400).json({ status: "Error", message: "Invalid subscription object" });
    }

    // Vérifiez si la souscription existe déjà
    const exists = subDatabase.find(sub => sub.endpoint === subscription.endpoint);

    if (!exists) {
        subDatabase.push(subscription);
        console.log("Subscription saved:", subscription);
        res.json({ status: "Success", message: "Subscription saved!" });
    } else {
        res.json({ status: "Success", message: "Subscription already exists!" });
    }
});

app.post("/unsubscribe", (req, res) => {
    const subscription = req.body;

    const index = subDatabase.findIndex(sub => sub.endpoint === subscription.endpoint);

    if (index !== -1) {
        subDatabase.splice(index, 1);
        console.log("Subscription removed:", subscription);
        res.json({ status: "Success", message: "Subscription removed!" });
    } else {
        console.error("Subscription not found:", subscription);
        res.status(400).json({ status: "Error", message: "Subscription not found" });
    }
});

app.get("/send-notification", async (req, res) => {
    if (subDatabase.length === 0) {
        console.error("No subscriptions found");
        return res.status(400).json({ status: "Error", message: "No subscriptions found" });
    }

    const payload = JSON.stringify({ title: "Hello world", body: "This is a push notification" });

    const results = await Promise.all(subDatabase.map(async (subscription, index) => {
        try {
            console.log("Sending notification to:", subscription);
            await webpush.sendNotification(subscription, payload);
            return { status: "Success" };
        } catch (error) {
            if (error.statusCode === 410 || error.statusCode === 404) {
                // Remove the expired subscription
                console.error("Subscription expired or not found:", subscription);
                subDatabase.splice(index, 1);
                return { status: "Expired", subscription };
            } else {
                console.error('Error sending notification:', error);
                return { status: "Error", error };
            }
        }
    }));

    res.json({ status: "Finished", message: "Notifications processed", results });
});

app.listen(port, () => {
    console.log("Server running on port 3000!");
});
