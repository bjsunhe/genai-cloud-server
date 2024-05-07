

const mysql = require('mysql');

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: '',
});




const OpenaiAPI=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)

  let previousQuestions=req.body.previousQuestions
  console.log(previousQuestions)








  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: 
    [
          {"role": "system", "content": `\nYou are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed.\n The Database is MySQL. Only one table called bmg_palletizer in the database. The table name and fields are as follows:  CREATE TABLE bmg_palletizer (
        CarrierType VARCHAR(255) COMMENT 'Carrier Type: Blister Type 1 (a specific type of blister packaging)',
        CarrierSize VARCHAR(255) COMMENT 'Carrier Size: 400x300x47 (Dimensions of the carrier in millimeters, length x width x height)',
        PalletizingType VARCHAR(255) COMMENT 'Palletizing Type: Stack (Describes the method of stacking on the pallet)',
        LiftPositionCellView VARCHAR(255) COMMENT 'Lift Position from Cell View: right (Indicates the position of the lift from the perspective of the cell)',
        MATNumber VARCHAR(255) COMMENT 'MAT Number: 0804EZ0547 (A specific material or component number)',
        Description VARCHAR(255) COMMENT 'Description: BK3.1/3.2 (Label or identifier for a part or system component)',
        ProjectNumber VARCHAR(255) COMMENT 'Project Number: 4702115 (Identifies the project number)',
        Station VARCHAR(255) COMMENT 'Station: Stat100 (Specifies the particular station within the production line)',
        BeltLength INT(255) COMMENT 'Belt Length: 1600 (Length of the conveyor belt in millimeters)',
        ExternalBeltWidth INT(255) COMMENT 'External Belt Width: 415 (Total external width of the conveyor belt in millimeters)',
        RunningSurfaceWidth INT(255) COMMENT 'Running Surface Width: 401 (Width of the active or functional area of the belt in millimeters)',
        InternalBeltWidth INT(255) COMMENT 'Internal Belt Width: 325 (Width of the belt inside the edges in millimeters)',
        UpperBeltLevel INT(255) COMMENT 'Upper Belt Level: 1020 (Vertical position or height of the upper belt in millimeters)',
        LowerBeltLevel INT(255) COMMENT 'Lower Belt Level: 375 (Vertical position or height of the lower belt in millimeters)',
        HeightDifferenceBands INT(255) COMMENT 'Height Difference Between Belts: 645 (Height difference between the upper and lower belts in millimeters)',
        AssemblyPlateLevel INT(255) COMMENT 'Assembly Plate Level: 855 (Vertical position or height of the assembly plate in millimeters)',
        NumberOfUpperMotors INT(255) COMMENT 'Number of Upper Motors: 1 (Specifies how many motors are used at the upper part of the system)',
        NumberOfLowerMotors INT(255) COMMENT 'Number of Lower Motors: 1 (Specifies how many motors are used at the lower part of the system)',
        Tracks INT(255) COMMENT 'Tracks: 2 (Indicates the number of tracks or paths available for the belts or carriers)',
        BeltType VARCHAR(255) COMMENT 'Belt Type: BS2/M (Specifies the type or model of the conveyor belt used)',
        unique_id VARCHAR(255) COMMENT 'Unique Id of the palletizer',
        CarrierSizeLength INT(255) COMMENT 'Length of the carrier',
        CarrierSizeWidth INT(255) COMMENT 'Width of the carrier',
        CarrierSizeHeight INT(255) COMMENT 'Height of the carrier'
    
    );
    
    `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
          "role":"user",
          "content":`Input natural language: ${sql}\nOutput SQL (I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly.):\n`
      
        }
    ],
    temperature: 0,
    top_p: 1,
  });


  console.log(response.choices[0].message)

  



  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cool1234567890-',
    database: 'bmg'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  

    connection.query(response.choices[0].message.content, (err, results) => {
      if (err) {
        console.error('Error selecting data:', err);
      } else {
        console.log('Selected data:');
        console.log(results); // Log the query results
            connection.end();
  
  
        res.status(200).json({
          success: "success",
          sql:sql,
          result:results,
        });
      }
  
    });
  });



  }catch(e){
    res.status(404).json({
      message: "err",
      err:e,
    });
  }
  
};

module.exports = {

  OpenaiAPI
};
