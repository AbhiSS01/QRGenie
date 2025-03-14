import React, { useRef, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

const QRCodeGenerator = ()=>{
    const[text, setText] = useState("");
    const[size, setSize] = useState(200);
    const[bgColor, setBgColor] = useState("#ffffff")
    const[fgColor, setFgColor] = useState("#000000")
    const qrRef = useRef(null); 

    const handleDownload = () => {
        if (!qrRef.current) return;
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href= url;
        link.download = "qrcode.png"// set the name of the downloaded image
        link.click();//click the link to download the image
    };
    return( 
        <div className="container">
            <h1 className="title">QR Code Generator</h1>
            <input type="text" placeholder="Enter text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <input type="number" placeholder="Enter size" value={size} onChange={(e)=>setSize(e.target.value)}/>
            
            <div className="color-picker">
                <label>Background:</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                <label>Foreground:</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
            </div>

            
            <br/>
            <br/>
            <br/>
            {text && (
                <div ref={qrRef} className="qr-container">
                    <QRCodeCanvas value={text} size={size} bgColor={bgColor} fgColor={fgColor} />
                </div>
            )}
            {text && <p>{text}</p>}
            {text && <p>Size: {size}</p>}   

            {text && <button onClick={handleDownload} className="download-btn">Download</button>}
        </div>
    )
}
export default QRCodeGenerator