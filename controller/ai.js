

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
    messages: [
      {"role": "system", "content": `\nYou are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed.\n The Database is MySQL. Only one table called festo_round_cylinder in the database. The table name and fields are as follows: CREATE TABLE festo_round_cylinder (
        Stroke VARCHAR(255) COMMENT 'Stroke: 1 mm ... 200 mm',
        PistonDiameter VARCHAR(255) COMMENT 'Piston diameter: 25 mm',
        Cushioning VARCHAR(255) COMMENT 'Cushioning',
        MountingPosition VARCHAR(255) COMMENT 'Mounting position',
        Design VARCHAR(255) COMMENT 'Design',
        PositionDetection VARCHAR(255) COMMENT 'Position detection',
        Symbol VARCHAR(255) COMMENT 'Symbol',
        Variants VARCHAR(255) COMMENT 'Variants',
        OperatingPressureMPa VARCHAR(255) COMMENT 'Operating pressure: 0.06 MPa ... 1 MPa',
        OperatingPressureBar VARCHAR(255) COMMENT 'Operating pressure: 0.6 bar ... 10 bar',
        ModeOfOperation VARCHAR(255) COMMENT 'Mode of operation',
        OperatingMedium VARCHAR(255) COMMENT 'Operating medium',
        NoteOnOperatingAndPilotMedium VARCHAR(255) COMMENT 'Note on operating and pilot medium',
        CorrosionResistanceClassCRC VARCHAR(255) COMMENT 'Corrosion resistance class CRC: 0 - No corrosion stress',
        LABS_PWIS_Conformity VARCHAR(255) COMMENT 'LABS (PWIS) conformity',
        SuitabilityForTheProductionOfLi_ionBatteries VARCHAR(255) COMMENT 'Suitability for the production of Li-ion batteries',
        CleanroomClass VARCHAR(255) COMMENT 'Cleanroom class',
        AmbientTemperature VARCHAR(255) COMMENT 'Ambient temperature: -20 °C ... 80 °C',
        CushioningLength VARCHAR(255) COMMENT 'Cushioning length: 17 mm',
        TheoreticalForceAt0_6MPaReturnStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), return stroke: 247.4 N',
        TheoreticalForceAt0_6MPaAdvanceStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), advance stroke: 294.5 N',
        MovingMassFor0mmStroke VARCHAR(255) COMMENT 'Moving mass for 0 mm stroke: 63.6 g',
        AdditionalMovingMassPer10mmStroke VARCHAR(255) COMMENT 'Additional moving mass per 10 mm stroke: 6 g',
        BasicWeightFor0mmStroke VARCHAR(255) COMMENT 'Basic weight for 0 mm stroke: 180.2 g',
        AdditionalWeightPer10mmStroke VARCHAR(255) COMMENT 'Additional weight per 10 mm stroke: 11 g',
        TypeOfMounting VARCHAR(255) COMMENT 'Type of mounting',
        PneumaticConnection VARCHAR(255) COMMENT 'Pneumatic connection: G1/8',
        NoteOnMaterials VARCHAR(255) COMMENT 'Note on materials: RoHS-compliant',
        MaterialCover VARCHAR(255) COMMENT 'Material cover',
        MaterialSeals VARCHAR(255) COMMENT 'Material seals',
        MaterialPistonRod VARCHAR(255) COMMENT 'Material piston rod',
        MaterialCylinderBarrel VARCHAR(255) COMMENT 'Material cylinder barrel',
        OrderCode VARCHAR(255) COMMENT 'Order code',
        Code VARCHAR(255) COMMENT 'Code',
        DataSheetLink VARCHAR(255) COMMENT 'Datasheet link',
        MannualLink VARCHAR(255) COMMENT 'Mannual link',
        ProductLink VARCHAR(255) COMMENT 'ProductLink'
    
    ); `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
      "role":"user",
      "content":`Input natural language: ${sql}\nOutput SQL (I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly.):\n`
  
    }
    ],
    temperature: 0,
    top_p: 1,
  });


  console.log(response)

  


  res.status(200).json({
    success: "success",
    sql:sql,
    result:results,
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
