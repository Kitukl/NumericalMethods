import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LagrangeInterpolation = () => {
    const [xPointsString, setXPointsString] = useState('');
    const [yPointsString, setYPointsString] = useState('');
    const [newX, setNewX] = useState('');
    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);

    const printPlot = (xValues, yValues) => {
        const temp = [];
        for (let i = 0; i < xValues.length; i++) {
            temp.push({ x: xValues[i], y: yValues[i] });
        }
        return temp;
    };

    const strToArray = (stringValue) => {
        return stringValue.split(',').map(Number);
    };

    const calculateLagrange = (x, y, xValue) => {
        let P = 0;
        for (let i = 0; i < x.length; i++) {
            let L = 1;
            for (let j = 0; j < x.length; j++) {
                if (i !== j) {
                    L *= (xValue - x[j]) / (x[i] - x[j]);
                }
            }
            P += y[i] * L;
        }
        return P;
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        const xPoints = strToArray(xPointsString);
        const yPoints = strToArray(yPointsString);
        const xValue = parseFloat(newX);

        if (xPoints.length !== yPoints.length) {
            alert("Кількість x та y точок повинна бути однаковою.");
            return;
        }

        const yValue = calculateLagrange(xPoints, yPoints, xValue);
        setResult(yValue);
        setData(printPlot(xPoints, yPoints));
    };

    return (
        <main>
            <h1>Інтерполяційний поліном Лагранжа</h1>
            <form className='container'>
                <div className='inputs'>
                    <label>Введіть точки x (через кому):</label>
                    <input
                        type='text'
                        value={xPointsString}
                        onChange={e => setXPointsString(e.target.value)}
                    />
                </div>
                <div className='inputs'>
                    <label>Введіть точки y (через кому):</label>
                    <input
                        type='text'
                        value={yPointsString}
                        onChange={e => setYPointsString(e.target.value)}
                    />
                </div>
                <div className='inputs'>
                    <label>Введіть нове значення x:</label>
                    <input
                        type='text'
                        value={newX}
                        onChange={e => setNewX(e.target.value)}
                    />
                </div>
                <button className='solve-button' onClick={handleCalculate}>Обчислити значення для нового x</button>
            </form>
            <div>
                {result !== null && (
                    <h2>Значення y для x = {newX} : {result}</h2>
                )}
            </div>
            <div>
                {data.length > 0 && (
                    <LineChart width={600} height={400} data={data}>
                    <CartesianGrid stroke='#ccc' />
                    <XAxis dataKey='x' />
                    <YAxis />
                    <Line type='monotone' dataKey='y' stroke='#fff' />
                </LineChart>)}

            </div>
        </main>
    );
};

export default LagrangeInterpolation;
