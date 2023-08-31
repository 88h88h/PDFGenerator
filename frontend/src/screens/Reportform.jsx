import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Reportform() {
  const [agencyName, setAgencyName] = useState("");
  const [issuedTo, setIssuedTo] = useState("");
  const [sampleName, setSampleName] = useState("");
  const [nominalcapacity, setNominalCapacity] = useState("");
  const [typeGradeVariety, setTypeGradeVariety] = useState("");
  const [designSizeClass, setDesignSizeClass] = useState("");
  const [reportnum, setReportNum] = useState("");
  const [extractedDate, setExtractedDate] = useState("");

  const [amendmentnum, setAmendmentnum] = useState(7);

  const [customTestReportNum, setCustomTestReportNum] = useState("");

  // Reference Test Standards
  const [testStandardDrop, setTestStandardDrop] = useState("");
  const [customTestStandardDrop, setCustomTestStandardDrop] = useState("");
  const handleTestStandardOther = (event) => {
    const selectedValue = event.target.value;
    setTestStandardDrop(selectedValue);
  };
  const handleCustomTestStandardOther = (event) => {
    const selectedValue = event.target.value;
    setCustomTestStandardDrop(selectedValue);
  };
  // Reference Test Standards End

  // Test Required
  const [testDrop, setTestDrop] = useState("");
  const [customTestDrop, setCustomTestDrop] = useState("");
  const handleTestOther = (event) => {
    const selectedValue = event.target.value;
    setTestDrop(selectedValue);
  };
  const handleCustomTestOther = (event) => {
    const selectedValue = event.target.value;
    setCustomTestDrop(selectedValue);
  };
  // Test Required End

  // Specification Drop
  const [specificationDrop, setSpecification] = useState("");
  const [customSpecificationDrop, setCustomSpecification] = useState("");
  const handleSpecificationOther = (event) => {
    const selectedValue = event.target.value;
    setSpecification(selectedValue);
  };
  const handleCustomSpecificationOther = (event) => {
    const selectedValue = event.target.value;
    setCustomSpecification(selectedValue);
  };
  // Specification Drop End

  useEffect(() => {
    if (reportnum.length >= 12) {
      const day = reportnum[10] + reportnum[11];
      const month = reportnum[8] + reportnum[9];
      const year = "20" + reportnum[6] + reportnum[7];
      const newDate = year + "-" + month + "-" + day;
      setExtractedDate(newDate);

      const newTestNum = reportnum.replace(/\//g, "-");
      setCustomTestReportNum(newTestNum);
    }
  }, [reportnum]);

  const handleReportNum = (event) => {
    const data = event.target.value;
    setReportNum(data);
  };

  const handleDate = (event) => {
    const data = event.target.value;
    setExtractedDate(data);
  };

  const handleAgencyName = (event) => {
    const data = event.target.value;
    setAgencyName(data);
  };
  const handleIssuedTo = (event) => {
    const data = event.target.value;
    setIssuedTo(data);
    setAgencyName(data);
  };
  const handleSampleName = (event) => {
    const data = event.target.value;
    setSampleName(data);
    setTypeGradeVariety(data);
    setNominalCapacity(data);
    setDesignSizeClass(data);
  };
  const handleTypeGrade = (event) => {
    const data = event.target.value;
    setTypeGradeVariety(data);
  };
  const handleCapacity = (event) => {
    const data = event.target.value;
    setNominalCapacity(data);
  };
  const handleDesignSize = (event) => {
    const data = event.target.value;
    setDesignSizeClass(data);
  };
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch("http://localhost:5000/report/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.jwttoken,
      },
      body: JSON.stringify({
        email: localStorage.email,
        testreportnum:
          reportnum.length >= 12
            ? customTestReportNum
            : data.get("testreportnum"),
        qrurl: data.get("qrurl"),
        ulr: data.get("ulr"),
        issuedto: data.get("issuedto"),
        issuedate: data.get("issuedate"),
        nameofagency: data.get("nameofagency"),
        address: data.get("address"),
        samplename: data.get("samplename"),
        make_brand: data.get("make_brand"),
        samplecode: data.get("samplecode"),
        samplereceivedate: data.get("samplereceivedate"),
        teststartdate: data.get("teststartdate"),
        analysisenddate: data.get("analysisenddate"),
        type_grade_variety: data.get("type_grade_variety"),
        natureofsample: data.get("natureofsample"),
        topthickness: data.get("topthickness"),
        middlethickness: data.get("middlethickness"),
        bottomthickness: data.get("bottomthickness"),
        material: data.get("material"),
        nominalcapacity: data.get("nominalcapacity"),
        iosign_stamp_seal: data.get("iosign_stamp_seal"),
        modeofpacking: data.get("modeofpacking"),
        descriptionofsample: data.get("descriptionofsample"),
        quantityofsample: data.get("quantityofsample"),
        batchnum: data.get("batchnum"),
        dateofmanufacturing: data.get("dateofmanufacturing"),
        design_size_class: data.get("design_size_class"),
        shelflife: data.get("shelflife"),
        anyotherinformation: data.get("anyotherinformation"),
        testrequired: testDrop === "Other" ? customTestDrop : testDrop,
        specification:
          specificationDrop === "Other"
            ? customSpecificationDrop
            : specificationDrop,
        referenceteststandards:
          testStandardDrop === "Other"
            ? customTestStandardDrop
            : testStandardDrop,
        anydeviationinmethods: data.get("anydeviationinmethods"),
        amendmentifany: data.get("amendmentifany"),
        actualnominalcapacity: data.get("actualnominalcapacity"),
        actualtop: data.get("actualtop"),
        actualmiddle: data.get("actualmiddle"),
        actualbottom: data.get("actualbottom"),
        transparency: data.get("transparency"),
        closureleakage: data.get("closureleakage"),
        vibrationleakage: data.get("vibrationleakage"),
        airpressureleakage: data.get("airpressureleakage"),
        verticaldrop: data.get("verticaldrop"),
        horizontaldrop: data.get("horizontaldrop"),
        migrationvolume: data.get("migrationvolume"),
        migrationsurface: data.get("migrationsurface"),
        colourmigration: data.get("colourmigration"),
        waterpotabilitysmell: data.get("waterpotabilitysmell"),
        waterpotabilitytaste: data.get("waterpotabilitytaste"),
        amendmentnum: data.get("amendmentnum"),
        barium: data.get("barium"),
        cobalt: data.get("cobalt"),
        copper: data.get("copper"),
        iron: data.get("iron"),
        lithium: data.get("lithium"),
        manganese: data.get("manganese"),
        zinc: data.get("zinc"),
        antimony: data.get("antimony"),
        phthalic: data.get("phthalic"),
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/reportlist");
    }
  };
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />

      {/* Main CONTENT STARTS */}
      <div className="container">
        <h1>Report Form</h1>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="row mb-3 form-group">
            <label htmlFor="testreportnum" className="col-sm-2 col-form-label">
              Test Report Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="testreportnum"
                name="testreportnum"
                value={reportnum}
                onChange={handleReportNum}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="qrurl" className="col-sm-2 col-form-label">
              QR Code URL
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="qrurl"
                name="qrurl"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="ulr" className="col-sm-2 col-form-label">
              ULR No.
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="ulr"
                name="ulr"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="nameofagency" className="col-sm-2 col-form-label">
              Issued To
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="issuedto"
                name="issuedto"
                value={issuedTo}
                onChange={handleIssuedTo}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="issuedate" className="col-sm-2 col-form-label">
              Issue Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="issuedate"
                name="issuedate"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="nameofagency" className="col-sm-2 col-form-label">
              Name of Agency
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="nameofagency"
                name="nameofagency"
                value={agencyName}
                onChange={handleAgencyName}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="samplename" className="col-sm-2 col-form-label">
              Sample Name (ml)
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="samplename"
                name="samplename"
                onChange={handleSampleName}
                value={sampleName}
                required
              >
                <option value="">Select Sample Size</option>
                <option value="250">250</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="make_brand" className="col-sm-2 col-form-label">
              Make/Brand
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="make_brand"
                name="make_brand"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="samplecode" className="col-sm-2 col-form-label">
              Sample Code
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="samplecode"
                name="samplecode"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="samplereceivedate"
              className="col-sm-2 col-form-label"
            >
              Sample Receive Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="samplereceivedate"
                name="samplereceivedate"
                defaultValue="2020-06-07"
                value={extractedDate}
                onChange={handleDate}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="teststartdate" className="col-sm-2 col-form-label">
              Test Start Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="teststartdate"
                name="teststartdate"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="analysisenddate"
              className="col-sm-2 col-form-label"
            >
              Analysis End Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="analysisenddate"
                name="analysisenddate"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="type_grade_variety"
              className="col-sm-2 col-form-label"
            >
              Type/Grade/Variety
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="type_grade_variety"
                name="type_grade_variety"
                value={typeGradeVariety}
                onChange={handleTypeGrade}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="natureofsample" className="col-sm-2 col-form-label">
              Nature of Sample
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="natureofsample"
                name="natureofsample"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="topthickness" className="col-sm-2 col-form-label">
              Declared Top Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="topthickness"
                name="topthickness"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="topthickness" className="col-sm-2 col-form-label">
              Declared Middle Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="middlethickness"
                name="middlethickness"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="bottomthickness"
              className="col-sm-2 col-form-label"
            >
              Declared Bottom Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="bottomthickness"
                name="bottomthickness"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="material" className="col-sm-2 col-form-label">
              Material
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="material"
                name="material"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="nominalcapacity"
              className="col-sm-2 col-form-label"
            >
              Declared Nominal Capacity
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="nominalcapacity"
                name="nominalcapacity"
                onChange={handleCapacity}
                value={nominalcapacity}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="iosign_stamp_seal"
              className="col-sm-2 col-form-label"
            >
              IO Sign/Stamp/Seal
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="iosign_stamp_seal"
                name="iosign_stamp_seal"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="modeofpacking" className="col-sm-2 col-form-label">
              Mode of Packing
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="modeofpacking"
                name="modeofpacking"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="descriptionofsample"
              className="col-sm-2 col-form-label"
            >
              Description of Sample
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="descriptionofsample"
                name="descriptionofsample"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="quantityofsample"
              className="col-sm-2 col-form-label"
            >
              Quantity of Sample
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="quantityofsample"
                name="quantityofsample"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="batchnum" className="col-sm-2 col-form-label">
              Batch Number
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="batchnum"
                name="batchnum"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="dateofmanufacturing"
              className="col-sm-2 col-form-label"
            >
              Date of Manufacturing
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="dateofmanufacturing"
                name="dateofmanufacturing"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="design_size_class"
              className="col-sm-2 col-form-label"
            >
              Design Size Class
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="design_size_class"
                name="design_size_class"
                onChange={handleDesignSize}
                value={designSizeClass}
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="shelflife" className="col-sm-2 col-form-label">
              Shelf Life
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="shelflife"
                name="shelflife"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="anyotherinformation"
              className="col-sm-2 col-form-label"
            >
              Any Other Information
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="anyotherinformation"
                name="anyotherinformation"
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="testrequired" className="col-sm-2 col-form-label">
              Test Required
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="testrequired"
                name="testrequired"
                onChange={handleTestOther}
                value={testDrop}
                required
              >
                <option value="">Select Test Required</option>
                <option value="All Tests as per IS">All Tests as per IS</option>
                <option value="Other">Other</option>
              </select>
              {testDrop === "Other" && (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCustomTestOther}
                    style={{ marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label htmlFor="specification" className="col-sm-2 col-form-label">
              Specification
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="specification"
                name="specification"
                onChange={handleSpecificationOther}
                value={specificationDrop}
                required
              >
                <option value="">Select Specification</option>
                <option value="IS 15410: 2003 with Amendment No. 7: 2022">
                  IS 15410: 2003 with Amendment No. 7: 2022
                </option>
                <option value="Other">Other</option>
              </select>
              {specificationDrop === "Other" && (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCustomSpecificationOther}
                    style={{ marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="referenceteststandards"
              className="col-sm-2 col-form-label"
            >
              Reference Test Standards
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="referenceteststandards"
                name="referenceteststandards"
                onChange={handleTestStandardOther}
                value={testStandardDrop}
                required
              >
                <option value="">Select Reference Test Standards</option>
                <option value="IS 15410: 2003 with Amendment No. 7: 2022">
                  IS 15410, IS 2798, IS 9845, IS 3025 (Part 5), IS 3025 (Part
                  8), ASTM E 1252
                </option>
                <option value="IS 15410">IS 15410</option>
                <option value="IS 2798">IS 2798</option>
                <option value="IS 9845">IS 9845</option>

                <option value="IS 3025 (Part 5)">IS 3025 (Part 5)</option>
                <option
                  value="IS 3025 (Part
                  8)"
                >
                  IS 3025 (Part 8)
                </option>
                <option value="ASTM E 1252">ASTM E 1252</option>
                <option value="Other">Other </option>
              </select>
              {testStandardDrop === "Other" && (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCustomTestStandardOther}
                    style={{ marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="anydeviationinmethods"
              className="col-sm-2 col-form-label"
            >
              Any Deviation in Methods
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="anydeviationinmethods"
                name="anydeviationinmethods"
                required
              />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <label
              htmlFor="anydeviationinmethods"
              className="col-sm-2 col-form-label"
            >
              Amendment If Any
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="amendmentifany"
                name="amendmentifany"
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="actualNominalCapacity"
              className="col-sm-2 col-form-label"
            >
              Actual Nominal Capacity
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.1"
                className="form-control"
                id="actualnominalcapacity"
                name="actualnominalcapacity"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="actualtop" className="col-sm-2 col-form-label">
              Actual Top Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="actualtop"
                name="actualtop"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="actualmiddle" className="col-sm-2 col-form-label">
              Actual Middle Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="actualmiddle"
                name="actualmiddle"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="actualbottom" className="col-sm-2 col-form-label">
              Actual Bottom Thickness
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="actualbottom"
                name="actualbottom"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="transparency" className="col-sm-2 col-form-label">
              Transparency (%)
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="transparency"
                name="transparency"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="closureleakage" className="col-sm-2 col-form-label">
              Closure Leakage
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="closureleakage"
                name="closureleakage"
                required
              >
                <option value="Passes the Test">Passes the Test</option>
                <option value="Does not pass the Test">
                  Does not pass the Test
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="vibrationleakage"
              className="col-sm-2 col-form-label"
            >
              Vibration Leakage
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="vibrationleakage"
                name="vibrationleakage"
                required
              >
                <option value="Passes the Test">Passes the Test</option>
                <option value="Does not pass the Test">
                  Does not pass the Test
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="airpressureleakage"
              className="col-sm-2 col-form-label"
            >
              Air Pressure Leakage
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="airpressureleakage"
                name="airpressureleakage"
                required
              >
                <option value="Passes the Test">Passes the Test</option>
                <option value="Does not pass the Test">
                  Does not pass the Test
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="verticaldrop" className="col-sm-2 col-form-label">
              Vertical Drop
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="verticaldrop"
                name="verticaldrop"
                required
              >
                <option value="Passes the Test">Passes the Test</option>
                <option value="Does not pass the Test">
                  Does not pass the Test
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="horizontaldrop" className="col-sm-2 col-form-label">
              Horizontal Drop
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="horizontaldrop"
                name="horizontaldrop"
                required
              >
                <option value="Passes the Test">Passes the Test</option>
                <option value="Does not pass the Test">
                  Does not pass the Test
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="migrationvolume"
              className="col-sm-2 col-form-label"
            >
              Overall Migration (Volume) (In mg/l)
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="migrationvolume"
                name="migrationvolume"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="migrationsurface"
              className="col-sm-2 col-form-label"
            >
              Overall Migration (Surface) (In mg/dm<sup>2</sup>)
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="migrationsurface"
                name="migrationsurface"
                required
              />
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="colourmigration"
              className="col-sm-2 col-form-label"
            >
              Colour Migration
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="colourmigration"
                name="colourmigration"
                required
              >
                <option value="No colour observed in Residue">
                  No colour observed in Residue
                </option>
                <option value="Color residue observed">
                  Color residue observed
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="waterpotabilitysmell"
              className="col-sm-2 col-form-label"
            >
              Water Potability Test for odour or smell
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="waterpotabilitysmell"
                name="waterpotabilitysmell"
                required
              >
                <option value="No Unpleasant odour Observed">
                  No Unpleasant odour Observed
                </option>
                <option value="Unpleasant odour observed">
                  Unpleasant odour observed
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label
              htmlFor="waterpotabilitytaste"
              className="col-sm-2 col-form-label"
            >
              Water Potability Test for taste
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="waterpotabilitytaste"
                name="waterpotabilitytaste"
                required
              >
                <option value="No Unpleasant or Bitter Taste Observed">
                  No Unpleasant or Bitter Taste Observed
                </option>
                <option value="Unpleasant taste observed">
                  Unpleasant taste observed
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3 form-group">
            <label htmlFor="amendmentnum" className="col-sm-2 col-form-label">
              Amendment No.
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="amendmentnum"
                name="amendmentnum"
                required
                onChange={(e) => setAmendmentnum(parseInt(e.target.value))}
              >
                <option value="7">7</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          {amendmentnum === 7 && (
            <div>
              <div className="row mb-3 form-group">
                <label htmlFor="barium" className="col-sm-2 col-form-label">
                  Barium
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="barium"
                    name="barium"
                    required
                  >
                    <option value="Not  Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="cobalt" className="col-sm-2 col-form-label">
                  Cobalt
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="cobalt"
                    name="cobalt"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="copper" className="col-sm-2 col-form-label">
                  Copper
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="copper"
                    name="copper"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="iron" className="col-sm-2 col-form-label">
                  Iron
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="iron"
                    name="iron"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="lithium" className="col-sm-2 col-form-label">
                  Lithium
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="lithium"
                    name="lithium"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="manganese" className="col-sm-2 col-form-label">
                  Manganese
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="manganese"
                    name="manganese"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="zinc" className="col-sm-2 col-form-label">
                  Zinc
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="zinc"
                    name="zinc"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="antimony" className="col-sm-2 col-form-label">
                  Antimony
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="antimony"
                    name="antimony"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <label htmlFor="phthalic" className="col-sm-2 col-form-label">
                  Phthalic acid, bis(2-ethylhexyl) ester (DEHP)
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="phthalic"
                    name="phthalic"
                    required
                  >
                    <option value="Not Detected">Not Detected</option>
                    <option value="Detected">Detected</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
