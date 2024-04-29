import React, {useEffect, useState} from 'react';
import ticketsData from '../data/tickets.json'
import companyLogo from '../resources/img/turkish-airlines-logo.png'
import flight from '../resources/img/diploma.svg'
import flightWithLine from '../resources/img/flight with line.svg'
import checkboxFlag from '../resources/img/checkbox-flag.svg'
import MultiRangeSlider from "./MultiRangeSlider";


const MainPage = () => {
    const weekdayNames = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
    const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
    const [tickets, setTickets] = useState(ticketsData.tickets)
    const [transfers, setTransfers] = useState([])
    const [priceReset, setPriceReset] = useState(false)

    const [minRUB, setMinRUB] = useState(0)
    const [maxRUB, setMaxRUB] = useState(0)
    const [minUSD, setMinUSD] = useState(0)
    const [maxUSD, setMaxUSD] = useState(0)
    const [minUER, setMinUER] = useState(0)
    const [maxUER, setMaxUER] = useState(0)

    const [minPriceValue, setMinPriceValue] = useState(0)
    const [maxPriceValue, setMaxPriceValue] = useState(0)

    const [RUB, setRUB] = useState(true)
    const [USD, setUSD] = useState(false)
    const [EUR, setEUR] = useState(false)

    const [allTransFlag, setAllTransFlag] = useState(false)
    const [noneTrans, setNoneTrans] = useState(false)
    const [oneTrans, setOneTrans] = useState(false)
    const [twoTrans, setTwoTrans] = useState(false)
    const [threeTrans, setThreeTrans] = useState(false)

    const findTrans = () => {
        let arr = []
        if(!noneTrans && !oneTrans && !twoTrans && !threeTrans){
            arr = [0, 1, 2, 3]
        } else {
            if (noneTrans){
                arr.push(0)
            }
            if (oneTrans){
                arr.push(1)
            }
            if (twoTrans){
                arr.push(2)
            }
            if (threeTrans){
                arr.push(3)
            }
        }
        if(arr.length === 4) setAllTransFlag(true)
        return arr
    }

    useEffect( () => {
        setTransfers(findTrans(transfers))
    }, [noneTrans, oneTrans, twoTrans, threeTrans])

    const setMinMaxPrice = (tickets) => {
        let minRUB = 9999999999999
        let maxRUB = 0
        let minUSD = 99999999999999
        let maxUSD = 0
        let minEUR = 99999999999999
        let maxEUR = 0

        tickets.map(ticket => {
            if(ticket.price_rub < minRUB){
                minRUB = ticket.price_rub
            }
            if(ticket.price_rub > maxRUB){
                maxRUB = ticket.price_rub
            }

            if(ticket.price_usd < minUSD){
                minUSD = ticket.price_usd
            }
            if(ticket.price_usd > maxUSD){
                maxUSD = ticket.price_usd
            }

            if(ticket.price_eur < minEUR){
                minEUR = ticket.price_eur
            }
            if(ticket.price_eur > maxEUR){
                maxEUR = ticket.price_eur
            }
        })

        setMinRUB(minRUB)
        setMaxRUB(maxRUB)
        setMinUSD(minUSD)
        setMaxUSD(maxUSD)
        setMinUER(minEUR)
        setMaxUER(maxEUR)
    }

    useEffect(() => {
        setMinMaxPrice(tickets)
    }, [])

    useEffect( () => {
        setPriceReset(true)
    }, [RUB, USD, EUR])

    // console.log(curCurrency)

    const setCurrency = (callback) => {
        setRUB(false)
        setUSD(false)
        setEUR(false)
        callback(true)
    }

    const setOnlyTrans = (callback) => {
        setAllTransFlag(false)
        setNoneTrans(false)
        setOneTrans(false)
        setTwoTrans(false)
        setThreeTrans(false)
        callback(true)
    }

    const setAllTrans = (state) => {
        setAllTransFlag(state)
        setNoneTrans(state)
        setOneTrans(state)
        setTwoTrans(state)
        setThreeTrans(state)
    }

    // console.log(transfers)

    const formatDate = (inputDate) => {
        const date = new Date(inputDate)
        return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + ", " + weekdayNames[date.getDay()]
    }

    return (
        <div
            className="main-container"
        >
            <div className="header">
                <img src={flight} alt="" className="logo"/>
            </div>
            <div className="tickets-container">
                <div className="filters">
                    <div className="filter">
                        <div className="filter-name">
                            Валюта
                        </div>
                        <div className="filter-body">
                            <div className="val-section">
                                <div
                                    className={RUB === true ? "val active-val" : "val"}
                                    onClick={() => setCurrency(setRUB)}
                                >
                                    RUB
                                </div>
                                <div
                                    className={USD === true ? "val active-val" : "val"}
                                    onClick={() => setCurrency(setUSD)}
                                >
                                    USD
                                </div>
                                <div
                                    className={EUR === true ? "val active-val" : "val"}
                                    onClick={() => setCurrency(setEUR)}
                                >
                                    EUR
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter">
                        <div className="filter-name">
                            Количество пересадок
                        </div>
                        {/*
                        Чекбоксы сделаны здесь сразу через div, тк любая стилизация чекбоксов начинается с того, что мы скрываем стандартный,
                        но я не буду использовать checkbox.checked свойство, а следовательно и сам чекбокс мне не нужен.
                        */}
                        <div className="filter-body">
                            <div
                                className="checkbox-wrapper"
                            >
                                <div
                                    className="check-text-wrapper"
                                    onClick={() => {
                                        setAllTransFlag(!allTransFlag)
                                        setAllTrans(!allTransFlag)
                                    }}
                                >
                                    <div className={allTransFlag ? "checkbox-square active-square" : "checkbox-square"}>
                                        <img className="checkbox-flag" style={allTransFlag ? {display: "block"} : {display: "none"}} src={checkboxFlag} alt=""/>
                                    </div>
                                    <div className="checkbox-text">Все</div>
                                </div>
                                <div
                                    onClick={() => setOnlyTrans(setAllTrans)}
                                    className="only">Только</div>
                            </div>
                            <div
                                className="checkbox-wrapper"
                            >
                                <div
                                    className="check-text-wrapper"
                                    onClick={() => {
                                        setNoneTrans(!noneTrans)
                                        if(allTransFlag) {
                                            setAllTransFlag(false)
                                        }
                                    }}
                                >
                                    <div className={noneTrans ? "checkbox-square active-square" : "checkbox-square"}>
                                        <img className="checkbox-flag" style={noneTrans ? {display: "block"} : {display: "none"}} src={checkboxFlag} alt=""/>
                                    </div>
                                    <div className="checkbox-text">Без пересадок</div>
                                </div>
                                <div
                                    onClick={() => setOnlyTrans(setNoneTrans)}
                                    className="only">Только</div>
                            </div>
                            <div
                                className="checkbox-wrapper"
                            >
                                <div
                                    className="check-text-wrapper"
                                    onClick={() => {
                                        setOneTrans(!oneTrans)
                                        if(allTransFlag) {
                                            setAllTransFlag(false)
                                        }
                                    }}
                                >
                                    <div className={oneTrans ? "checkbox-square active-square" : "checkbox-square"}>
                                        <img className="checkbox-flag" style={oneTrans ? {display: "block"} : {display: "none"}} src={checkboxFlag} alt=""/>
                                    </div>
                                    <div className="checkbox-text">1 пересадка</div>
                                </div>
                                <div
                                    onClick={() => setOnlyTrans(setOneTrans)}
                                    className="only">Только</div>
                            </div>
                            <div
                                className="checkbox-wrapper"
                            >
                                <div
                                    className="check-text-wrapper"
                                    onClick={() => {
                                        setTwoTrans(!twoTrans)
                                        if(allTransFlag) {
                                            setAllTransFlag(false)
                                        }
                                    }}
                                >
                                    <div className={twoTrans ? "checkbox-square active-square" : "checkbox-square"}>
                                        <img className="checkbox-flag" style={twoTrans ? {display: "block"} : {display: "none"}} src={checkboxFlag} alt=""/>
                                    </div>
                                    <div className="checkbox-text">2 пересадки</div>
                                </div>
                                <div
                                    onClick={() => setOnlyTrans(setTwoTrans)}
                                    className="only">Только</div>
                            </div>
                            <div
                                className="checkbox-wrapper"
                            >
                                <div
                                    className="check-text-wrapper"
                                    onClick={() => {
                                        setThreeTrans(!threeTrans)
                                        if(allTransFlag) {
                                            setAllTransFlag(false)
                                        }
                                    }}
                                >
                                    <div className={threeTrans ? "checkbox-square active-square" : "checkbox-square"}>
                                        <img className="checkbox-flag" style={threeTrans ? {display: "block"} : {display: "none"}} src={checkboxFlag} alt=""/>
                                    </div>
                                    <div className="checkbox-text">3 пересадки</div>
                                </div>
                                <div
                                    onClick={() => setOnlyTrans(setThreeTrans)}
                                    className="only"
                                >
                                    Только
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter">
                        <div className="filter-name">
                            Цена
                        </div>
                        <div className="filter-body">
                            {
                                minRUB !== 0 ?
                                <MultiRangeSlider
                                min={RUB ? minRUB : USD ? minUSD : EUR ? minUER : minRUB}
                                max={RUB ? maxRUB : USD ? maxUSD : EUR ? maxUER : maxRUB}
                                reset={priceReset}
                                setReset={setPriceReset}
                                onChange={({ min, max }) => {
                                    setMinPriceValue(min)
                                    setMaxPriceValue(max)
                                }}
                                /> : <div></div>
                            }
                        </div>
                    </div>
                </div>
                <div className="tickets">
                    {tickets ?
                        tickets.sort( function (a, b) {
                            return parseFloat(a.price_rub) - parseFloat(b.price_rub);
                        }).filter((ticket) =>
                            transfers.indexOf(ticket.number_of_transfers) !== -1
                            && (RUB ? ticket.price_rub >= minPriceValue && ticket.price_rub <= maxPriceValue
                                : USD ? ticket.price_usd >= minPriceValue && ticket.price_usd <= maxPriceValue
                                : EUR ? ticket.price_eur >= minPriceValue && ticket.price_eur <= maxPriceValue
                                    : ticket.price_rub >= minPriceValue && ticket.price_rub <= maxPriceValue)
                            ).map(ticket =>
                            <div key={ticket.id} className="ticket">
                                <div className="left-side">
                                    <img src={companyLogo} alt="" className="com-logo"/>
                                    <button className="buy-button">
                                        Купить <br/>
                                        за {
                                        RUB === true ? ticket.price_rub.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " ₽" :
                                            USD === true ? "$" + ticket.price_usd.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') :
                                                "€" + ticket.price_eur.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                                    }
                                    </button>
                                </div>
                                <div className="right-side">
                                    <div className="station">
                                        <div className="time">
                                            {ticket.departure_time}
                                        </div>
                                        <div className="city">
                                            {ticket.city_of_departure_tag + ", " + ticket.city_of_departure}
                                        </div>
                                        <div className="date">
                                            {formatDate(ticket.departure_date)}
                                        </div>
                                    </div>
                                    <div className="transfer">
                                        <div className="trans-quan">
                                            {ticket.number_of_transfers}
                                            {
                                                ticket.number_of_transfers.toString()[ticket.number_of_transfers.toString().length - 1] === "1" ?
                                                    " пересадка" :
                                                    (ticket.number_of_transfers.toString()[ticket.number_of_transfers.toString().length - 1] === "2" ||
                                                        ticket.number_of_transfers.toString()[ticket.number_of_transfers.toString().length - 1] === "3" ||
                                                        ticket.number_of_transfers.toString()[ticket.number_of_transfers.toString().length - 1] === "4") ?
                                                        " пересадки" : " пересадок"
                                            }
                                        </div>
                                        <img src={flightWithLine} alt="" className="trans-img"/>
                                    </div>
                                    <div className="station">
                                        <div className="time">
                                            {ticket.arrival_time}
                                        </div>
                                        <div className="city">
                                            {ticket.arrival_city_tag + ", " + ticket.arrival_city}
                                        </div>
                                        <div className="date">
                                            {formatDate(ticket.arrival_date)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <div></div>
                    }
                    <div className="placeholder">Таких билетов нет</div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;