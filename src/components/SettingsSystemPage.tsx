import aboutSystemIcon from "../assets/img/aboutSystemIcon.png";

function SettingsSystemPage() {
	return (
		<div>
			<h2 className="settingsPageTitle">About System</h2>
			<img src={aboutSystemIcon} width="256px" height="90px" draggable="false" />
			<div className="settingsField">
				<p>Device Name</p>
				<p>The Moose-top</p>
			</div>
			<div className="settingsTopCurvedField">
				<p>Processor</p>
				<p>12th Gen Intel® Core™ i5-1240P × 16</p>
			</div>
			<div className="settingsNotCurvedField">
				<p>Memory</p>
				<p>32.0 GiB</p>
			</div>
			<div className="settingsBottomCurvedField">
				<p>Disk Capacity</p>
				<p>500.0 GB</p>
			</div>
		</div>
	);
}

export default SettingsSystemPage;
