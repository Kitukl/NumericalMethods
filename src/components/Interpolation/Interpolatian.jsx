import '../Interpolation/Interpolatian.scss'
import {useState} from "react";


const Interpolatian = () => {
    const [x_pointsString, setX_PointsString] = useState('')
    const [y_pointsString, setY_pointsString] = useState('')

    const strToArray = (stringValue) => {
        const arr = stringValue.split(',')
        return arr
    }

    const Interpolatian = () => {
        const [x_points, setX_Points] = useState([])
        const [y_points, setY_Points] = useState([])

        setX_Points(strToArray(x_pointsString))
        setY_Points(strToArray(y_pointsString))


    }

    return (<main>
        <h1>Інтерполяція</h1>
        <section>
            <form>
                <div className='inputs'>
                    <label htmlFor='matrix-size'>
                        Введіть точки x
                    </label>
                    <input
                        type='text'
                        name='matrix-size'
                        onChange={e => {
                            setX_PointsString(e.target.value)
                        }}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='matrix-size'>
                        Введіть точки y
                    </label>
                    <input
                        type='text'
                        name='matrix-size'
                        onChange={e => {setY_pointsString(e.target.value)
                        }}
                    />
                </div>
            </form>
            <div className='enter-buttons'></div>
            <button className='solve-button'>
                Розв`язати рівняння
            </button>

        </section>
    </main>)
}

export default Interpolatian