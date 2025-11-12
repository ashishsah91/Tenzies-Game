


export default function Dice(props) {

    const styles = {
        backgroundColor: props.isSelect ? "#59E391" : "#FFFFFF"
    }

    return (<div className={`dice ${props.rolling && !props.isSelect ? "rolling" : ""}`} style={styles} onClick={props.handleDiceSelect}>{props.value}</div>)

}