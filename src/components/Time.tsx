import { useState, useEffect } from "react";

function Time() {
	const [time, setTime] = useState("Mar 14 1:37 PM");

	function updateDateTime() {
		let date = new Date();
		let dateString = date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
		let timeString = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).toUpperCase();

		setTime(`${dateString} ${timeString}`);
	}

	useEffect(() => {
		updateDateTime();
		const intervalId = setInterval(updateDateTime, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return <p className="barfield">{time}</p>;
}

export default Time;
