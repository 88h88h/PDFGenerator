const { connection } = require("../db");

module.exports.addData = async (req, res) => {
  try {
    const {
      email,
      testreportnum,
      qrurl,
      ulr,
      issuedto,
      issuedate,
      nameofagency,
      address,
      samplename,
      make_brand,
      samplecode,
      samplereceivedate,
      teststartdate,
      analysisenddate,
      type_grade_variety,
      natureofsample,
      topthickness,
      middlethickness,
      bottomthickness,
      material,
      nominalcapacity,
      iosign_stamp_seal,
      modeofpacking,
      descriptionofsample,
      quantityofsample,
      batchnum,
      dateofmanufacturing,
      design_size_class,
      shelflife,
      anyotherinformation,
      testrequired,
      specification,
      referenceteststandards,
      anydeviationinmethods,
      amendmentifany,
      actualnominalcapacity,
      actualtop,
      actualmiddle,
      actualbottom,
      transparency,
      closureleakage,
      vibrationleakage,
      airpressureleakage,
      verticaldrop,
      horizontaldrop,
      migrationvolume,
      migrationsurface,
      colourmigration,
      waterpotabilitysmell,
      waterpotabilitytaste,
      amendmentnum,
      cobalt,
      copper,
      iron,
      lithium,
      manganese,
      zinc,
      antimony,
      phthalic,
    } = req.body;

    const q = `INSERT INTO report (email, testreportnum, qrurl, ulr, issuedto, issuedate, nameofagency, address, samplename, make_brand, samplecode, samplereceivedate, teststartdate, analysisenddate, type_grade_variety, natureofsample, topthickness, middlethickness, bottomthickness, material, nominalcapacity, iosign_stamp_seal, modeofpacking, descriptionofsample, quantityofsample, batchnum, dateofmanufacturing, design_size_class, shelflife, anyotherinformation, testrequired, specification, referenceteststandards, anydeviationinmethods, amendmentifany, actualnominalcapacity, actualtop, actualmiddle, actualbottom, transparency, closureleakage, vibrationleakage, airpressureleakage, verticaldrop, horizontaldrop, migrationvolume, migrationsurface, colourmigration, waterpotabilitysmell, waterpotabilitytaste, amendmentnum, cobalt, copper, iron, lithium, manganese, zinc, antimony, phthalic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      email,
      testreportnum,
      qrurl,
      ulr,
      issuedto,
      issuedate,
      nameofagency,
      address,
      samplename,
      make_brand,
      samplecode,
      samplereceivedate,
      teststartdate,
      analysisenddate,
      type_grade_variety,
      natureofsample,
      topthickness,
      middlethickness,
      bottomthickness,
      material,
      nominalcapacity,
      iosign_stamp_seal,
      modeofpacking,
      descriptionofsample,
      quantityofsample,
      batchnum,
      dateofmanufacturing,
      design_size_class,
      shelflife,
      anyotherinformation,
      testrequired,
      specification,
      referenceteststandards,
      anydeviationinmethods,
      amendmentifany,
      actualnominalcapacity,
      actualtop,
      actualmiddle,
      actualbottom,
      transparency,
      closureleakage,
      vibrationleakage,
      airpressureleakage,
      verticaldrop,
      horizontaldrop,
      migrationvolume,
      migrationsurface,
      colourmigration,
      waterpotabilitysmell,
      waterpotabilitytaste,
      amendmentnum,
      cobalt,
      copper,
      iron,
      lithium,
      manganese,
      zinc,
      antimony,
      phthalic,
    ];

    connection.query(q, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error in adding the data" });
      } else {
        console.log("Data added successfully to the 'report' table");
        res
          .status(200)
          .json({ success: true, message: "Data added successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in adding the data" });
  }
};

module.exports.getData = async (req, res) => {
  try {
    const { email, testreportnum } = req.body;
    let q = "";
    let values = [];
    if (testreportnum == "") {
      q = `SELECT * FROM report WHERE email = ?`;
      values = [email];
    } else {
      q = `SELECT * FROM report WHERE email = ? AND testreportnum = ?`;
      values = [email, testreportnum];
    }

    connection.query(q, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching the data" });
      } else {
        console.log("Data fetched successfully");
        res.status(200).json({ data: results });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching the data" });
  }
};
