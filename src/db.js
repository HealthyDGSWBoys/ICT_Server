import mysql from 'mysql'

const db = mysql.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "HealthyBoys"
})

db.connect((error) => {
  if(error) {
    console.log(error)
    console.log('❌ DB error')
  }
  else {
    console.log('✅ DB Connected')
  }
})

export default db
