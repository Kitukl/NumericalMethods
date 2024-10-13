import '../Interpolation/Interpolatian.scss'
import {useState} from "react";
import {evaluate, sin} from "mathjs";

const Interpolatian = () => {

    const [numberOfPoints, setNumberOfPoints] = useState('')
    const [numberOfTestPoints, setNumberOfTestPoints] = useState('')
    const [x_points, setX_Points] = useState([])
    const [y_points, setY_Points] = useState([])
    const [x_test, setX_test] = useState([])
    const [interval, setInterval] = useState('')

    function linspace() {
        const arr = createInterval();
        const res = []
        const step = (arr[1] - arr[0]) / (numberOfPoints - 1);
        for (let i = 0; i < numberOfPoints; i++) {
            res.push(arr[0] + (step * i));
        }
        setX_Points(res)
    }

    const createInterval = () => {
        const arrange = interval.split(',').map(Number)
        if (arrange.length === 2 && arrange.every(num => !isNaN(num))) {
            return arrange
        } else {
            return null
        }
    }

    const Lagrange = () => {
        let y_test = []
        let Li = []
        for(let i = 0; i < numberOfPoints; i++) {
            for (let j = 0; j < numberOfPoints; j++) {
                if (j === i){
                    continue
                }
                Li.push((x_test - x_points(j))/(x_points(i) - x_points(j)))
            }
            y_test.push(evaluate(sin(i), {x: i}) * Li[i])
        }
    }

    return (<main>
        <h1>Інтерполяція</h1>
        <section>
            <form>
                <div className='inputs'>
                    <label htmlFor='matrix-size'>
                        Введіть проміжок
                    </label>
                    <input
                        type='text'
                        name='matrix-size'
                        onChange={e => setInterval(e.target.value)}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='matrix-size'>
                        Введіть кількість точок
                    </label>
                    <input
                        type='text'
                        name='matrix-size'
                        onChange={e => {
                            setNumberOfPoints(e.target.value)
                        }}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='matrix-size'>
                        Введіть кількість точок
                    </label>
                    <input
                        type='text'
                        name='matrix-size'
                        onChange={e => {setNumberOfTestPoints(e.target.value)
                        }}
                    />
                </div>
            </form>
            <div className='enter-buttons'></div>
            <button className='solve-button' onClick={linspace}>
                Розв`язати рівняння
            </button>

        </section>
    </main>)
}

export default Interpolatian