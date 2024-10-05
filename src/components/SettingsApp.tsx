import React from "react";
import minimize from "../assets/img/minimize.png";
import maximize from "../assets/img/maximize.png";
import close from "../assets/img/close.png";
import users from "../assets/img/users.png";
import system from "../assets/img/system.png";

interface AppProps {
	windowX: string;
	windowY: string;
	isOpen: boolean;
	isTopWindow: boolean;
	closeApp: () => void;
	setTopWindow: () => void;
}

const SettingsApp: React.FC<AppProps> = ({ windowX, windowY, isOpen, isTopWindow, closeApp, setTopWindow }) => {
	return (
		<div id="settings" className={isOpen ? "settingsApp show" : "settingsApp hide"} style={{ top: windowY, left: windowX, zIndex: isTopWindow ? "3" : "1" }} onClick={setTopWindow}>
			<div className="app-header">
				<div className="app-title">
					<p>Settings</p>
				</div>
				<div className="app-buttons">
					<img src={minimize} width="24px" height="24px" onClick={closeApp} />
					<img src={maximize} width="24px" height="24px" />
					<img src={close} width="24px" height="24px" onClick={closeApp} />
				</div>
			</div>
			<div className="app-content">
				<div className="settings-content">
					<div className="settings-Left-Panel">
						<div className="menuOption">
							<img src={users} width="24px" height="24px" />
							<p>Users</p>
						</div>
						<div className="menuOption">
							<img src={system} width="24px" height="24px" />
							<p>System</p>
						</div>
					</div>
					<div className="settings-Right-Panel"></div>
				</div>
			</div>
		</div>
	);
};

export default SettingsApp;
