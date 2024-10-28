import { useState } from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

const Newton = () => {
    const [xPointsString, setXPointsString] = useState("");
    const [yPointsString, setYPointsString] = useState("");
    const [newX, setNewX] = useState("");
    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);

    const printPlot = (xValues, yValues) => {
        const temp = [];
        for (let i = 0; i < xValues.length; i++) {
            temp.push({ x: xValues[i], y: yValues[i] });
        }
        return temp;
    };

    const parseInputArray = (input) => input.split(',').map(Number);

    const calculateDividedDifferences = (xPoints, yPoints) => {
        const n = yPoints.length;
        const dividedDifferences = Array.from({ length: n }, (_, i) => [yPoints[i]]);

        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                const numerator = dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1];
                const denominator = xPoints[i + j] - xPoints[i];
                dividedDifferences[i].push(numerator / denominator);
            }
        }

        return dividedDifferences[0];
    };

    const calculateNewtonInterpolation = (x, xPoints, dividedDifferences) => {
        let interpolationResult = dividedDifferences[0];
        let term = 1;

        for (let i = 1; i < dividedDifferences.length; i++) {
            term *= (x - xPoints[i - 1]);
            interpolationResult += term * dividedDifferences[i];
        }

        return interpolationResult;
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        const xPoints = parseInputArray(xPointsString);
        const yPoints = parseInputArray(yPointsString);
        const xValue = parseFloat(newX);

        if (xPoints.length !== yPoints.length || xPoints.length < 2) {
            alert("Будь ласка, введіть рівну кількість x та y значень.");
            return;
        }

        const dividedDifferences = calculateDividedDifferences(xPoints, yPoints);
        const interpolationResult = calculateNewtonInterpolation(xValue, xPoints, dividedDifferences);
        setResult(interpolationResult);
        setData(printPlot(xPoints, yPoints));
    };

    return (
        <>
            <h1>Інтерполяційний поліном Ньютона</h1>
        <div className="container">
            <form className="container" onSubmit={handleCalculate}>
                <div className="inputs">
                    <label>Введіть точки x (через кому):</label>
                    <input
                        type="text"
                        value={xPointsString}
                        onChange={(e) => setXPointsString(e.target.value)}
                    />
                </div>
                <div className="inputs">
                    <label>Введіть точки y (через кому):</label>
                    <input
                        type="text"
                        value={yPointsString}
                        onChange={(e) => setYPointsString(e.target.value)}
                    />
                </div>
                <div className="inputs">
                    <label>Введіть нове значення x:</label>
                    <input
                        type="text"
                        value={newX}
                        onChange={(e) => setNewX(e.target.value)}
                    />
                </div>
                <button className="solve-button" type="submit">Обчислити значення для нового x</button>
            </form>
        </div>
            {result !== null && (
                <div>
                    <h3>Інтерпольоване значення: {result}</h3>
                </div>
            )}
            {data.length > 0 && (
                <LineChart width={600} height={400} data={data}>
                    <CartesianGrid stroke='#ccc' />
                    <XAxis dataKey='x' />
                    <YAxis />
                    <Line type='monotone' dataKey='y' stroke='#fff' />
                </LineChart>)}
        </>
    );
};

export default Newton;
