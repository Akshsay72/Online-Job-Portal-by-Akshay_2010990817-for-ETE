const con = require('./connection');

class Job {
  static init() {
    const createJobTableQuery = `CREATE TABLE IF NOT EXISTS Job(
      jid INT AUTO_INCREMENT,
      addedBy INT NOT NULL,
      company VARCHAR(500) NOT NULL,
      post VARCHAR(600) NOT NULL,
      location VARCHAR(600) NOT NULL,
      salary INT NOT NULL,
      PRIMARY KEY (jid),
      FOREIGN KEY (addedBy) REFERENCES Account(uid)
    )`;
    con.query(createJobTableQuery, (error) => {
      if (error) throw error;
    });
    return true;
  }

  static async create(jobData) {
    const query = `INSERT INTO Job (addedBy, company, post, location, salary) 
      VALUES (
        '${jobData.addedBy}', 
        '${jobData.company}',
        '${jobData.description}',
        '${jobData.location}',
        '${jobData.salary}'
      )
    `;
    const jid = await new Promise((resolve) => {
      con.query(query, (error, result) => {
        if (error) throw error;
        // id = result.insertId;
        resolve(result.insertId);
      });
    });
    return jid;
  }

  static async findById(jid) {
    const query = `SELECT * FROM Job
    WHERE jid='${jid}'`;
    const job = await new Promise((resolve) => {
      con.query(query, (error, result) => {
        if (error) throw error;
        resolve(result[0]);
      });
    });
    return job;
  }

  static async find(location, salary) {
    let query = `SELECT * FROM Job
    WHERE location = '${location}'`;
    if (salary) {
      query += ` AND tag='${salary}'`;
    }
    const jobs = await new Promise((resolve) => {
      con.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });
    return jobs;
  }


  static async findByRecruiter(uid) {
    const query = `SELECT * FROM Job
    WHERE addedBy='${uid}'`;
    const jobs = await new Promise((resolve) => {
      con.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });
    return jobs;
  }
}


module.exports = Job;
