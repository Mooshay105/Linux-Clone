import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Time from "./components/Time";
import FirefoxApp from "./components/FirefoxApp";
import SettingsApp from "./components/SettingsApp";
import firefox from "./assets/img/firefox.png";
import settings from "./assets/img/settings.png";
import reset from "./assets/img/reset.png";
import "./assets/main.css";

function App() {
	const defaultWindowX = "400px";
	const defaultWindowY = "70px";
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
			let parentElement = header.parentElement as HTMLElement;
			let offsetX: number, offsetY: number;

			header.addEventListener("mousedown", (e) => {
				const event = e as MouseEvent; // Assert the event type
				offsetX = event.clientX - parentElement.getBoundingClientRect().left;
				offsetY = event.clientY - parentElement.getBoundingClientRect().top;

				function onMouseMove(e: MouseEvent) {
					const mouseX = e.clientX;
					const mouseY = e.clientY;
					const left = mouseX - offsetX + "px";
					const top = mouseY - offsetY + "px";
					parentElement.style.left = left;
					parentElement.style.top = top;

					if (parentElement.id === "settings") {
						setSettingsWindowX(left);
						setSettingsWindowY(top);
						setTopWindow("settings");
					} else if (parentElement.id === "firefox") {
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

	function resetAppPos() {
		setSettingsWindowX(defaultWindowX);
		setSettingsWindowY(defaultWindowY);
		setFirefoxWindowX(defaultWindowX);
		setFirefoxWindowY(defaultWindowY);
	}

	return (
		<div>
			<header>
				<Time />
			</header>
			<div className="dock">
				<div>
					<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} draggable="false" />
					<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} draggable="false" />
				</div>
				<img src={reset} width="48px" height="48px" onClick={() => resetAppPos()} draggable="false" style={{ margin: "25px" }} />
			</div>
			<SettingsApp windowX={settingsWindowX} windowY={settingsWindowY} isOpen={settingsWindowOpen} isTopWindow={topWindow === "settings"} closeApp={() => closeApp("settings")} setTopWindow={() => setTopWindow("settings")} />
			<FirefoxApp windowX={firefoxWindowX} windowY={firefoxWindowY} isOpen={firefoxWindowOpen} isTopWindow={topWindow === "firefox"} closeApp={() => closeApp("firefox")} setTopWindow={() => setTopWindow("firefox")} />
		</div>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
