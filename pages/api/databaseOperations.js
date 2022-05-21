const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
//const [value, setValue] = useState('');

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getEntry(req, res);
    }
    case 'POST': {
      return addEntry(req, res);
    }
    case 'PUT': {
      return updateEntry(req, res);
    }
    case 'DELETE': {
      return deleteEntry(req, res);
    }
  }
}

async function updateEntry(req, res) {
  // console.log(req.body);
  try {
    let { db } = await connectToDatabase();

    await db.collection('updated_answer').updateOne(
      {
        question_no: req.body,
      },
      {
        $inc: {
          // answer: (parseFloat(answer.toFixed(3)) + 0.001).toString(),
          answer: 1,
        },
      }
    );
    return res.json({
      message: 'Post updated successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addEntry(req, res) {
  const data = JSON.parse(req.body);
  // console.log(data);
  try {
    let { db } = await connectToDatabase();
    // console.log(db);
    const answer = await db
      .collection('updated_answer')
      .findOne({ question_no: data.questionNo });
    // console.log(answer);
    data.answer = parseFloat(answer.answer);
    console.log(data);
    db.collection('honeypot_website').insertOne(data);

    //  db.collection('exam_interface').insertOne(JSON.parse(req.body));

    return res.json({
      message: data.answer,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// async function getEntry(req, res) {
//   try {
//     let { db } = await connectToDatabase();
//     const data = await db
//       .collection('updated_answer')
//       .find({ question_no: req.body });

//     return res.json({
//       message: data,
//       // message: 'Get operation successful',
//       success: true,
//     });
//   } catch (error) {
//     return res.json({
//       message: new Error(error).message,
//       success: false,
//     });
//   }
// }
