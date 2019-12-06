import * as React from "react";
import './SortingVisualizer.css';
import {getSelectionSortAnimations} from "../SortingAnimations/SortingAnimations";

const DEFAULT_NUMBER_OF_BARS = 50;
const ANIMATION_SPEED = 10;

const DEFAULT_COLOR = "#c34545";
const ACTIVE_COLOR = "#32c328";
const ACTIVE_LOW_COLOR = "#c344fd";

// TODO: Import these from const file
const HEIGHT_CHANGE = 1;
const COLOR_TO_DEFAULT = 2;
const COLOR_TO_ACTIVE = 3;
const COLOR_TO_ACTIVE_LOW = 4;
const SWAP_LOW = 5;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray(DEFAULT_NUMBER_OF_BARS)
    }

    selectionSort() {
        let animations = getSelectionSortAnimations(this.state.array)

        console.log(animations);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            if(animations[i].type === COLOR_TO_DEFAULT || animations[i].type === COLOR_TO_ACTIVE ||
                animations[i].type === COLOR_TO_ACTIVE_LOW) {
                const bar = arrayBars[animations[i].index];
                const barStyle = bar.style;
                let barColor;
                switch(animations[i].type) {
                    case COLOR_TO_DEFAULT:
                        barColor = DEFAULT_COLOR;
                        break;
                    case COLOR_TO_ACTIVE:
                        barColor = ACTIVE_COLOR;
                        break;
                    case COLOR_TO_ACTIVE_LOW:
                    default:
                        barColor = ACTIVE_LOW_COLOR;
                        break;
                }
                setTimeout(() => {
                    barStyle.backgroundColor = barColor;
                }, i * ANIMATION_SPEED);
            } else if (animations[i].type === SWAP_LOW) {
                const old_low = arrayBars[animations[i].old_low];
                const new_low = arrayBars[animations[i].new_low];
                const oldStyle = old_low.style;
                const newStyle = new_low.style;
                setTimeout(() => {
                    oldStyle.backgroundColor = DEFAULT_COLOR;
                    newStyle.backgroundColor = ACTIVE_LOW_COLOR;
                }, i * ANIMATION_SPEED);
            } else if(animations[i].type === HEIGHT_CHANGE) {
                const bar1 = arrayBars[animations[i].index1];
                const bar2 = arrayBars[animations[i].index2];
                const bar1Style = bar1.style;
                const bar2Style = bar2.style;
                setTimeout(() => {
                    let temp = bar1Style.height;
                    bar1Style.height = bar2Style.height;
                    bar2Style.height = temp;

                    bar1Style.backgroundColor = DEFAULT_COLOR;
                    bar2Style.backgroundColor = DEFAULT_COLOR;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    resetArray(bar_num) {
        const array = [];
        for (let i = 0; i < bar_num; i++) {
            array.push(getRandomInt(10, 600));
        }
        this.setState({array: array});
    }

    render() {
        const {array} = this.state;

        return (
            <>
                <div className="button-container">
                    <button onClick={() => this.resetArray(DEFAULT_NUMBER_OF_BARS)}>New Array</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            style={{
                                height: `${value}px`,
                                backgroundColor: DEFAULT_COLOR
                            }}
                        >
                        </div>
                    ))}
                </div>
            </>
        )
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
