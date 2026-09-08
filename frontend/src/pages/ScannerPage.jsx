import { useEffect, useRef, useState } from "react";
import { Html5Qrcode as QrScanner } from "html5-qrcode";
import api from "../services/api";

function ScannerPage() {
    const scanner = useRef(null);
    const scanning = useRef(false);
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [scannerError, setScannerError] = useState("");
    const [retry, setRetry] = useState(0);

    useEffect(() => {
            let stopped = false;
            const qrScanner = new QrScanner("reader");
            scanner.current = qrScanner;
            const startScanner = async () => {
            try {
                setScannerError("");
                await qrScanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: {width: 250, height: 250,},
                    },

                    async (qrCode) => {
                        if (stopped || scanning.current) {
                            return;
                        }
                        scanning.current = true;
                        console.log("QR Code:", qrCode);
                        try {
                            qrScanner.pause(true);
                        } catch (error) {
                            console.log("perror:", error);
                        }

                        await scanQr(qrCode);
                        setTimeout(() => {
                            if (!stopped) {
                                setResult(null);
                                setMessage("");
                                setType("");
                                scanning.current = false;
                                try {
                                    qrScanner.resume();
                                } catch (error) {
                                    console.log("Resume error:", error);
                                }
                            }}, 3000);
                    }
                );

                if (stopped) {
                    await qrScanner.stop();
                    qrScanner.clear();
                }
            } catch (error) {
                if (!stopped) {
                console.error("Scanner error:", error);
                if (error.name === "NotAllowedError") {
                    setScannerError("camera permission was denied. Please allow camera access");
                } else if (error.name === "NotFoundError") {
                    setScannerError("No camera was found on this device.");
                } else {
                    setScannerError("Unable to start the camera");
                }
            }
            }
        };

        startScanner();
        return () => {
            stopped = true;
            scanning.current = false;
            const stopScanner = async () => {
                try {
                    await qrScanner.stop();
                } catch (error) {
                    console.log("Scanner already stopped.");
                }

                try {
                    qrScanner.clear();
                } catch (error) {
                    console.log("Scanner already cleared.");
                }
            };
            stopScanner();
        };
    }, [retry]);

   const scanQr = async (qrCode) => {
    try {
        const response = await api.post("/api/attendance/scan",{qr_code: qrCode,});
        console.log("Attendance response:", response.data);
        if (response.data.outcome === "created") {
            setMessage(response.data.message);
            setType("success");
            setResult({
                student: response.data.student,
                attendance: response.data.attendance,
            });
        }

        else if (response.data.outcome === "already_marked") {
            setMessage(response.data.message);
            setType("error");
            setResult({student: response.data.student});
        }
        } catch (error) {
            console.error("Attendance error:", error);
            if (error.response?.status === 401) {
                setMessage("Your session has expired.log in again");
                setType("error");
            } else if (error.response?.status === 422) {
                setMessage(error.response.data.message ||"Invalid QR code");
                setType("error");
                if (error.response.data.student) {
                    setResult({student: error.response.data.student,});
                }
            } else if (error.request) {
                setMessage("Unable to connect to the server.please check your network connection.");
                setType("error");
            }
    }
};

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Scanner </h1>
                {scannerError && (
                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
                        <p>{scannerError}</p>
                        <button
                            onClick={() => setRetry(retry + 1)} //t
                            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Retry Camera</button>
                    </div>
                )}
                <p className="text-gray-500 mb-6">Scan a QR code to mark attendance.</p>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div id="reader" className="w-full"></div>
                </div>

                {message && (
                    <div className={`mt-6 p-5 rounded-lg border ${
                            type === "success" ? "bg-green-50 border-green-200 text-green-700": "bg-red-50 border-red-200 text-red-700"}`}>
                        <h3 className="font-semibold text-lg mb-3">{message}</h3>
                        {result?.student && (
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Student: </strong>{result.student.name}</p>
                                <p><strong>Student ID: </strong>{result.student.student_id}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScannerPage;