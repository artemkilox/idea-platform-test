import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "../styles/multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, reset, setReset}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    useEffect(() => {
        if(reset === true){
            setMinVal(min)
            setMaxVal(max)
            setReset(false)
        }
    }, [reset])

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                className={classnames("thumb thumb--zindex-3", {
                    "thumb--zindex-5": minVal > max - 100
                })}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                className="thumb thumb--zindex-4"
            />
            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="upper-values">
                    <div
                        className="slider__left-value-upper"
                        style={{marginLeft: `${(((minVal - min) / (max - min)) * 100)}%`}}
                    >
                        {minVal}
                        {/*{minVal - min}/{max - min}*/}
                        {/*{(((minVal - min) / (max - min)) * 100)}*/}
                    </div>
                    <div
                        className="slider__right-value-upper"
                        style={{marginLeft: `${(((maxVal - min) / (max - min)) * 100)}%`}}
                    >
                        {maxVal}
                    </div>
                </div>
                <div className="slider__left-value">{min}</div>
                <div className="slider__right-value">{max}</div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
