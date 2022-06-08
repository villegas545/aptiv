import React, { useEffect } from 'react'
import { useCSVReader, usePapaParse, useCSVDownloader } from 'react-papaparse';
const styles = {
    csvReader: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    browseFile: {
        width: '20%',
    },
    acceptedFile: {
        border: '1px solid #ccc',
        height: 45,
        lineHeight: 2.5,
        paddingLeft: 10,
        width: '80%',
    },
    remove: {
        borderRadius: 0,
        padding: '0 20px',
    },
    progressBarBackgroundColor: {
        backgroundColor: 'red',
    },
};


function App() {
    const { CSVReader } = useCSVReader();
    const { jsonToCSV } = usePapaParse();
    const { CSVDownloader, Type } = useCSVDownloader();
    const [data, setData] = React.useState([]);
    const [jsonData, setJsonData] = React.useState([]);
    let results = {};
    useEffect(() => {
        let arreglo = []
        let validacion = false;
        data.forEach(item => {
            validacion = false;
            arreglo.filter(element => {
                if (element.some(elemento => elemento === item)) {
                    console.log(true)
                    validacion = true
                }
            })
            if (!validacion) {
                let filtrado = data.filter(columna => item[2] === columna[2] && item[3] === columna[3] && item[4] === columna[4]
                    && item[5] === columna[5] && item[6] === columna[6] && item[7] === columna[7] && item[8] === columna[8])
                arreglo.push(filtrado)
            }
        })
        console.log(arreglo)
        setJsonData(arreglo)
    }, [data])
    const handleJsonToCSV = () => {
        const jsonData = `[
      {
          "Column 1": "1-1",
          "Column 2": "1-2",
          "Column 3": "1-3",
          "Column 4": "1-4"
      },
      {
          "Column 1": "2-1",
          "Column 2": "2-2",
          "Column 3": "2-3",
          "Column 4": "2-4"
      },
      {
          "Column 1": "3-1",
          "Column 2": "3-2",
          "Column 3": "3-3",
          "Column 4": "3-4"
      },
      {
          "Column 1": 4,
          "Column 2": 5,
          "Column 3": 6,
          "Column 4": 7
      }
    ]`;
        results = jsonToCSV(jsonData);
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
    };
    return (
        <div>
            <CSVReader
                onUploadAccepted={(results) => {
                    //console.log('---------------------------');
                    //console.log(results);
                    setData(results.data);
                    //  console.log('---------------------------');
                }}
            >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }) => (
                    <>
                        <div style={styles.csvReader}>
                            <button type='button' {...getRootProps()} style={styles.browseFile}>
                                Browse file
                            </button>
                            <div style={styles.acceptedFile}>
                                {acceptedFile && acceptedFile.name}
                            </div>
                            <button {...getRemoveFileProps()} style={styles.remove}>
                                Remove
                            </button>
                        </div>
                        <ProgressBar style={styles.progressBarBackgroundColor} />
                    </>
                )}
            </CSVReader>
            <button onClick={() => handleJsonToCSV()}>jsonToCSV</button>
            <CSVDownloader
                type={Type.Button}
                filename={'filename'}
                bom={true}
                config={{
                    delimiter: ';',
                }}
                data={results}
            >
                Download
            </CSVDownloader>
        </div>
    )
}

export default App