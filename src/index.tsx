import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Time from "./components/Time";
import FirefoxApp from "./components/FirefoxApp";
import SettingsApp from "./components/SettingsApp";
import firefox from "./assets/img/firefox.png";
import settings from "./assets/img/settings.png";
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
			setTopWindow("firefox");
		} else if (appId === "settings") {
			setSettingsWindowOpen(true);
			setTopWindow("settings");
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
			let offsetX: number, offsetY: number;

			element.addEventListener("mousedown", (e) => {
				offsetX = e.clientX - element.getBoundingClientRect().left;
				offsetY = e.clientY - element.getBoundingClientRect().top;

				function onMouseMove(e: MouseEvent) {
					const mouseX = e.clientX;
					const mouseY = e.clientY;
					const left = mouseX - offsetX + "px";
					const top = mouseY - offsetY + "px";
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
				<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} draggable="false" />
				<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} draggable="false" />
			</div>
			<SettingsApp windowX={settingsWindowX} windowY={settingsWindowY} isOpen={settingsWindowOpen} isTopWindow={topWindow === "settings"} closeApp={() => closeApp("settings")} setTopWindow={() => setTopWindow("settings")} />
			<FirefoxApp windowX={firefoxWindowX} windowY={firefoxWindowY} isOpen={firefoxWindowOpen} isTopWindow={topWindow === "firefox"} closeApp={() => closeApp("firefox")} setTopWindow={() => setTopWindow("firefox")} />
		</div>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
