import { useState } from "react";
import { createRoot } from "react-dom/client";
import Time from "./components/time";
import firefox from "./assets/img/firefox.png";
import settings from "./assets/img/settings.png";
import minimize from "./assets/img/minimize.png";
import maximize from "./assets/img/maximize.png";
import close from "./assets/img/close.png";
import "./assets/main.css";

function App() {
	const [settingsWindowOpen, setSettingsWindowOpen] = useState(true);
	const [firefoxWindowOpen, setFirefoxWindowOpen] = useState(false);
	const [firefoxWindowX, setFirefoxWindowX] = useState("400px");
	const [firefoxWindowY, setFirefoxWindowY] = useState("70px");
	const [settingsWindowX, setSettingsWindowX] = useState("400px");
	const [settingsWindowY, setSettingsWindowY] = useState("70px");

	function openApp(appId: string) {
		if (appId == "firefox") {
			setFirefoxWindowOpen(true);
		} else if (appId == "settings") {
			setSettingsWindowOpen(true);
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	function closeApp(appId: string) {
		if (appId == "firefox") {
			setFirefoxWindowOpen(false);
		} else if (appId == "settings") {
			setSettingsWindowOpen(false);
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	return (
		<body>
			<header>
				<Time />
			</header>
			<div className="dock">
				<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} />
				<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} />
			</div>
			<div id="settings" className={settingsWindowOpen ? "settingsApp show" : "settingsApp hide"} style={{ top: settingsWindowY, left: settingsWindowX }}>
				<div className="app-header">
					<div className="app-title">
						<p>Settings</p>
					</div>
					<div className="app-buttons">
						<img src={minimize} width="24px" height="24px" onClick={() => closeApp("settings")} />
						<img src={maximize} width="24px" height="24px" />
						<img src={close} width="24px" height="24px" onClick={() => closeApp("settings")} />
					</div>
				</div>
				<div className="app-content">
					<div className="settings-content">
						<div className="settings-Left-Panel">
							<div className="menuOption">
								<img src="assets/img/users.png" width="24px" height="24px" />
								<p>Users</p>
							</div>
							<div className="menuOption">
								<img src="assets/img/system.png" width="24px" height="24px" />
								<p>System</p>
							</div>
						</div>
						<div className="settings-Right-Panel"></div>
					</div>
				</div>
			</div>
			<div id="firefox" className={firefoxWindowOpen ? "firefoxApp show" : "firefoxApp hide"} style={{ top: firefoxWindowY, left: firefoxWindowX }}>
				<div className="app-header">
					<div className="app-title">
						<p>Firefox Web Browser</p>
					</div>
					<div className="app-buttons">
						<img src={minimize} width="24px" height="24px" onClick={() => closeApp("firefox")} />
						<img src={maximize} width="24px" height="24px" />
						<img src={close} width="24px" height="24px" onClick={() => closeApp("firefox")} />
					</div>
				</div>
				<div className="app-content"> To Do... </div>
			</div>
		</body>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
