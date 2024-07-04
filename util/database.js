import { MongoClient } from "mongodb";

// 연결 url 적용
const url = 'mongodb+srv://admin:qwer1234@hoon.urfsenf.mongodb.net/?retryWrites=true&w=majority'
// const options = { useUnifiedTopology: true }
// const options = { useNewUrlParser: true }
let connectDB;

//모드가 개발일때
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export { connectDB }