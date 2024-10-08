import aboutUserIcon from "../assets/img/aboutUserIcon.png";

function SettingsUsersPage() {
	return (
		<div>
			<h2 className="settingsPageTitle">Users</h2>
			<img src={aboutUserIcon} width="150px" height="150px" draggable="false" />

			<div className="settingsTopCurvedField">
				<p>Name</p>
				<p>Malcolm</p>
			</div>
			<div className="settingsNotCurvedField">
				<p>Password</p>
				<p>Not Tellin</p>
			</div>
			<div className="settingsBottomCurvedField">
				<p>Language</p>
				<p>English (Australia)</p>
			</div>
		</div>
	);
}

export default SettingsUsersPage;
