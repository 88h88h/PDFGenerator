import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import { QRCodeSVG } from "qrcode.react";
import "./Report.css";

export default function Report() {
  let navigate = useNavigate();
  const pdfRef = useRef();
  const [dataArray, setDataArray] = useState([]);
  const testreportnum = useParams();

  const downloadPDF = () => {
    const tableCells = document.querySelectorAll("td");

    for (const cell of tableCells) {
      if (cell.style.backgroundColor === "red") {
        alert("There are invalid cells in the form!");
        return;
      }
    }

    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;

      pdf.addImage(
        imgData,
        "png",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${dataArray.testreportnum}`);
    });
  };
  useEffect(() => {
    console.log("useEffect Ran");
    async function getData() {
      try {
        console.log(testreportnum.id);
        const response = await fetch("http://localhost:5000/report/get", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.jwttoken,
          },
          body: JSON.stringify({
            email: localStorage.email,
            testreportnum: testreportnum.id,
          }),
        });

        const json = await response.json();
        if (json.message === "Access Denied") {
          navigate("/login");
          alert("Access Denied");
          return;
        }
        const mainData = json.data[0];
        setDataArray(mainData);
        console.log(mainData);
      } catch (error) {
        console.log({ error: error.message });
      }
    }
    getData();
  }, [testreportnum.id, navigate]);
  return (
    <div>
      <Navbar />
      <div>
        <button
          type="button"
          class="btn btn-primary"
          style={{ margin: "5vh" }}
          onClick={downloadPDF}
        >
          Download
        </button>
      </div>
      <div className="report" ref={pdfRef}>
        <div className="report-head">
          <h6 style={{ "font-weight": "bold" }}>TEST REPORT</h6>
        </div>
        <div
          className="table-responsive small"
          style={{ "margin-left": "21vw", "margin-right": "21vw" }}
        >
          {/* TABLE 1 */}
          <table className="table custom-table table-borderless">
            <tbody>
              <tr>
                <td>
                  <th>Test Report No. &nbsp;</th>
                  <td>: {dataArray.testreportnum}</td>
                </td>
                <td>
                  <th>ULR No. &nbsp;</th>
                  <td>: {dataArray.ulr}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>Issued To &nbsp;</th>
                  <td>: {dataArray.issuedto}</td>
                </td>
                <td>
                  <th>Issue Date &nbsp;</th>
                  <td>
                    :{new Date(dataArray.issuedate).toLocaleDateString("en-GB")}
                  </td>
                </td>
              </tr>
              <tr>
                <th>&nbsp;</th>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Name of Agency</p>
                  </th>
                  <td>: {dataArray.nameofagency}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Address</p>
                  </th>
                  <td>: {dataArray.address}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Sample Name</p>
                  </th>
                  <td>: {dataArray.samplename}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Make/Brand</p>
                  </th>
                  <td>: {dataArray.make_brand}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Sample Code</p>
                  </th>
                  <td>: {dataArray.samplecode}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Sample Receive Date</p>
                  </th>
                  <td>
                    :{" "}
                    {new Date(dataArray.samplereceivedate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </td>
                <td>
                  <th>
                    <p
                      style={{
                        "text-align": "left",
                        margin: "0px",
                      }}
                    >
                      Test Start On:
                    </p>
                  </th>
                  <td>
                    {" "}
                    &nbsp;&nbsp;&nbsp;
                    {new Date(dataArray.teststartdate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Analysis End On</p>
                  </th>
                  <td>
                    :{" "}
                    {new Date(dataArray.analysisenddate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </td>
                <div className="qr-code">
                  <QRCodeSVG value={dataArray.qrurl} size={170} level="H" />
                  <p></p>
                  <p>SCAN FOR NABL CERTIFICATE AND SCOPE</p>
                </div>
              </tr>
              <tr>
                <td>
                  <th>&nbsp;</th>
                  <td>&nbsp;</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <u>Sample Details</u>
                  </th>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Type/Grade/Variety</p>
                  </th>
                  <td>: {dataArray.type_grade_variety}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Nature of Sample</p>
                  </th>
                  <td>: {dataArray.natureofsample}</td>
                </td>
              </tr>
              <tr>
                <td className="declaredvalue-container">
                  <th>Declared Value &nbsp;</th>
                  <td style={{ "padding-left": "8.5vw" }}>
                    <td>
                      Thickness:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>

                    <td>
                      <td>Top: </td>
                      <td>
                        &nbsp;{dataArray.topthickness}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                    </td>
                    <td>
                      <td>Middle: </td>
                      <td>
                        &nbsp;{dataArray.middlethickness}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                    </td>
                    <td>
                      <td>Bottom: </td>
                      <td>
                        &nbsp;{dataArray.bottomthickness}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                    </td>
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <td style={{ "padding-left": "7.8vw" }}>
                    <td>Material &nbsp;</td>
                    <td>: {dataArray.material}</td>
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <td style={{ "padding-left": "7.8vw" }}>
                    <td>Nominal Capacity &nbsp;</td>
                    <td>: {dataArray.nominalcapacity}</td>
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">IO Sign, Stamp & Seal</p>
                  </th>
                  <td>: {dataArray.iosign_stamp_seal}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Mode of Packing</p>
                  </th>
                  <td>: {dataArray.modeofpacking}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Description of Sample</p>
                  </th>
                  <td>: {dataArray.descriptionofsample} </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Quantity of Sample</p>
                  </th>
                  <td>: {dataArray.quantityofsample}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Batch No./Lot No.</p>
                  </th>
                  <td>: {dataArray.batchnum}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Date of Manufacturing</p>
                  </th>
                  <td>
                    :{" "}
                    {new Date(dataArray.dateofmanufacturing).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Design/Size/Class</p>
                  </th>
                  <td>: {dataArray.design_size_class}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Shelf Life</p>
                  </th>
                  <td>: {dataArray.shelflife}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Any Other Information</p>
                  </th>
                  <td>: {dataArray.anyotherinformation}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Test Required</p>
                  </th>
                  <td>: {dataArray.testrequired}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Specification</p>
                  </th>
                  <td>: {dataArray.specification}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Reference Test Standards</p>
                  </th>
                  <td>: {dataArray.referenceteststandards}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Any Deviation in Methods</p>
                  </th>
                  <td>: {dataArray.anydeviationinmethods}</td>
                </td>
              </tr>
              <tr>
                <td>
                  <th>
                    <p className="report-p">Amendment if any</p>
                  </th>
                  <td>: {dataArray.amendmentifany}</td>
                </td>
              </tr>
            </tbody>
          </table>
          {/* END OF TABLE 1 */}

          {/* TABLE 2 */}
          <div style={{ "margin-top": "20px", "margin-bottom": "0px" }}>
            <h7 style={{ "font-weight": "bold" }}>TEST RESULT</h7>
          </div>
          <table class="table table-bordered border-dark">
            <thead>
              <tr style={{ "text-align": "left" }}>
                <th scope="col">S. No.</th>
                <th scope="col">Characteristic</th>
                <th scope="col">Results</th>
                <th scope="col">Requirement (Acceptable Limit)</th>
                <th scope="col">Method of Test</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ "text-align": "left" }}>
                <td>i)</td>
                <td>Material</td>
                <td style={{ "text-align": "center" }}>PET</td>
                <td>
                  Shall Be (PE IS 10146, PVC IS 10151, PET or PBT IS 12252, PP
                  IS 10910, PC IS 14971, PS IS 10142) Cls. 4.1 of IS 15410
                </td>
                <td>ASTM E 1252</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>ii)</td>
                <td>Design, Shape & Dimensions</td>
                <td style={{ "text-align": "center" }}>Conforms</td>
                <td>
                  Shall be of suitable design, shape and dimension, Cls. 4.2 of
                  IS 15410
                </td>
                <td>4.2 of IS 15410</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td></td>
                <td></td>
                <td style={{ "text-align": "center" }}>Conforms</td>
                <td>
                  Shall be provided with suitable closures made of metal or
                  pilffer-proof in character,
                </td>
                <td>4.2 of IS 15410</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>iii)</td>
                <td>Manufacture, Workmanship, finish and Appearance</td>
                <td style={{ "text-align": "center" }}>Conforms</td>
                <td>
                  Shall be free from any visual defects like cavities, crevices,
                  flaws, stain etc. Cls. 4.3 IS of 15410
                </td>
                <td>4.3 of IS 15410</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>iv)</td>
                <td>Capacity (ml)</td>
                <td style={{ "text-align": "center" }}></td>
                <td>Cls. 4.4 of IS 15410</td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Nominal Capacity</td>
                <td style={{ "text-align": "center" }}>
                  {dataArray.nominalcapacity} ml
                </td>
                <td>
                  Quantity of water Packed Shall be Specified by Manufacturer
                </td>
                <td>IS 15410</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td
                  style={{ "text-align": "center", "vertical-align": "middle" }}
                  rowSpan={2}
                >
                  b.
                </td>
                <td style={{ "vertical-align": "middle" }} rowSpan={2}>
                  Brimful Capacity
                </td>
                <td style={{ "text-align": "center" }}>
                  {dataArray.actualnominalcapacity} ml
                </td>
                <td rowSpan={2} style={{ "vertical-align": "middle" }}>
                  Shall exceed the nominal capacity by 1.5 %
                </td>
                <td rowSpan={2} style={{ "vertical-align": "middle" }}>
                  5 of IS 2798
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor:
                      ((dataArray.actualnominalcapacity -
                        dataArray.nominalcapacity) *
                        100) /
                        dataArray.nominalcapacity <
                      1.5
                        ? "red"
                        : "transparent",
                  }}
                >
                  {((dataArray.actualnominalcapacity -
                    dataArray.nominalcapacity) *
                    100) /
                    dataArray.nominalcapacity}
                  %
                </td>
              </tr>

              {/* 2nd Page */}

              <tr style={{ "text-align": "left" }}>
                <td>v)</td>
                <td>Wall Thickness (mm) </td>
                <td style={{ "text-align": "center" }}></td>
                <td>Cls. 4.5 of IS 15410</td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Top</td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.topthickness -
                        (dataArray.topthickness * 2) / 100 >
                      dataArray.actualtop
                        ? "red"
                        : "transparent",
                  }}
                >
                  {dataArray.actualtop}
                </td>
                <td>-2 % of Declared Value</td>
                <td>4.5.2 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>b.</td>
                <td>Middle</td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.middlethickness -
                        (dataArray.middlethickness * 2) / 100 >
                      dataArray.actualmiddle
                        ? "red"
                        : "transparent",
                  }}
                >
                  {dataArray.actualmiddle}
                </td>
                <td>-2 % of Declared Value</td>
                <td>4.5.2 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>c.</td>
                <td>Bottom</td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.bottomthickness -
                        (dataArray.bottomthickness * 2) / 100 >
                      dataArray.actualbottom
                        ? "red"
                        : "transparent",
                  }}
                >
                  {dataArray.actualbottom}
                </td>
                <td>-2 % of Declared Value</td>
                <td>4.5.2 of IS 2798</td>
              </tr>
              <tr
                style={{
                  "text-align": "left",
                }}
              >
                <td>vi)</td>
                <td>Transparency (%) </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.transparency < 85 ? "red" : "transparent",
                  }}
                >
                  {dataArray.transparency}
                </td>
                <td>Shall not be less than 85 %, Cls. 4.6.2 of IS 15410</td>
                <td>Ann. A of IS 15410</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>vii)</td>
                <td>Leakage Test </td>
                <td style={{ "text-align": "center" }}></td>
                <td>Cls. 4.6.3 of IS 15410</td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Closure Leakage </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.closureleakage === "Passes the Test"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.closureleakage}
                </td>
                <td>Shall Pass The Test</td>
                <td>6.1 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>b.</td>
                <td>Vibration Leakage </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.vibrationleakage === "Passes the Test"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.vibrationleakage}
                </td>
                <td>Shall Pass The Test</td>
                <td>6.2 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>c.</td>
                <td>Air Pressure Leakage </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.airpressureleakage === "Passes the Test"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.airpressureleakage}
                </td>
                <td>Shall Pass The Test</td>
                <td>6.3 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>viii)</td>
                <td>Drop Test </td>
                <td style={{ "text-align": "center" }}></td>
                <td>Cls. 4.6.4 of IS 15410</td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Vertical Drop </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.verticaldrop === "Passes the Test"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.verticaldrop}
                </td>
                <td rowSpan={2} style={{ "vertical-align": "middle" }}>
                  Container shall not rupture nor shall there be any leakage
                  from the walls of the container. Slight deshaping of the body
                  shall not render the containers unacceptable the test
                </td>
                <td>8 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>b.</td>
                <td>Horizontal Drop </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.horizontaldrop === "Passes the Test"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.horizontaldrop}
                </td>

                <td>8 of IS 2798</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>ix)</td>
                <td>Migration Test </td>
                <td style={{ "text-align": "center" }}></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Overall Migration (Volume) </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.migrationvolume > 60 ? "red" : "transparent",
                  }}
                >
                  {dataArray.migrationvolume}
                </td>
                <td>Max. 60 mg/l , 4.6.5 of IS 15410</td>
                <td>5, 6, & 7 of IS 9845</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>b.</td>
                <td>Overall Migration (Surface) </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.migrationsurface > 10 ? "red" : "transparent",
                  }}
                >
                  {dataArray.migrationsurface}
                </td>
                <td>Max. 10 mg/l , 4.6.5 of IS 15410</td>
                <td>5, 6, & 7 of IS 9845</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>c.</td>
                <td>Colour Migration </td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.colourmigration ===
                      "No colour observed in Residue"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.colourmigration}
                </td>
                <td>
                  colour migrated to simulant shall not be apparent to naked eye
                </td>
                <td>11 of IS 9845</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td>ix)</td>
                <td>Water Potability Test </td>
                <td style={{ "text-align": "center" }}></td>
                <td>Cls. 4.6.6 & Ann. B of IS 15410</td>
                <td></td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Water Potability Test for odour or smell</td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.waterpotabilitysmell ===
                      "No Unpleasant odour Observed"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.waterpotabilitysmell}
                </td>
                <td>
                  at the end of 30 days, the water shall not Acquire any
                  unpleasant odour
                </td>
                <td>IS 3025 (Part 5)</td>
              </tr>
              <tr style={{ "text-align": "left" }}>
                <td style={{ "text-align": "center" }}>a.</td>
                <td>Water Potability Test for Taste</td>
                <td
                  style={{
                    "text-align": "center",
                    backgroundColor:
                      dataArray.waterpotabilitytaste ===
                      "No Unpleasant or Bitter Taste Observed"
                        ? "transparent"
                        : "red",
                  }}
                >
                  {dataArray.waterpotabilitytaste}
                </td>
                <td>
                  at the end of 30 days, the water shall not Acquire any
                  unpleasant or bitter taste
                </td>
                <td>IS 3025 (Part 8)</td>
              </tr>
            </tbody>
          </table>
          {/* End of TABLE 2 */}
          <p
            style={{ textAlign: "left", marginTop: "-18px", fontSize: "12px" }}
          >
            Conformity statement: The sample Provided by Party for testing as
            per IS 15410: 2003 with Amendment No. {dataArray.amendmentnum}:
            2022, Conforms the Requirements of The Specifications mentioned and
            other test methods used.
          </p>
          <p style={{ textAlign: "left", marginTop: "-18px" }}>
            <span style={{ fontSize: "12px" }}>
              Opinion and Interpretation: NA
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Reviewed By: Karan Singh
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            For, Hexiqon Laboratory
          </p>
          <p
            style={{
              textAlign: "right",
              marginTop: "60px",
              marginRight: "105px",
            }}
          >
            (Authorised Signatory)
          </p>
          {/* TABLE 3 (Optional) */}
          {dataArray.amendmentnum === 7 && (
            <div>
              <h6 style={{ textAlign: "center", fontWeight: "bolf" }}>
                TEST REPORT
              </h6>
              <table className="table custom-table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <th>Test Report No. &nbsp;</th>
                      <td>: {dataArray.testreportnum}</td>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <th>Issued To &nbsp;</th>
                      <td>: {dataArray.issuedto}</td>
                    </td>
                    <td>
                      <th>Issue Date &nbsp;</th>
                      <td>
                        :{" "}
                        {new Date(dataArray.issuedate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Address</p>
                      </th>
                      <td>: {dataArray.address}</td>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Sample Name</p>
                      </th>
                      <td>: {dataArray.samplename} ml PET Bottle</td>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Sample Receive Date</p>
                      </th>
                      <td>
                        :{" "}
                        {new Date(
                          dataArray.samplereceivedate
                        ).toLocaleDateString("en-GB")}
                      </td>
                    </td>
                    <td>
                      <th>
                        <p
                          style={{
                            "text-align": "left",
                            margin: "0px",
                          }}
                        >
                          Test Start On:
                        </p>
                      </th>
                      <td>
                        {" "}
                        &nbsp;&nbsp;&nbsp;
                        {new Date(dataArray.teststartdate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Analysis End On</p>
                      </th>
                      <td>
                        :{" "}
                        {new Date(dataArray.analysisenddate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Test Required </p>
                      </th>
                      <td>: Specific Migration</td>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Specification </p>
                      </th>
                      <td>: {dataArray.specification}</td>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <th>
                        <p className="report-p">Reference Test Standards </p>
                      </th>
                      <td>: {dataArray.referenceteststandards}</td>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* END OF TABLE 3 */}
              <h6
                style={{
                  textAlign: "center",
                  fontWeight: "bolf",
                  marginTop: "60px",
                }}
              >
                Test Result Cont...
              </h6>

              {/* LAST TABLE */}
              <table class="table table-bordered border-dark">
                <thead>
                  <tr style={{ "text-align": "left" }}>
                    <th scope="col">S. No.</th>
                    <th scope="col">Characteristic</th>
                    <th scope="col">Results</th>
                    <th scope="col">Requirement (Acceptable Limit)</th>
                    <th scope="col">Method of Test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ "text-align": "left" }}>
                    <td></td>
                    <td>Specific Migration</td>
                    <td style={{ "text-align": "center" }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>i)</td>
                    <td>Barium</td>
                    <td
                      style={{
                        backgroundColor:
                          dataArray.barium === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.barium}
                    </td>
                    <td style={{ "text-align": "center" }}>1.0 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>ii)</td>
                    <td>Cobalt</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.cobalt === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.cobalt}
                    </td>
                    <td style={{ "text-align": "center" }}>0.05 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>iii)</td>
                    <td>Copper</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.copper === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.copper}
                    </td>
                    <td style={{ "text-align": "center" }}>5.0 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>iv)</td>
                    <td>Iron</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.iron === "Detected" ? "red" : "transparent",
                      }}
                    >
                      {dataArray.iron}
                    </td>
                    <td style={{ "text-align": "center" }}>48.0 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>v)</td>
                    <td>Lithium</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.lithium === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.lithium}
                    </td>
                    <td style={{ "text-align": "center" }}>0.6 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>vi)</td>
                    <td>Manganese</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.manganese === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.manganese}
                    </td>
                    <td style={{ "text-align": "center" }}>0.6 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>vii)</td>
                    <td>Zinc</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.zinc === "Detected" ? "red" : "transparent",
                      }}
                    >
                      {dataArray.zinc}
                    </td>
                    <td style={{ "text-align": "center" }}>25.0 mg/kg, max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>
                  <tr style={{ "text-align": "left" }}>
                    <td>viii)</td>
                    <td>Antimony</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.antimony === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.antimony}
                    </td>
                    <td style={{ "text-align": "center" }}>0.04 mg/kg max.</td>
                    <td>IS 3025 part 2</td>
                  </tr>

                  <tr style={{ "text-align": "left" }}>
                    <td>ix)</td>
                    <td>Phthalic acid, bis(2-ethylhexyl) ester (DEHP)</td>

                    <td
                      style={{
                        backgroundColor:
                          dataArray.phthalic === "Detected"
                            ? "red"
                            : "transparent",
                      }}
                    >
                      {dataArray.phthalic}
                    </td>
                    <td style={{ "text-align": "center" }}>1.5 mg/kg, max.</td>
                    <td>ISO 18856</td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  textAlign: "left",
                  marginTop: "-14px",
                  fontSize: "12px",
                }}
              >
                Conformity statement: The sample Provided by Party for testing
                as per IS 15410: 2003 with Amendment No. 7: 2022, Conforms the
                Requirements of The Specifications mentioned and other test
                methods used.
              </p>
              <p
                style={{
                  textAlign: "left",
                  marginTop: "-14px",
                  fontSize: "12px",
                }}
              >
                Note: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parameter Mentioned in
                this part of Report are not Accredited by NABL, however Same are
                Approved by BIS by letter Dated 29-12-2022<br></br>Opinion and
                Interpretation: NA
              </p>
              <p
                style={{
                  textAlign: "left",
                  marginTop: "-18px",
                  marginLeft: "360px",
                }}
              >
                Reviewed By: Karan Singh
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                For, Hexiqon Laboratory
              </p>
              <p
                style={{
                  textAlign: "right",
                  marginTop: "60px",
                  marginRight: "78px",
                }}
              >
                (Authorised Signatory)
              </p>
              <p
                style={{
                  textAlign: "left",
                  marginTop: "-14px",
                  fontSize: "10px",
                }}
              >
                Note: <br></br>
                1. This report, in full or in part, shall not be published,
                advertised, used for any legal action, unless prior written
                permission has been secured from the Director General BIS. 2.
                This test report is ONLY FOR THE SAMPLE TESTED. 3. This Report
                is for BIS Cerification Marks Purpose Only."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
