import { useEffect, useRef, useState } from "react";
import { Html5Qrcode as QrScanner } from "html5-qrcode";
import api from "../services/api";

function ScannerPage() {
    const scanner = useRef(null);
    const scanning = useRef(false);
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        let stopped = false;
        const qrScanner = new QrScanner("reader");
        scanner.current = qrScanner;

        const startScanner = async () => {
            try {
                await qrScanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
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
                            console.log("Pause error:", error);
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
                            }
                        }, 3000);
                    }
                );

                if (stopped) {
                    await qrScanner.stop();
                    qrScanner.clear();
                }
            } catch (error) {
                if (!stopped) {
                    console.error("Scanner error:", error);
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
    }, []);

    const scanQr = async (qrCode) => {
        try {
            const response = await api.post(
                "/api/attendance/scan",
                {
                    qr_code: qrCode,
                }
            );

            console.log("Attendance response:", response.data);
            setMessage(response.data.message);
            setType("success");
            setResult({
                student: response.data.student,
                attendance: response.data.attendance,
            });

        } catch (error) {
            console.error("Attendance error:", error);
            if (error.response) {
                setMessage(error.response.data.message ||"Unable to mark attendance.");
                setType("error");
                if (error.response.data.student) {
                    setResult({student: error.response.data.student,});
                }
            } else {
                setMessage("Something went wrong.");
                setType("error");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Scanner </h1>
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