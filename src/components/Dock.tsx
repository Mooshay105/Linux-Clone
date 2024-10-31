import firefox from "../assets/img/firefox.png";
import settings from "../assets/img/settings.png";
import reset from "../assets/img/reset.png";

interface DockProps {
	openApp: (appId: string) => void;
	resetAppPos: () => void;
}

function Dock({ openApp, resetAppPos }: DockProps) {
	return (
		<div className="dock">
			<div>
				<img src={firefox} width="48px" height="48px" onClick={() => openApp("firefox")} draggable="false" />
				<img src={settings} width="48px" height="48px" onClick={() => openApp("settings")} draggable="false" />
			</div>
			<img src={reset} width="48px" height="48px" onClick={resetAppPos} draggable="false" style={{ margin: "25px" }} />
		</div>
	);
}

export default Dock;
