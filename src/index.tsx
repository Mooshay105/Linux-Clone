import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Time from "./components/Time";
import firefox from "./assets/img/firefox.png";
import settings from "./assets/img/settings.png";
import minimize from "./assets/img/minimize.png";
import maximize from "./assets/img/maximize.png";
import close from "./assets/img/close.png";
import users from "./assets/img/users.png";
import system from "./assets/img/system.png";
import "./assets/main.css";

function App() {
	const [settingsWindowOpen, setSettingsWindowOpen] = useState(true);
	const [firefoxWindowOpen, setFirefoxWindowOpen] = useState(false);
	const [firefoxWindowX, setFirefoxWindowX] = useState("400px");
	const [firefoxWindowY, setFirefoxWindowY] = useState("70px");
	const [settingsWindowX, setSettingsWindowX] = useState("400px");
	const [settingsWindowY, setSettingsWindowY] = useState("70px");
	const [topWindow, setTopWindow] = useState("settings");

	function openApp(appId: string) {
		if (appId === "firefox") {
			setFirefoxWindowOpen(true);
		} else if (appId === "settings") {
			setSettingsWindowOpen(true);
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	function closeApp(appId: string) {
		if (appId === "firefox") {
			setFirefoxWindowOpen(false);
		} else if (appId === "settings") {
			setSettingsWindowOpen(false);
		} else {
			console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
		}
	}

	useEffect(() => {
		const headers = document.querySelectorAll(".app-header");

		headers.forEach((header) => {
			let element = header.parentElement as HTMLElement;
			let offsetX: number, offsetY: number, mouseX: number, mouseY: number;

			element.addEventListener("mousedown", (e) => {
				offsetX = e.clientX - element.getBoundingClientRect().left;
				offsetY = e.clientY - element.getBoundingClientRect().top;

				function onMouseMove(e: MouseEvent) {
					mouseX = e.clientX;
					mouseY = e.clientY;
					let left = mouseX - offsetX + "px";
					let top = mouseY - offsetY + "px";
					element.style.left = left;
					element.style.top = top;
					if (element.id === "settings") {
						setSettingsWindowX(left);
						setSettingsWindowY(top);
						setTopWindow("settings");
					} else if (element.id === "firefox") {
						setFirefoxWindowX(left);
						setFirefoxWindowY(top);
						setTopWindow("firefox");
					} else {
						console.log("[Web Linux Kernel] [WARN]: Invalid App ID");
					}
				}

				document.addEventListener("mousemove", onMouseMove);

				document.addEventListener(
					"mouseup",
					() => {
						document.removeEventListener("mousemove", onMouseMove);
					},
					{ once: true },
				);
			});
		});
	}, []);

	return (
		<div>
			<header>
				<Time />
			</header>
			<div className="dock">
				<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} />
				<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} />
			</div>
			<div id="settings" className={settingsWindowOpen ? "settingsApp show" : "settingsApp hide"} style={{ top: settingsWindowY, left: settingsWindowX, zIndex: topWindow === "settings" ? "3" : "1" }} onClick={() => setTopWindow("settings")}>
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
			<div id="firefox" className={firefoxWindowOpen ? "firefoxApp show" : "firefoxApp hide"} style={{ top: firefoxWindowY, left: firefoxWindowX, zIndex: topWindow === "firefox" ? "3" : "1" }} onClick={() => setTopWindow("firefox")}>
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
		</div>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
