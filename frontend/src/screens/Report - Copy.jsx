import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import { QRCodeSVG } from "qrcode.react";
import "./Report.css";
import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

export default function ReportCopy() {
  let navigate = useNavigate();
  const pdfRef = useRef();
  const [dataArray, setDataArray] = useState([]);
  const testreportnum = useParams();

  const downloadPDF = () => {
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
        <PDFViewer width={1000} height={1000}>
          <Document>
            <Page>
              <Table className="table custom-table table-borderless">
                <TR>
                  <TD>
                    <TH>Test Report No. &nbsp;</TH>
                    <TD>: {dataArray.testreportnum}</TD>
                  </TD>
                  <TD>
                    <TH>ULR No. &nbsp;</TH>
                    <TD>: {dataArray.ulr}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>Issued To &nbsp;</TH>
                    <TD>: {dataArray.issuedto}</TD>
                  </TD>
                  <TD>
                    <TH>Issue Date &nbsp;</TH>
                    <TD>
                      :
                      {new Date(dataArray.issuedate).toLocaleDateString(
                        "en-GB"
                      )}
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TH>&nbsp;</TH>
                  <TD>&nbsp;</TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Name of Agency</p>
                    </TH>
                    <TD>: {dataArray.nameofagency}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Address</p>
                    </TH>
                    <TD>: {dataArray.address}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Sample Name</p>
                    </TH>
                    <TD>: {dataArray.samplename}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Make/Brand</p>
                    </TH>
                    <TD>: {dataArray.make_brand}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Sample Code</p>
                    </TH>
                    <TD>: {dataArray.samplecode}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Sample Receive Date</p>
                    </TH>
                    <TD>
                      :
                      {new Date(dataArray.samplereceivedate).toLocaleDateString(
                        "en-GB"
                      )}
                    </TD>
                  </TD>
                  <TD>
                    <TH
                      style={{
                        "text-align": "left",
                        margin: "0px",
                      }}
                    >
                      Test Start On:
                    </TH>
                    <TD>
                      {" "}
                      &nbsp;&nbsp;&nbsp;
                      {new Date(dataArray.teststartdate).toLocaleDateString(
                        "en-GB"
                      )}
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Analysis End On</p>
                    </TH>
                    <TD>
                      :{" "}
                      {new Date(dataArray.analysisenddate).toLocaleDateString(
                        "en-GB"
                      )}
                    </TD>
                  </TD>
                  <div className="qr-code">
                    <QRCodeSVG value={dataArray.qrurl} size={170} level="H" />
                    <p></p>
                    <p>SCAN FOR NABL CERTIFICATE AND SCOPE</p>
                  </div>
                </TR>
                <TR>
                  <TD>
                    <TH>&nbsp;</TH>
                    <TD>&nbsp;</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <u>Sample Details</u>
                    </TH>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Type/Grade/Variety</p>
                    </TH>
                    <TD>: {dataArray.type_grade_variety}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Nature of Sample</p>
                    </TH>
                    <TD>: {dataArray.natureofsample}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD className="declaredvalue-container">
                    <TH>Declared Value &nbsp;</TH>
                    <TD style={{ "padding-left": "8.5vw" }}>
                      <TD>
                        Thickness:
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </TD>

                      <TD>
                        <TD>Top: </TD>
                        <TD>
                          &nbsp;{dataArray.topthickness}{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </TD>
                      </TD>
                      <TD>
                        <TD>Middle: </TD>
                        <TD>
                          &nbsp;{dataArray.middlethickness}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </TD>
                      </TD>
                      <TD>
                        <TD>Bottom: </TD>
                        <TD>
                          &nbsp;{dataArray.bottomthickness}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </TD>
                      </TD>
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </TH>
                    <TD style={{ "padding-left": "7.8vw" }}>
                      <TD>Material &nbsp;</TD>
                      <TD>: {dataArray.material}</TD>
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </TH>
                    <TD style={{ "padding-left": "7.8vw" }}>
                      <TD>Nominal Capacity &nbsp;</TD>
                      <TD>: {dataArray.nominalcapacity}</TD>
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">IO Sign, Stamp & Seal</p>
                    </TH>
                    <TD>: {dataArray.iosign_stamp_seal}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Mode of Packing</p>
                    </TH>
                    <TD>: {dataArray.modeofpacking}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Description of Sample</p>
                    </TH>
                    <TD>: {dataArray.descriptionofsample} </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Quantity of Sample</p>
                    </TH>
                    <TD>: {dataArray.quantityofsample}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Batch No./Lot No.</p>
                    </TH>
                    <TD>: {dataArray.batchnum}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Date of Manufacturing</p>
                    </TH>
                    <TD>
                      :{" "}
                      {new Date(
                        dataArray.dateofmanufacturing
                      ).toLocaleDateString("en-GB")}
                    </TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Design/Size/Class</p>
                    </TH>
                    <TD>: {dataArray.design_size_class}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Shelf Life</p>
                    </TH>
                    <TD>: {dataArray.shelflife}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Any Other Information</p>
                    </TH>
                    <TD>: {dataArray.anyotherinformation}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Test Required</p>
                    </TH>
                    <TD>: {dataArray.testrequired}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Specification</p>
                    </TH>
                    <TD>: {dataArray.specification}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Reference Test Standards</p>
                    </TH>
                    <TD>: {dataArray.referenceteststandards}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Any Deviation in Methods</p>
                    </TH>
                    <TD>: {dataArray.anydeviationinmethods}</TD>
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <TH>
                      <p className="report-p">Amendment if any</p>
                    </TH>
                    <TD>: {dataArray.amendmentifany}</TD>
                  </TD>
                </TR>
              </Table>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
}
