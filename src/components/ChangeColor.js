import react, { useState } from 'react';

const getRandomColor = () => {
    const COLOR_LIST = ["green", "black", "yellow", "blue", "deeppink"]
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}


function ChangeColor() {
    const [color, setColor] = useState("blue");
    const changeColor = () => {
        let newColor = getRandomColor();
        setColor(newColor);
    };

    return (
        <div>
            <div
                onClick={changeColor}
                style={{ backgroundColor: color, width: 100, height: 100, textAlign: 'center' }}
            >click me
            </div>
        </div>
    );
}

export default ChangeColor;