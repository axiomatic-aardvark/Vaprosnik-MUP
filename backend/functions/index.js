const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getQuestions = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("questions")
    .get()
    .then(data => {
      let questions = [];

      data.forEach(doc => {
        const id = doc._ref._path.segments[1];
        questions.push({ id: id, data: doc.data() });
      });
      return res.json(questions);
    })
    .catch(err => {
      console.log(err);
    });
});

exports.pushQuestionToDB = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowerd" });
  }
  const newQuestion = {
    text: req.body.text,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    date: admin.firestore.Timestamp.fromDate(new Date())
  };
  admin
    .firestore()
    .collection("questions")
    .add(newQuestion)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});
