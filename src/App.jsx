import React, { useEffect } from 'react'
import { useCSVReader, useCSVDownloader } from 'react-papaparse';
import terror from './terror.gif'
function App() {
    const { CSVReader } = useCSVReader();
    const { CSVDownloader, Type } = useCSVDownloader();
    const [data, setData] = React.useState([]);
    const [jsonData, setJsonData] = React.useState([]);
    //crear referencia imgterror
    const imgterror = React.useRef(null);
    const [stateImgTerror, setStateImgTerror] = React.useState(false);
    useEffect(() => {
        let arreglo = []
        let validacion = false;
        data.forEach(item => {
            validacion = false;
            /*   arreglo.filter(element => {
                  if (element.some(elemento => elemento === item)) {
                      console.log(true)
                      validacion = true
                  }
              }) */
            validacion = arreglo.some(columna => item[2] === columna[2] && item[3] === columna[3] && item[4] === columna[4]
                && item[5] === columna[5] && item[6] === columna[6] && item[7] === columna[7] && item[8] === columna[8])
            console.log(validacion)
            if (validacion) {
                arreglo.map(columna => {
                    if (item[2] === columna[2] && item[3] === columna[3] && item[4] === columna[4]
                        && item[5] === columna[5] && item[6] === columna[6] && item[7] === columna[7] && item[8] === columna[8]) {

                        for (let i = 19; i < 254; i++) {
                            if (item[i] === "Y") {
                                columna[i] = 'Y'
                            }
                        }
                    }
                    return columna;
                })
            } else {
                arreglo.push(item)
            }
            //if (!validacion) {
            /*         let filtrado = data.find(columna => item[2] === columna[2] && item[3] === columna[3] && item[4] === columna[4]
                        && item[5] === columna[5] && item[6] === columna[6] && item[7] === columna[7] && item[8] === columna[8]) */

            //}
        })
        console.log(arreglo)
        setJsonData(arreglo)


    }, [data])
    return (
        <div>
            <CSVReader
                onUploadAccepted={(results) => {
                    setData(results.data);
                    setStateImgTerror(true)
                    setTimeout(() => {
                        setStateImgTerror(false)
                    }
                        , 2000)
                }}
            >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                }) => (
                    <>
                        <div >
                            <button type='button' {...getRootProps()} className="btn btn-primary btn-sm"
                                style={{
                                    width: '100%',
                                    height: '50vh',
                                }}
                            >
                                Browse file
                            </button>
                            <div >
                                {acceptedFile && acceptedFile.name}
                            </div>
                        </div>
                        <ProgressBar />
                    </>
                )}
            </CSVReader>

            <CSVDownloader
                style={{
                    width: '100%',
                    height: '40vh',
                }}
                className="btn btn-danger btn-sm"
                type={Type.Button}
                filename={'filename'}
                bom={true}
                config={{
                    delimiter: ',',
                }}
                data={jsonData}
            >
                Download
            </CSVDownloader>
            <div style={{ height: "10vh" }}> Creado, diseñado, manufacturado, desarrollado, programado, desplegado y demas chingaderas por..... Julio Villegas!!!!</div>


            {stateImgTerror ?
                <div ref={imgterror} style={{
                    left: '0',
                    top: '0',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}>
                    <img src={terror} alt="terror" style={{
                        width: "100%",
                        height: "100%",
                    }} />  </div>
                : null}

        </div >
    )
}

export default App