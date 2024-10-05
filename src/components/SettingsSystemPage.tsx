import aboutSystemIcon from "../assets/img/aboutSystemIcon.png";

function SettingsSystemPage() {
	return (
		<div>
			<h2 className="settingsPageTitle">About System</h2>
			<img src={aboutSystemIcon} width="285px" height="100px" />

			<div className="settingsUser">
				<p>Processor</p>
				<p>12th Gen Intel® Core™ i5-1240P × 16</p>
			</div>
			<div className="settingsPassword">
				<p>Memory</p>
				<p>32.0 GiB</p>
			</div>
			<div className="settingsLanguage">
				<p>Disk Capacity</p>
				<p>500.0 GB</p>
			</div>
		</div>
	);
}

export default SettingsSystemPage;
