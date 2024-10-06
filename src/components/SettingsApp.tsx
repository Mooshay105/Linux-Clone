import React, { useState } from "react";
import minimize from "../assets/img/minimize.png";
import maximize from "../assets/img/maximize.png";
import close from "../assets/img/close.png";
import users from "../assets/img/users.png";
import system from "../assets/img/system.png";
import SettingsUsersPage from "./SettingsUsersPage";
import SettingsSystemPage from "./SettingsSystemPage";

interface AppProps {
	windowX: string;
	windowY: string;
	isOpen: boolean;
	isTopWindow: boolean;
	closeApp: () => void;
	setTopWindow: () => void;
}

const SettingsApp: React.FC<AppProps> = ({ windowX, windowY, isOpen, isTopWindow, closeApp, setTopWindow }) => {
	const [activeMenuOption, setActiveMenuOption] = useState("Users");

	function handleClick(option: string) {
		setActiveMenuOption(option);
	}

	return (
		<div id="settings" className={isOpen ? "settingsApp show" : "settingsApp hide"} style={{ top: windowY, left: windowX, zIndex: isTopWindow ? "3" : "1" }} onClick={setTopWindow}>
			<div className="app-header">
				<div className="app-title">
					<p>Settings</p>
				</div>
				<div className="app-buttons">
					<img src={minimize} width="24px" height="24px" onClick={closeApp} draggable="false" />
					<img src={maximize} width="24px" height="24px" draggable="false" />
					<img src={close} width="24px" height="24px" onClick={closeApp} draggable="false" />
				</div>
			</div>
			<div className="app-content">
				<div className="settings-content">
					<div className="settingsLeftPanel">
						<div className={`menuOption ${activeMenuOption === "Users" ? "activeMenuOption" : ""}`} onClick={() => handleClick("Users")}>
							<img src={users} width="24px" height="24px" draggable="false" />
							<p>Users</p>
						</div>
						<div className={`menuOption ${activeMenuOption === "System" ? "activeMenuOption" : ""}`} onClick={() => handleClick("System")}>
							<img src={system} width="24px" height="24px" draggable="false" />
							<p>System</p>
						</div>
					</div>
					<div className="settingsRightPanel">{activeMenuOption === "Users" ? <SettingsUsersPage /> : <SettingsSystemPage />}</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsApp;
