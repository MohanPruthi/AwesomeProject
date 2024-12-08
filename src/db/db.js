import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'yourProjectName.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const getTableNames = async db => {
  try {
    const tableNames = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get table names from database');
  }
};

export const removeTable = async (db, tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const removeItemFromTable = async (db, id) => {        //todo
  const query = `DELETE FROM feedback WHERE id = ?`;
  try {
    await db.executeSql(query, [id]);
    console.log(`Feedback item with id ${id} removed successfully.`);
  } catch (error) {
    console.error(`Failed to remove feedback item with id ${id}:`, error);
    throw Error(`Failed to remove feedback item with id ${id}`);
  }
};




// Function to create the feedback table if it doesn't exist
export const createTable = async db => {
  const query = `
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phoneNumber TEXT,
      employeeType TEXT,
      projectName TEXT,
      teamCollaboration TEXT,
      collaborationAspects TEXT,
      challengesFaced TEXT,
      challengesDescription TEXT,
      timeManagement INTEGER,
      delayDescription TEXT,
      projectObjectiveAchieved TEXT,
      improvementSuggestions TEXT,
      overallExperience INTEGER,
      additionalFeedback TEXT
    );
  `;

  await db.executeSql(query);
};

// Function to insert the feedback into the table
export const insertFeedback = async (db, feedback) => {
  const collaborationAspectsStr = feedback.collaborationAspects.join(','); // Convert array to comma-separated string

  const query = `
    INSERT INTO feedback (
      firstName, lastName, email, phoneNumber, employeeType, projectName,
      teamCollaboration, collaborationAspects, challengesFaced, challengesDescription,
      timeManagement, delayDescription, projectObjectiveAchieved, improvementSuggestions,
      overallExperience, additionalFeedback
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    feedback.firstName,
    feedback.lastName,
    feedback.email,
    feedback.phoneNumber,
    feedback.employeeType,
    feedback.projectName,
    feedback.teamCollaboration,
    collaborationAspectsStr, // Store the array as a string
    feedback.challengesFaced,
    feedback.challengesDescription,
    feedback.timeManagement,
    feedback.delayDescription,
    feedback.projectObjectiveAchieved,
    feedback.improvementSuggestions,
    feedback.overallExperience,
    feedback.additionalFeedback,
  ];

  await db.executeSql(query, values);
};

// Function to get all feedback from the feedback table
export const getFeedback = async () => {
  const db = await connectToDatabase();

  try {
    // Query to fetch all feedback records
    const result = await db.executeSql('SELECT * FROM feedback');

    // The result is in an array of rows, so we map over it to extract the data
    const feedbackList = result[0].rows.raw(); // This will return all rows as an array

    console.log('Feedback List:', feedbackList);
    return feedbackList;
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    throw error;
  }
};
