

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
    model: "gpt-4o",
    messages: 
    [
          {"role": "system", "content": `I need you to write an SQL query for the following table schema in natural language. Please generate an executable SQL query without adding any extra characters apart from the SQL. The table schema is as follows:

          CREATE TABLE bmg_palletizer (
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
          "content":`Input natural language: ${sql}, give me the pure sql without any other format character`
      
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
  

    connection.query(`SELECT ${response.choices[0].message.content.split(';')[0].split('SELECT')[1]};`, (err, results) => {
      if (err) {
        console.error('Error selecting data:', err);
      } else {
        console.log('Selected data:');
        console.log(results); // Log the query results
        
        connection.query(`SELECT COLUMN_NAME, COLUMN_COMMENT
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = 'bmg'
        AND TABLE_NAME = 'bmg_palletizer';`, (err, comments) => {
          if (err) {
            console.error('Error selecting data:', err);
          } else {
            console.log('Selected data:');
            console.log(comments); // Log the query results
    
    
                connection.end();
      
      
            res.status(200).json({
              success: "success",
              sql:sql,
              result:results,
              comments
            });
          }
      
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



const RexrothAPI=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)

  let previousQuestions=req.body.previousQuestions
  console.log(previousQuestions)








  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: 
    [
          {"role": "system", "content": `\nYou are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed. I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly.\n The Database is MySQL. The table name and fields are as follows:  CREATE TABLE rexroth_high_precision_ball_runner_blocks_BSHP (
            nominalSize_mm_ TEXT COMMENT 'Nominal size [mm]',
            format TEXT COMMENT 'Format',
            typeOfConstruction TEXT COMMENT 'Type of construction',
            ballChain TEXT COMMENT 'Ball chain',
            material_profiledRailSystems_ TEXT COMMENT 'Material (profiled rail systems)',
            preloadClass TEXT COMMENT 'Preload class',
            accuracyClass TEXT COMMENT 'Accuracy class',
            seal TEXT COMMENT 'Seal',
            self_aligningForCompensationOfMisalignments TEXT COMMENT 'Self-aligning for compensation of misalignments',
            widthOfRunnerBlock_mm_ TEXT COMMENT 'Width of runner block [mm]',
            lengthOfRunnerBlock_mm_ TEXT COMMENT 'Length of runner block [mm]',
            heightOfRunnerBlock_mm_ TEXT COMMENT 'Height of runner block [mm]',
            heightOfRunnerBlockWithGuideRail_mm_ TEXT COMMENT 'Height of runner block with guide rail [mm]',
            lubrication TEXT COMMENT 'Lubrication',
            dynamicLoadCapacityC_n_ TEXT COMMENT 'Dynamic load capacity C [N]',
            footnoteDynamicLoadCapacityC TEXT COMMENT 'Footnote dynamic load capacity C',
            staticLongitudinalMomentLoadCapacityMl0_nm_ TEXT COMMENT 'Static longitudinal moment load capacity ML0 [Nm]',
            staticTorsionalMomentLoadCapacityMt0_nm_ TEXT COMMENT 'Static torsional moment load capacity Mt0 [Nm]',
            max_AccelerationAmax_m_s__ TEXT COMMENT 'Max. acceleration amax [m/s²]',
            note_Max_AccelerationAmax TEXT COMMENT 'Note: Max. acceleration amax',
            maximumPermissibleLinearSpeedVmax_m_s_ TEXT COMMENT 'Maximum permissible linear speed vmax [m/s]',
            dynamicTorsionalMomentLoadCapacityMt_nm_ TEXT COMMENT 'Dynamic torsional moment load capacity Mt [Nm]',
            dynamicTorsionalMomentLoadCapacityMtFootnote TEXT COMMENT 'Dynamic torsional moment load capacity Mt footnote',
            dynamicLongitudinalMomentLoadCapacityMl_nm_ TEXT COMMENT 'Dynamic longitudinal moment load capacity ML [Nm]',
            dynamicLongitudinalMomentLoadCapacityMlFootnote TEXT COMMENT 'Dynamic longitudinal moment load capacity ML footnote',
            staticLoadRatingC0_n_ TEXT COMMENT 'Static load rating C0 [N]',
            permissibleAmbientTemperature TEXT COMMENT 'Permissible ambient temperature',
            footnotePermissibleAmbientTemperature_min___Max_ TEXT COMMENT 'Footnote permissible ambient temperature (min ... max)',
            frictionCoefficient_ TEXT COMMENT 'Friction coefficient μ',
            footnoteFrictionCoefficient_ TEXT COMMENT 'Footnote friction coefficient μ',
            pitchTGuideRail_mm_ TEXT COMMENT 'Pitch T guide rail [mm]',
            version TEXT COMMENT 'Version',
            weight_kg_ TEXT COMMENT 'Weight [kg]',
            dimensionA_profiledRailSystems__mm_ TEXT COMMENT 'Dimension A (profiled rail systems) [mm]',
            dimensionA1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension A1 (profiled rail systems) [mm]',
            dimensionA2_profiledRailSystems__mm_ TEXT COMMENT 'Dimension A2 (profiled rail systems) [mm]',
            dimensionA3_profiledRailSystems__mm_ TEXT COMMENT 'Dimension A3 (profiled rail systems) [mm]',
            dimensionB_profiledRailSystems__mm_ TEXT COMMENT 'Dimension B (profiled rail systems) [mm]',
            dimensionBTolerance_profiledRailSystems__mm_ TEXT COMMENT 'Dimension B tolerance (profiled rail systems) [mm]',
            dimensionB1_mm_ TEXT COMMENT 'Dimension B1 [mm]',
            dimensionE1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E1 (profiled rail systems) [mm]',
            dimensionE2_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E2 (profiled rail systems) [mm]',
            dimensionE8_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E8 (profiled rail systems) [mm]',
            dimensionE9_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E9 (profiled rail systems) [mm]',
            dimensionH_profiledRailSystem__mm_ TEXT COMMENT 'Dimension H (profiled rail system) [mm]',
            dimensionH1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension H1 (profiled rail systems) [mm]',
            dimensionH2WithCoverStrip_profiledRailSystems__mm_ TEXT COMMENT 'Dimension H2 with cover strip (profiled rail systems) [mm]',
            dimensionH2WithoutCoverStrip_profiledRailSystems__mm_ TEXT COMMENT 'Dimension H2 without cover strip (profiled rail systems) [mm]',
            dimensionK1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension K1 (profiled rail systems) [mm]',
            dimensionK2_profiledRailSystems__mm_ TEXT COMMENT 'Dimension K2 (profiled rail systems) [mm]',
            dimensionK3_profiledRailSystems__mm_ TEXT COMMENT 'Dimension K3 (profiled rail systems) [mm]',
            dimensionK4_profiledRailSystems__mm_ TEXT COMMENT 'Dimension K4 (profiled rail systems) [mm]',
            dimensionN3_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N3 (profiled rail systems) [mm]',
            dimensionN6_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N6 (profiled rail systems) [mm]',
            dimensionN6Tolerance_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N6 tolerance (profiled rail systems) [mm]',
            dimensionS2_profiledRailSystems_ TEXT COMMENT 'Dimension S2 (profiled rail systems)',
            dimensionS5_profiledRailSystem__mm_ TEXT COMMENT 'Dimension S5 (profiled rail system) [mm]',
            dimensionS9ThreadDiameterXLead_profiledRailSystems__mm_ TEXT COMMENT 'Dimension S9 thread diameter x lead (profiled rail systems) [mm]',
            dimensionT1Min_profiledRailSystems__mm_ TEXT COMMENT 'Dimension T1 min (profiled rail systems) [mm]',
            dimensionV1_mm_ TEXT COMMENT 'Dimension V1 [mm]',
            dataSheet TEXT COMMENT 'Data sheet',
            operatingInstructions TEXT COMMENT 'Operating instructions',
            _2dCad_0 TEXT COMMENT '2D CAD_0',
            _2dCad_1 TEXT COMMENT '2D CAD_1',
            _3dCad_2 TEXT COMMENT '3D CAD_2',
            _3dCad_3 TEXT COMMENT '3D CAD_3',
            productlink TEXT COMMENT 'productLink',
            sealFootnote TEXT COMMENT 'Seal footnote',
            _3dCad_1 TEXT COMMENT '3D CAD_1',
            _2dCad_3 TEXT COMMENT '2D CAD_3',
            _3dCad_0 TEXT COMMENT '3D CAD_0',
            _2dCad_2 TEXT COMMENT '2D CAD_2',
            dimensionE3_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E3 (profiled rail systems) [mm]',
            dimensionE8_1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E8.1 (profiled rail systems) [mm]',
            dimensionE9_1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension E9.1 (profiled rail systems) [mm]',
            maximumDynamicLoadFmax_n_ TEXT COMMENT 'Maximum dynamic load Fmax [N]',
            maximumPermissibleTorsionalMomentMtMax_nm_ TEXT COMMENT 'Maximum permissible torsional moment Mt max [Nm]',
            maximumPermissibleLongitudinalLoadMomentMlMax_nm_ TEXT COMMENT 'Maximum permissible longitudinal load moment ML max [Nm]',
            dimensionN1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N1 (profiled rail systems) [mm]',
            dimensionN2_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N2 (profiled rail systems) [mm]',
            dimensionN4_profiledRailSystems__mm_ TEXT COMMENT 'Dimension N4 (profiled rail systems) [mm]',
            dimensionS1_profiledRailSystems__mm_ TEXT COMMENT 'Dimension S1 (profiled rail systems) [mm]',
            dimensionS11_profiledRailSystems__mm_ TEXT COMMENT 'Dimension S11 (profiled rail systems) [mm]',
            massM_g_ TEXT COMMENT 'Mass m [g]',
            _3dCad_4 TEXT COMMENT '3D CAD_4',
            sizeFootnote TEXT COMMENT 'Size footnote',
            dimensionH2_profiledRailSystems__mm_ TEXT COMMENT 'Dimension H2 (profiled rail systems) [mm]',
            dimensionS9ThreadDiameterXLeadWithTolerance_profiledRailSystems TEXT COMMENT 'Dimension S9 thread diameter x lead with tolerance (profiled rail systems) [mm]',
            _2dCad_dwg__2 TEXT COMMENT '2D CAD (DWG)_2',
            _2dCad_dxf__3 TEXT COMMENT '2D CAD (DXF)_3',
            heightOfGuideRailH2WithCoverStrip_mm_ TEXT COMMENT 'Height of guide rail H2 with cover strip [mm]'
          );
          
    
    `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
          "role":"user",
          "content":`Input natural language: ${sql}\n response: '''pure executable sql'''  \n`
      
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
  

    connection.query(`SELECT ${response.choices[0].message.content.split(';')[0].split('SELECT')[1]};`, (err, results) => {
      if (err) {
        console.error('Error selecting data:', err);
      } else {
        console.log('Selected data:');
        console.log(results); // Log the query results
        
        connection.query(`SELECT COLUMN_NAME, COLUMN_COMMENT
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = 'bmg'
        AND TABLE_NAME = 'rexroth_high_precision_ball_runner_blocks_BSHP';`, (err, comments) => {
          if (err) {
            console.error('Error selecting data:', err);
          } else {
            console.log('Selected data:');
            console.log(comments); // Log the query results
    
    
                connection.end();
      
      
            res.status(200).json({
              success: "success",
              sql:sql,
              result:results,
              comments
            });
          }
      
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


const FestoAPI=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)

  let previousQuestions=req.body.previousQuestions
  console.log(previousQuestions)








  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: 
    [
          {"role": "system", "content": `You are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed. I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly. The Database is MySQL. The table name and fields are as follows:  CREATE TABLE festo_round_cylinder (
            Stroke                                       VARCHAR(255) COMMENT 'Stroke: 1 mm ... 200 mm',
            PistonDiameter                               VARCHAR(255) COMMENT 'Piston diameter: 25 mm',
            Cushioning                                   VARCHAR(255) COMMENT 'Cushioning: Elastic cushioning rings/plates at both ends Self-adjusting pneumatic end-position cushioning',
            MountingPosition                             VARCHAR(255) COMMENT 'Mounting position: optional',
            Design                                       VARCHAR(255) COMMENT 'Design: Piston Piston rod Cylinder barrel',
            PositionDetection                            VARCHAR(255) COMMENT 'Position detection: Via proximity switch',
            Symbol                                       VARCHAR(255) COMMENT 'Symbol: 00991217',
            Variants                                     VARCHAR(255) COMMENT 'Variants: Metals with copper, zinc or nickel as main constituent are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils. Extended male piston rod thread Piston rod with female thread Extended piston rod Axial supply port Swivel mounting, end cap Lateral supply port Mounting thread, end cap Shortened male piston rod thread',
            OperatingPressureMPa                         VARCHAR(255) COMMENT 'Operating pressure: 0.06 MPa ... 1 MPa',
            OperatingPressureBar                         VARCHAR(255) COMMENT 'Operating pressure: 0.6 bar ... 10 bar',
            ModeOfOperation                              VARCHAR(255) COMMENT 'Mode of operation: Double-acting',
            OperatingMedium                              VARCHAR(255) COMMENT 'Operating medium: Compressed air to ISO 8573-1:2010 [7:4:4]',
            NoteOnOperatingAndPilotMedium                VARCHAR(255) COMMENT 'Note on operating and pilot medium: Lubricated operation possible (in which case lubricated operation will always be required)',
            CorrosionResistanceClassCRC                  VARCHAR(255) COMMENT 'Corrosion resistance class CRC: 0 - No corrosion stress',
            LABS_PWIS_Conformity                         VARCHAR(255) COMMENT 'LABS (PWIS) conformity: VDMA24364-B2-L',
            SuitabilityForTheProductionOfLi_ionBatteries VARCHAR(255) COMMENT 'Suitability for the production of Li-ion batteries: Metals with more than 1% by mass of copper, zinc or nickel by mass are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils',
            CleanroomClass                               VARCHAR(255) COMMENT 'Cleanroom class: Class 6 according to ISO 14644-1',
            AmbientTemperature                           VARCHAR(255) COMMENT 'Ambient temperature: -20 °C ... 80 °C',
            CushioningLength                             VARCHAR(255) COMMENT 'Cushioning length: 17 mm',
            TheoreticalForceAt0_6MPaReturnStroke         VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), return stroke: 247.4 N',
            TheoreticalForceAt0_6MPaAdvanceStroke        VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), advance stroke: 294.5 N',
            MovingMassFor0mmStroke                       VARCHAR(255) COMMENT 'Moving mass for 0 mm stroke: 63.6 g',
            AdditionalMovingMassPer10mmStroke            VARCHAR(255) COMMENT 'Additional moving mass per 10 mm stroke: 6 g',
            BasicWeightFor0mmStroke                      VARCHAR(255) COMMENT 'Basic weight for 0 mm stroke: 180.2 g',
            AdditionalWeightPer10mmStroke                VARCHAR(255) COMMENT 'Additional weight per 10 mm stroke: 11 g',
            TypeOfMounting                               VARCHAR(255) COMMENT 'Type of mounting: With accessories',
            PneumaticConnection                          VARCHAR(255) COMMENT 'Pneumatic connection: G1/8',
            NoteOnMaterials                              VARCHAR(255) COMMENT 'Note on materials: RoHS-compliant',
            MaterialCover                                VARCHAR(255) COMMENT 'Material cover: Anodised wrought aluminium alloy',
            MaterialSeals                                VARCHAR(255) COMMENT 'Material seals: TPE-U(PU)',
            MaterialPistonRod                            VARCHAR(255) COMMENT 'Material piston rod: High-alloy stainless steel',
            MaterialCylinderBarrel                       VARCHAR(255) COMMENT 'Material cylinder barrel: High-alloy stainless steel',
            OrderCode                                    VARCHAR(255) COMMENT 'Order code: DSNU-S-25- -F1A-',
            Code                                         VARCHAR(255) COMMENT 'Code 8148789',
            DataSheetLink                                VARCHAR(255) COMMENT 'Datasheet link: https://www.festo.com/de/en/a/download-document/datasheet/8148789',
            MannualLink                                  VARCHAR(255) COMMENT 'Mannual link: https://www.festo.com/media/pim/046/D15000100152046.PDF',
            ProductLink                                  VARCHAR(255) COMMENT 'https://www.festo.com/de/en/a/8148789'
        );
        
        
          
    
    `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
          "role":"user",
          "content":`Input natural language: ${sql}\n response: '''pure executable sql'''  \n`
      
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
  
  connection.query(`SELECT ${response.choices[0].message.content.split(';')[0].split('SELECT')[1]};`, (err, results) => {
    if (err) {
      console.error('Error selecting data:', err);
    } else {
      console.log('Selected data:');
      console.log(results); // Log the query results
      
      connection.query(`SELECT COLUMN_NAME, COLUMN_COMMENT
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = 'bmg'
      AND TABLE_NAME = 'festo_round_cylinder';`, (err, comments) => {
        if (err) {
          console.error('Error selecting data:', err);
        } else {
          console.log('Selected data:');
          console.log(comments); // Log the query results
  
  
              connection.end();
    
    
          res.status(200).json({
            success: "success",
            sql:sql,
            result:results,
            comments
          });
        }
    
      });

          
    }

  });



  }catch(e){
    res.status(404).json({
      message: "err",
      err:e,
    });
  }
  
};


const RexrothVarioFlowCategoryAPI=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)

  let previousQuestions=req.body.previousQuestions
  console.log(previousQuestions)








  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: 
    [
          {"role": "system", "content": `You are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed. I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly. The Database is MySQL. The table name and fields are as follows:          
          CREATE TABLE rexroth_varioflow_categories (
            category VARCHAR(255) PRIMARY KEY,
            parentCategory VARCHAR(255),
            categoryLink VARCHAR(255),
            FOREIGN KEY (parentCategory) REFERENCES rexroth_varioflow_categories(category)
        );    
    `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
          "role":"user",
          "content":`Input natural language, in the WHERE clause use LIKE '%keyword%' COLLATE SQL_Latin1_General_CP1_CI_AS as much as possible, instead of ='keyword': ${sql}\n response: '''pure executable sql'''  \n`
      
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
  
  connection.query(`SELECT ${response.choices[0].message.content.split(';')[0].split('SELECT')[1]};`, (err, results) => {
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



  }catch(e){
    res.status(404).json({
      message: "err",
      err:e,
    });
  }
  
};



module.exports = {

  OpenaiAPI,
  RexrothAPI,
  FestoAPI,
  RexrothVarioFlowCategoryAPI
};
