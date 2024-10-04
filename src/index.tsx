import { createRoot } from "react-dom/client";
import firefox from "./assets/img/firefox.png";
import settings from "./assets/img/settings.png";
import "./assets/main.css";
import Time from "./components/time";

function App() {
	return (
		<body>
			<header>
				<Time />
			</header>
			<div className="dock">
				<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} />
				<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} />
			</div>
			<script src="assets/dockmanager.js"></script>
			<div id="settings" className="settingsApp">
				<div className="app-header">
					<div className="app-title">
						<p>Settings</p>
					</div>
					<div className="app-buttons">
						<img src="assets/img/minimize.png" width="24px" height="24px" onClick={() => closeApp("settings")} />
						<img src="assets/img/maximize.png" width="24px" height="24px" />
						<img src="assets/img/close.png" width="24px" height="24px" onClick={() => closeApp("settings")} />
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
			<div id="firefox" className="firefoxApp">
				<div className="app-header">
					<div className="app-title">
						<p>Firefox Web Browser</p>
					</div>
					<div className="app-buttons">
						<img src="assets/img/minimize.png" width="24px" height="24px" onClick={() => closeApp("firefox")} />
						<img src="assets/img/maximize.png" width="24px" height="24px" />
						<img src="assets/img/close.png" width="24px" height="24px" onClick={() => closeApp("firefox")} />
					</div>
				</div>
				<div className="app-content"> To Do... </div>
			</div>
			<script src="assets/appmanager.js"></script>
		</body>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
